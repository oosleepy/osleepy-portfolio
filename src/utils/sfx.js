let audioCtx = null;

// Call this on the first user interaction (e.g. "Click to Begin")
export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

// Cinematic "eyes opening" sound — a dreamy chord swell with noise breath.
// Plays when the user first presses any key on the wake-up screen.
export const playWakeUp = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const t = audioCtx.currentTime;
  const dur = 2.2;

  // --- Layer 1: Airy white noise breath (like waking into consciousness) ---
  const bufLen = audioCtx.sampleRate * dur;
  const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = buf;

  // Highpass the noise so it's airy, not bass-heavy
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 2800;
  noiseFilter.Q.value = 0.5;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0, t);
  noiseGain.gain.linearRampToValueAtTime(0.045, t + 0.5);   // slow breath in
  noiseGain.gain.linearRampToValueAtTime(0.015, t + dur);    // fade out

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  noiseSource.start(t);
  noiseSource.stop(t + dur);

  // --- Layer 2: Rising fundamental (warm sine, root note ~220 Hz) ---
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(130, t);
  osc1.frequency.linearRampToValueAtTime(220, t + 1.0);    // rise to A3
  gain1.gain.setValueAtTime(0, t);
  gain1.gain.linearRampToValueAtTime(0.18, t + 0.6);        // slow swell in
  gain1.gain.linearRampToValueAtTime(0, t + dur);           // fade out
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start(t);
  osc1.stop(t + dur);

  // --- Layer 3: Fifth above (dreamy shimmer, ~330 Hz) ---
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(195, t);
  osc2.frequency.linearRampToValueAtTime(330, t + 1.2);    // rise to E4
  gain2.gain.setValueAtTime(0, t);
  gain2.gain.linearRampToValueAtTime(0.10, t + 0.8);
  gain2.gain.linearRampToValueAtTime(0, t + dur);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(t);
  osc2.stop(t + dur);

  // --- Layer 4: Octave shimmer (very quiet high sine, adds air) ---
  const osc3 = audioCtx.createOscillator();
  const gain3 = audioCtx.createGain();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(440, t + 0.3);
  osc3.frequency.linearRampToValueAtTime(528, t + 1.6);
  gain3.gain.setValueAtTime(0, t + 0.3);
  gain3.gain.linearRampToValueAtTime(0.055, t + 1.0);
  gain3.gain.linearRampToValueAtTime(0, t + dur);
  osc3.connect(gain3);
  gain3.connect(audioCtx.destination);
  osc3.start(t + 0.3);
  osc3.stop(t + dur);
};

// A soft, high-frequency pop for general UI interactions
export const playClick = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
};

// A randomized noisy clack simulating a mechanical keyboard switch
export const playKeypress = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const bufferSize = audioCtx.sampleRate * 0.05; // 50ms pulse
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1; // Pure white noise
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  // Bandpass to shape the plastic 'clack' tone
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 800 + Math.random() * 600; // Randomize pitch slightly
  filter.Q.value = 1.0;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  noise.start();
};

// A deep sub-bass cinematic sweep simulating a CRT monitor or machine booting up
export const playBootHum = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const startTime = audioCtx.currentTime;

  // Layer 1 — main cinematic sweep
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(80, startTime);
  osc1.frequency.linearRampToValueAtTime(180, startTime + 0.5);
  gain1.gain.setValueAtTime(0, startTime);
  gain1.gain.linearRampToValueAtTime(0.5, startTime + 0.1);
  gain1.gain.exponentialRampToValueAtTime(0.01, startTime + 2.0);
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start(startTime);
  osc1.stop(startTime + 2.0);

  // Layer 2 — sub bass for depth
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(30, startTime);
  gain2.gain.setValueAtTime(0.2, startTime);
  gain2.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(startTime);
  osc2.stop(startTime + 1.5);
};

export const playGlitch = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const t = audioCtx.currentTime;
  const dur = 0.35;

  // --- Digital corruption chirp: rapid pitch-modulated oscillator ---
  const chirp = audioCtx.createOscillator();
  const chirpGain = audioCtx.createGain();
  chirp.type = 'square';
  // Stutter between two frequencies rapidly — alien digital artifact
  chirp.frequency.setValueAtTime(80, t);
  chirp.frequency.setValueAtTime(1200, t + 0.02);
  chirp.frequency.setValueAtTime(60, t + 0.04);
  chirp.frequency.setValueAtTime(900, t + 0.06);
  chirp.frequency.setValueAtTime(40, t + 0.09);
  chirp.frequency.setValueAtTime(700, t + 0.12);
  chirp.frequency.setValueAtTime(200, t + 0.18);
  chirp.frequency.setValueAtTime(1400, t + 0.22);
  chirp.frequency.setValueAtTime(80, t + 0.28);
  chirpGain.gain.setValueAtTime(0.18, t);
  chirpGain.gain.linearRampToValueAtTime(0.0, t + dur);
  chirp.connect(chirpGain);
  chirpGain.connect(audioCtx.destination);
  chirp.start(t);
  chirp.stop(t + dur);

  // --- Burst of filtered noise: static shred ---
  const bufLen = Math.floor(audioCtx.sampleRate * dur);
  const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) {
    // Chopped noise — simulate digital dropouts
    data[i] = (i % 480 < 120) ? (Math.random() * 2 - 1) : 0;
  }
  const staticSrc = audioCtx.createBufferSource();
  staticSrc.buffer = buf;
  const staticFilter = audioCtx.createBiquadFilter();
  staticFilter.type = 'bandpass';
  staticFilter.frequency.value = 3000;
  staticFilter.Q.value = 0.6;
  const staticGain = audioCtx.createGain();
  staticGain.gain.setValueAtTime(0.12, t);
  staticGain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  staticSrc.connect(staticFilter);
  staticFilter.connect(staticGain);
  staticGain.connect(audioCtx.destination);
  staticSrc.start(t);
  staticSrc.stop(t + dur);
};

// Plays gravity_falls_ending.mp3 as the doom shutdown sound.
// Falls back to synthesized sound if the file fails to load.
export const playPanic = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;

  fetch('/music/gravity_falls_ending.mp3')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.arrayBuffer();
    })
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      const source = audioCtx.createBufferSource();
      const gainNode = audioCtx.createGain();
      source.buffer = audioBuffer;
      gainNode.gain.setValueAtTime(0.85, audioCtx.currentTime);
      source.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      source.start(audioCtx.currentTime);
    })
    .catch((err) => {
      console.error('Failed to play MP3:', err);
    });
};