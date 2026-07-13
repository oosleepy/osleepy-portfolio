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
  const bufferSize = audioCtx.sampleRate * 0.2; // 200ms
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (i % 10 < 5 ? 1 : 0.2); // distorted noise
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
  noise.connect(gain);
  gain.connect(audioCtx.destination);
  noise.start();
};

export const playPanic = () => {
  if (!audioCtx || audioCtx.state === 'suspended') return;
  const startTime = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(50, startTime);
  osc.frequency.exponentialRampToValueAtTime(10, startTime + 2);
  gain.gain.setValueAtTime(0.4, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 2);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + 2);
};