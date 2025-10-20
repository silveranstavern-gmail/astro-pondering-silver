import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type RepetitionMode = 36 | 108;

type SoundId = 'bell' | 'ting' | 'wood' | 'digital' | 'bowl' | 'gong';

interface VirtualMalaProps {
  affirmations: string[];
  repetitionMode: RepetitionMode;
}

const DEFAULT_INTERVAL = 5;

const SOUND_OPTIONS: Array<{ id: SoundId; name: string; description: string }> = [
  { id: 'bell', name: 'Bell', description: 'Soft meditation bell' },
  { id: 'ting', name: 'Ting', description: 'Gentle high tone' },
  { id: 'wood', name: 'Wood', description: 'Wooden percussion' },
  { id: 'digital', name: 'Digital', description: 'Simple digital tone' },
  { id: 'bowl', name: 'Singing Bowl', description: 'Tibetan bowl' },
  { id: 'gong', name: 'Gong', description: 'Subtle gong' },
];

export function VirtualMala({ affirmations, repetitionMode }: VirtualMalaProps) {
  const [interval, setInterval] = useState<number>(DEFAULT_INTERVAL);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const [currentSound, setCurrentSound] = useState<SoundId>('bell');

  const timerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(isPlaying);

  const totalCount = useMemo(() => repetitionMode, [repetitionMode]);

  const ensureAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      const Context = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Context) return null;
      audioContextRef.current = new Context();
    }
    return audioContextRef.current;
  };

  const stopMala = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const playTone = useCallback(() => {
    const audioContext = ensureAudioContext();
    if (!audioContext) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (currentSound) {
        case 'bell': {
          oscillator.type = 'sine';
          oscillator.frequency.value = 440;
          gainNode.gain.value = 0.2;
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 1.5);
          break;
        }
        case 'ting': {
          oscillator.type = 'triangle';
          oscillator.frequency.value = 880;
          gainNode.gain.value = 0.15;
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.8);
          break;
        }
        case 'wood': {
          const noiseLength = 0.15;
          const bufferSize = audioContext.sampleRate * noiseLength;
          const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
          const data = buffer.getChannelData(0);

          for (let i = 0; i < bufferSize; i += 1) {
            data[i] = Math.random() * 2 - 1;
          }

          const noise = audioContext.createBufferSource();
          noise.buffer = buffer;

          const filter = audioContext.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 800;
          filter.Q.value = 0.9;

          noise.connect(filter);
          filter.connect(gainNode);

          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

          noise.start();
          noise.stop(audioContext.currentTime + 0.15);
          break;
        }
        case 'digital': {
          oscillator.type = 'square';
          oscillator.frequency.value = 660;
          gainNode.gain.value = 0.1;
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.005);
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        }
        case 'bowl': {
          oscillator.type = 'sine';
          oscillator.frequency.value = 246.94;

          const modulator = audioContext.createOscillator();
          modulator.frequency.value = 4.5;
          const modGain = audioContext.createGain();
          modGain.gain.value = 0.5;
          modulator.connect(modGain);
          modGain.connect(oscillator.frequency);

          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);

          modulator.start();
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 2);
          modulator.stop(audioContext.currentTime + 2);
          break;
        }
        case 'gong': {
          oscillator.disconnect();
          const baseFreq = 80;
          const partials = [1, 2.4, 3.7, 5.8, 8.2];

          partials.forEach((partial, index) => {
            const osc = audioContext.createOscillator();
            const oscGain = audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.value = baseFreq * partial;
            osc.detune.value = Math.random() * 5 - 2.5;
            oscGain.gain.value = 0.15 * (1.0 / (index + 1));
            oscGain.gain.setValueAtTime(0, audioContext.currentTime);
            oscGain.gain.linearRampToValueAtTime(
              0.15 * (1.0 / (index + 1)),
              audioContext.currentTime + 0.02 * (index + 1),
            );
            oscGain.gain.exponentialRampToValueAtTime(
              0.001,
              audioContext.currentTime + 2 + index * 0.4,
            );
            osc.connect(oscGain);
            oscGain.connect(audioContext.destination);
            osc.start();
            osc.stop(audioContext.currentTime + 2 + index * 0.4);
          });
          return;
        }
        default: {
          oscillator.type = 'sine';
          oscillator.frequency.value = 440;
          gainNode.gain.value = 0.2;
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 1);
        }
      }
    } catch (error) {
      console.error('VirtualMala: unable to play tone', error);
    }
  }, [currentSound]);

  const scheduleNextTone = useCallback(() => {
    if (typeof window === 'undefined') return;
    timerRef.current = window.setTimeout(() => {
      if (!isPlayingRef.current) return;
      setCurrentCount((previous) => {
        const next = previous + 1;
        if (next >= totalCount) {
          stopMala();
          return totalCount;
        }
        playTone();
        scheduleNextTone();
        return next;
      });
    }, interval * 1000);
  }, [interval, playTone, stopMala, totalCount]);

  const startMala = useCallback(() => {
    if (isPlaying) return;
    if (!ensureAudioContext()) return;

    setIsPlaying(true);
    isPlayingRef.current = true;
    setCurrentCount(0);
    playTone();
    if (totalCount <= 1) {
      setCurrentCount(1);
      setIsPlaying(false);
      isPlayingRef.current = false;
      return;
    }
    setCurrentCount(1);
    scheduleNextTone();
  }, [ensureAudioContext, isPlaying, playTone, scheduleNextTone, totalCount]);

  const resetInterval = useCallback(() => {
    setInterval(DEFAULT_INTERVAL);
  }, []);

  const calculateRecommendedInterval = useCallback(() => {
    if (!affirmations.length || !affirmations.some((affirmation) => affirmation.trim().length > 0)) {
      setInterval(DEFAULT_INTERVAL);
      return;
    }

    const validAffirmations = affirmations.filter((affirmation) => affirmation.trim().length > 0);
    const avgWordCount = validAffirmations.reduce((sum, affirmation) => {
      const count = affirmation.trim().split(/\s+/).length || 0;
      return sum + count;
    }, 0) / validAffirmations.length;

    const baseTime = avgWordCount * 0.5 + 2;
    const adjustment = validAffirmations.length > 1 ? validAffirmations.length - 1 : 0;
    const computed = Math.round((baseTime + adjustment) * 2) / 2;
    const clamped = Math.min(Math.max(computed, 1), 20);
    setInterval(clamped);
  }, [affirmations]);

  useEffect(() => {
    calculateRecommendedInterval();
  }, [calculateRecommendedInterval]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => () => {
    stopMala();
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, [stopMala]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-purple-50 px-4 py-3 text-gray-700">
        <p>
          Your virtual Mala will sound a gentle tone to guide your repetitions. Adjust the interval to match your speaking
          pace, then press play to begin.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label htmlFor="mala-interval" className="font-medium text-gray-700">
            Seconds between tones: {interval}
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={calculateRecommendedInterval}
              className="rounded-md bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
            >
              Auto-set
            </button>
            <button
              type="button"
              onClick={resetInterval}
              className="rounded-md bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
            >
              Reset
            </button>
          </div>
        </div>
        <input
          id="mala-interval"
          type="range"
          min={1}
          max={20}
          step={0.5}
          value={interval}
          onChange={(event) => setInterval(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Faster (1s)</span>
          <span>Slower (20s)</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={startMala}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPlaying}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M8.25 5.167a.75.75 0 011.125-.649l8.25 5.083a.75.75 0 010 1.298l-8.25 5.083A.75.75 0 018.25 15.333V5.167z" />
          </svg>
          Start
        </button>
        <button
          type="button"
          onClick={stopMala}
          className="flex items-center gap-2 rounded-lg bg-gray-600 px-6 py-3 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!isPlaying}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M6.75 5.25A.75.75 0 017.5 4.5h9a.75.75 0 01.75.75v9a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-9z" />
          </svg>
          Stop
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="text-2xl font-medium text-purple-600">
          {currentCount} / {totalCount}
        </div>
        <div className="text-sm text-gray-600">Repetitions completed</div>
        <div className="mt-3 h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-purple-600 transition-all duration-300"
            style={{ width: `${Math.min((currentCount / totalCount) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-medium text-gray-900">Sound Options</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SOUND_OPTIONS.map((sound) => (
            <button
              key={sound.id}
              type="button"
              onClick={() => setCurrentSound(sound.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                currentSound === sound.id
                  ? 'border-purple-300 bg-purple-100 text-purple-800'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{sound.name}</div>
              <div className="mt-1 text-xs text-gray-500">{sound.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
