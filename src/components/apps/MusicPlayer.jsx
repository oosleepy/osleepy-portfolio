import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc } from 'lucide-react';

const PALETTE = {
  0: 'transparent',
  1: '#f9e2af', // yellow sun/stars
  2: '#fab387', // peach sky
  3: '#f38ba8', // pink clouds
  4: '#cba6f7', // purple mountains
  5: '#181825', // ground
};

const ART = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 1, 1, 2, 2, 0, 0, 0],
  [0, 0, 3, 3, 3, 1, 1, 3, 3, 3, 0, 0],
  [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
  [0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0],
  [0, 0, 4, 4, 4, 0, 0, 4, 4, 4, 0, 0],
  [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
];

const tracks = [
  { title: 'Downtown Glow', file: '/music/Ghostrifter-Official-Devyzed-Downtown-Glow(chosic.com).mp3' },
  { title: 'Double Rainbow', file: '/music/Double-Rainbow-chosic.com_.mp3' },
  { title: 'Echoes in Blue', file: '/music/echoes-in-blue-by-tokyo-music-walker-chosic.com_.mp3' },
  { title: 'Golden Hour', file: '/music/Golden-Hour-chosic.com_.mp3' },
  { title: 'Little Wishes', file: '/music/Little-Wishes-chosic.com_.mp3' },
  { title: 'Roa - Beloved', file: '/music/Roa-Beloved(chosic.com).mp3' },
];

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return '0:00';
  const m = Math.floor(timeInSeconds / 60);
  const s = Math.floor(timeInSeconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  useEffect(() => {
    // initialize audio on mount
    audioRef.current = new Audio(tracks[0].file);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = useCallback((index) => {
    const audio = audioRef.current;
    if (!audio) return;

    setTrackIndex(index);
    audio.src = tracks[index].file;
    audio.load();
    if (isPlaying) {
      audio.play().catch(e => console.log('Audio playback prevented', e));
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrent(formatTime(audio.currentTime));
    };

    const onLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const onEnded = () => {
      playTrack((trackIndex + 1) % tracks.length);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [trackIndex, playTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(e => console.log('Audio playback prevented', e));
      setIsPlaying(true);
    }
  };

  const handleSkipForward = () => {
    playTrack((trackIndex + 1) % tracks.length);
  };

  const handleSkipBack = () => {
    playTrack((trackIndex - 1 + tracks.length) % tracks.length);
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const ratio = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
    audioRef.current.currentTime = ratio * audioRef.current.duration;
  };

  return (
    <div className="bg-gradient-to-br from-base to-mantle p-8 w-full h-full flex flex-col justify-center">
      <div className="album-art bg-surface0 rounded-2xl aspect-square flex items-center justify-center mb-6 shadow-xl relative group border border-surface1 overflow-hidden p-4">
        <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-0 opacity-90 group-hover:scale-105 transition-transform duration-700">
          {ART.flat().map((colorIdx, i) => (
            <div key={i} style={{ backgroundColor: PALETTE[colorIdx] }} />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl z-10 pointer-events-none">
          <Play className="w-12 h-12 text-mauve fill-mauve shadow-lg" />
        </div>
      </div>

      <div className="text-center mb-6 truncate">
        <h3 className="font-bold text-lg truncate whitespace-nowrap">{tracks[trackIndex].title}</h3>
        <p className="text-subtext1 text-sm">Lofi Cachy Beats</p>
      </div>

      <div
        className="progress-container h-1.5 bg-surface1 rounded-full overflow-hidden mb-2 shadow-inner cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-mauve shadow-[0_0_12px_rgba(203,166,247,0.6)] pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-[11px] text-subtext0 mb-6 font-bold">
        <span>{current}</span>
        <span>{duration}</span>
      </div>

      <div className="flex justify-center items-center gap-8 text-subtext1">
        <SkipBack onClick={handleSkipBack} className="w-6 h-6 cursor-pointer hover:text-mauve transition-colors" />
        <div
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-mauve flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-base fill-base" />
          ) : (
            <Play className="w-6 h-6 text-base fill-base ml-1" />
          )}
        </div>
        <SkipForward onClick={handleSkipForward} className="w-6 h-6 cursor-pointer hover:text-mauve transition-colors" />
      </div>
    </div>
  );
}

export default memo(MusicPlayer);
