// InterVueX - Sound Effects Synthesizer using Web Audio API

let sharedAudioCtx = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioContextClass();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Soft "Paper Page Flip" Sound (📖)
 * Accurately synthesizes the crisp, silky flutter and air whoosh of turning a book/sheet page.
 */
export const playPaperPageFlipSound = (volume = 1) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.22; // ~220ms natural snappy page turn

    // 1. Generate organic noise buffer (simulating paper fiber friction & rustle)
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate pink-tinted filtered noise
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = (Math.random() * 2 - 1);
      output[i] = (lastOut * 0.45 + white * 0.55) * 0.8;
      lastOut = output[i];
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // 2. High-pass filter to remove low rumble and keep page sound silky soft
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(420, now);

    // 3. Dynamic Bandpass filter to sweep frequency (page sliding through air)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.setValueAtTime(1.8, now);
    
    // Add micro-variation so each flip sounds uniquely natural
    const freqShift = (Math.random() - 0.5) * 80;
    bandpass.frequency.setValueAtTime(950 + freqShift, now);
    bandpass.frequency.exponentialRampToValueAtTime(2700 + freqShift, now + 0.065);
    bandpass.frequency.exponentialRampToValueAtTime(1100 + freqShift, now + duration);

    // 4. Double-flutter envelope (Page lift + paper landing/settle)
    const noiseGain = ctx.createGain();
    const peakVol = 0.055 * Math.max(0.1, Math.min(volume, 2));
    
    noiseGain.gain.setValueAtTime(0.0001, now);
    // First rustle (lift off)
    noiseGain.gain.linearRampToValueAtTime(peakVol, now + 0.025);
    noiseGain.gain.exponentialRampToValueAtTime(peakVol * 0.35, now + 0.075);
    // Second rustle (flick / settle)
    noiseGain.gain.linearRampToValueAtTime(peakVol * 0.75, now + 0.11);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // 5. Very subtle low-frequency air displacement (page turning weight)
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    const bodyFilter = ctx.createBiquadFilter();

    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(140, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(55, now + 0.12);

    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(160, now);

    const bodyVol = 0.025 * Math.max(0.1, Math.min(volume, 2));
    bodyGain.gain.setValueAtTime(0.0001, now);
    bodyGain.gain.linearRampToValueAtTime(bodyVol, now + 0.02);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    // Audio node routing
    noiseSource.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    bodyOsc.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(ctx.destination);

    // Trigger playback
    noiseSource.start(now);
    noiseSource.stop(now + duration);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.14);
  } catch (e) {
    // Fallback gracefully if Web Audio is blocked or unavailable
  }
};
