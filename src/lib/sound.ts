/**
 * Original sine hops for The Pawprint Trail.
 * Nothing is fetched, recorded, or looped. A blocked audio device stays silent.
 */

type Tone = {
  frequency: number;
  at: number;
  duration: number;
  /** Peak gain at the speakers. Kept small on purpose. */
  gain: number;
  /** Gentle upward glide, as a ratio, on the way out. */
  lift?: number;
};

/** Warm pentatonic hop. About 1.2 seconds, then it is done. */
const LESSON_CHIME: Tone[] = [
  { frequency: 659.25, at: 0, duration: 0.2, gain: 0.045 },
  { frequency: 783.99, at: 0.13, duration: 0.18, gain: 0.05 },
  { frequency: 587.33, at: 0.26, duration: 0.16, gain: 0.04 },
  { frequency: 880, at: 0.38, duration: 0.22, gain: 0.046 },
  { frequency: 1046.5, at: 0.54, duration: 0.62, gain: 0.04, lift: 1.012 },
  { frequency: 392, at: 0.54, duration: 0.62, gain: 0.016 },
];

/** Lighter two-note spark. About a third of a second. */
const QUIZ_SPARK: Tone[] = [
  { frequency: 880, at: 0, duration: 0.14, gain: 0.028 },
  { frequency: 1046.5, at: 0.09, duration: 0.26, gain: 0.024 },
];

let shared: AudioContext | null = null;

function audioContext(): AudioContext | null {
  if (typeof window === "undefined" || typeof window.AudioContext !== "function") return null;
  if (!shared || shared.state === "closed") shared = new window.AudioContext();
  return shared;
}

function schedule(ctx: AudioContext, tones: Tone[]) {
  const origin = ctx.currentTime + 0.02;
  for (const tone of tones) {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    const start = origin + tone.at;
    const stop = start + tone.duration;
    osc.type = "sine";
    osc.frequency.setValueAtTime(tone.frequency, start);
    if (tone.lift && tone.lift > 1) {
      osc.frequency.exponentialRampToValueAtTime(tone.frequency * tone.lift, stop);
    }
    amp.gain.setValueAtTime(0.0001, start);
    amp.gain.exponentialRampToValueAtTime(tone.gain, start + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, stop);
    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start(start);
    osc.stop(stop + 0.03);
  }
}

function play(tones: Tone[]) {
  try {
    const ctx = audioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    schedule(ctx, tones);
  } catch {
    // The lesson still counts if the browser will not play audio.
  }
}

export function playLessonChime() {
  play(LESSON_CHIME);
}

export function playQuizSpark() {
  play(QUIZ_SPARK);
}
