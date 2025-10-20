import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MANIFESTATION_SECTIONS_KEY,
  MANIFESTATION_STORAGE_KEY,
  addDays,
  createEmptyCompletionMatrix,
  formatShortDate,
  getDaysElapsed,
  isDayToday,
  parseDate,
} from '../../utils/manifestation';
import type { ManifestationTrackerData } from '../../utils/manifestation';
import { CollapsibleSection } from './CollapsibleSection';
import { VirtualMala } from './VirtualMala';

const MAX_AFFIRMATIONS = 3;
const DAYS_IN_CYCLE = 7;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

type RepetitionMode = 36 | 108;

type CollapsedSections = {
  affirmations: boolean;
  progress: boolean;
  todayPractice: boolean;
  education: boolean;
  virtualMala: boolean;
};

const DEFAULT_SECTIONS: CollapsedSections = {
  affirmations: false,
  progress: false,
  todayPractice: false,
  education: true,
  virtualMala: false,
};

function normalizeCompletionMatrix(source: unknown): boolean[][] {
  const matrix = createEmptyCompletionMatrix();
  if (!Array.isArray(source)) return matrix;
  return matrix.map((day, dayIndex) => {
    const sessions = Array.isArray(source[dayIndex]) ? source[dayIndex] : [];
    return day.map((_, sessionIndex) => Boolean(sessions[sessionIndex]));
  });
}

function hasAnyCompletion(matrix: boolean[][]): boolean {
  return matrix.some((day) => day.some((session) => session));
}

function buildSectionsState(source: unknown): CollapsedSections {
  if (!source || typeof source !== 'object') {
    return { ...DEFAULT_SECTIONS };
  }
  return {
    ...DEFAULT_SECTIONS,
    ...(source as Partial<CollapsedSections>),
  };
}

export function ManifestationTracker() {
  const [affirmations, setAffirmations] = useState<string[]>(['']);
  const [repetitionMode, setRepetitionMode] = useState<RepetitionMode>(36);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [completionData, setCompletionData] = useState<boolean[][]>(createEmptyCompletionMatrix());
  const [sections, setSections] = useState<CollapsedSections>({ ...DEFAULT_SECTIONS });

  const hydrationComplete = useRef(false);
  const hasPromptedReset = useRef(false);

  const hasCompletions = useMemo(() => hasAnyCompletion(completionData), [completionData]);

  const todayCompletionStatus = useMemo(() => {
    const diffDays = getDaysElapsed(startDate);
    if (diffDays < 0 || diffDays >= DAYS_IN_CYCLE) {
      return [false, false, false];
    }
    const dayData = completionData[diffDays];
    if (!dayData) return [false, false, false];
    return dayData;
  }, [completionData, startDate]);

  const toggleSection = useCallback((section: keyof CollapsedSections) => {
    setSections((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  }, []);

  const saveSections = useCallback(
    (nextSections: CollapsedSections) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(MANIFESTATION_SECTIONS_KEY, JSON.stringify(nextSections));
    },
    [],
  );

  const saveTrackerData = useCallback(
    (data: ManifestationTrackerData) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(MANIFESTATION_STORAGE_KEY, JSON.stringify(data));
    },
    [],
  );

  const updateStartDateIfNeeded = useCallback(() => {
    if (!hasCompletions) {
      setStartDate(new Date());
    }
  }, [hasCompletions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedSections = localStorage.getItem(MANIFESTATION_SECTIONS_KEY);
      if (storedSections) {
        setSections(buildSectionsState(JSON.parse(storedSections)));
      }
    } catch (error) {
      console.warn('ManifestationTracker: unable to load section state', error);
    }

    try {
      const saved = localStorage.getItem(MANIFESTATION_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as Partial<ManifestationTrackerData> | null;
        if (data?.affirmations && Array.isArray(data.affirmations) && data.affirmations.length) {
          setAffirmations(data.affirmations.slice(0, MAX_AFFIRMATIONS));
        }
        if (data?.repetitionMode === 108) {
          setRepetitionMode(108);
        }
        if (data?.startDate) {
          setStartDate(parseDate(data.startDate));
        }
        if (data?.completionData) {
          setCompletionData(normalizeCompletionMatrix(data.completionData));
        }
      }
    } catch (error) {
      console.warn('ManifestationTracker: unable to load tracker data', error);
    } finally {
      hydrationComplete.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydrationComplete.current || typeof window === 'undefined') {
      return;
    }
    saveSections(sections);
  }, [sections, saveSections]);

  useEffect(() => {
    if (!hydrationComplete.current || typeof window === 'undefined') {
      return;
    }

    const payload: ManifestationTrackerData = {
      affirmations,
      repetitionMode,
      startDate: startDate.toISOString(),
      completionData,
    };
    saveTrackerData(payload);
  }, [affirmations, repetitionMode, startDate, completionData, saveTrackerData]);

  useEffect(() => {
    if (!hydrationComplete.current || hasPromptedReset.current) return;
    const diffDays = getDaysElapsed(startDate);
    if (diffDays >= DAYS_IN_CYCLE) {
      hasPromptedReset.current = true;
      if (window.confirm('It has been 7 days since you started tracking. Would you like to reset for a new cycle?')) {
        setStartDate(new Date());
        setCompletionData(createEmptyCompletionMatrix());
      }
    }
  }, [startDate]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        updateStartDateIfNeeded();
      }
    };

    const handleFocus = () => {
      updateStartDateIfNeeded();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
    };
  }, [updateStartDateIfNeeded]);

  const handleAffirmationChange = useCallback((index: number, value: string) => {
    setAffirmations((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
  }, []);

  const addAffirmation = useCallback(() => {
    setAffirmations((previous) => {
      if (previous.length >= MAX_AFFIRMATIONS) return previous;
      return [...previous, ''];
    });
  }, []);

  const removeAffirmation = useCallback((index: number) => {
    setAffirmations((previous) => {
      const filtered = previous.filter((_, idx) => idx !== index);
      return filtered.length ? filtered : [''];
    });
  }, []);

  const toggleSession = useCallback(
    (dayIndex: number, sessionIndex: number) => {
      setCompletionData((previous) => {
        const next = previous.map((sessions) => [...sessions]);
        if (!next[dayIndex]) {
          next[dayIndex] = [false, false, false];
        }
        const priorHadCompletion = hasAnyCompletion(previous);
        next[dayIndex][sessionIndex] = !next[dayIndex][sessionIndex];
        const toggledOn = next[dayIndex][sessionIndex];

        if (!priorHadCompletion && toggledOn) {
          setStartDate((current) => {
            const today = new Date();
            const updated = new Date(today.getTime() - dayIndex * MILLISECONDS_PER_DAY);
            return updated;
          });
        }

        return next;
      });
    },
    [],
  );

  const toggleTodaySession = useCallback(
    (sessionIndex: number) => {
      const diffDays = getDaysElapsed(startDate);
      if (diffDays < 0 || diffDays >= DAYS_IN_CYCLE) {
        return;
      }
      toggleSession(diffDays, sessionIndex);
    },
    [startDate, toggleSession],
  );

  const resetTracker = useCallback(() => {
    if (window.confirm('Reset your 7-day tracker? This will clear all progress.')) {
      setStartDate(new Date());
      setCompletionData(createEmptyCompletionMatrix());
    }
  }, []);

  const activeAffirmations = affirmations.filter((affirmation) => affirmation.trim().length > 0);

  return (
    <div className="space-y-8">
      <CollapsibleSection
        title="Your Affirmations"
        isOpen={!sections.affirmations}
        onToggle={() => toggleSection('affirmations')}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            {affirmations.map((affirmation, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <input
                    value={affirmation}
                    onChange={(event) => handleAffirmationChange(index, event.target.value)}
                    type="text"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your affirmation..."
                  />
                  <button
                    type="button"
                    onClick={() => removeAffirmation(index)}
                    className="rounded-lg p-2 text-gray-400 transition hover:text-red-500"
                    aria-label="Remove affirmation"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M9 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75V5h2.25a.75.75 0 010 1.5h-.31l-.81 11.387A2.25 2.25 0 0113.89 20H10.11a2.25 2.25 0 01-2.239-2.113L7.06 6.5H6.75a.75.75 0 010-1.5H9V3.75zm1.5.75v.5h3v-.5h-3zM8.56 6.5l.8 11.25a.75.75 0 00.75.7h3.78a.75.75 0 00.75-.7L15.44 6.5H8.56z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={addAffirmation}
              className="flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={affirmations.length >= MAX_AFFIRMATIONS}
            >
              {affirmations.length < MAX_AFFIRMATIONS ? 'Add Affirmation' : 'Maximum 3 Affirmations'}
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-600">Repetition Mode:</span>
              <div className="flex items-center gap-1 rounded-lg border border-gray-300 p-1">
                <button
                  type="button"
                  onClick={() => setRepetitionMode(36)}
                  className={`rounded px-3 py-1 text-sm transition ${
                    repetitionMode === 36 ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  36x (3/day)
                </button>
                <button
                  type="button"
                  onClick={() => setRepetitionMode(108)}
                  className={`rounded px-3 py-1 text-sm transition ${
                    repetitionMode === 108 ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  108x (1/day)
                </button>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="7-Day Progress"
        isOpen={!sections.progress}
        onToggle={() => toggleSection('progress')}
      >
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={resetTracker}
              className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Reset Tracker
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {Array.from({ length: DAYS_IN_CYCLE }, (_, index) => index).map((dayIndex) => {
              const sessions = completionData[dayIndex] ?? [false, false, false];
              const dayDate = addDays(startDate, dayIndex);
              const highlight = isDayToday(startDate, dayIndex);

              return (
                <div
                  key={dayIndex}
                  className={`flex flex-col rounded-lg border p-4 transition ${
                    highlight ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-800">Day {dayIndex + 1}</div>
                  <div className="text-xs text-gray-500">{formatShortDate(dayDate)}</div>

                  <div className="mt-4 space-y-2">
                    {repetitionMode === 36 ? (
                      <div className="grid grid-cols-3 gap-1">
                        {[0, 1, 2].map((sessionIndex) => (
                          <button
                            type="button"
                            key={sessionIndex}
                            onClick={() => toggleSession(dayIndex, sessionIndex)}
                            className={`flex h-7 items-center justify-center rounded text-xs font-medium transition ${
                              sessions[sessionIndex]
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {sessionIndex + 1}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleSession(dayIndex, 0)}
                        className={`flex h-9 items-center justify-center rounded text-sm font-medium transition ${
                          sessions[0] ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sessions[0] ? 'Completed' : 'Pending'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CollapsibleSection>

      {affirmations.length > 0 ? (
        <CollapsibleSection
          title="Today's Practice"
          isOpen={!sections.todayPractice}
          onToggle={() => toggleSection('todayPractice')}
        >
          <div className="space-y-6">
            <div className="rounded-lg bg-purple-50 px-4 py-3 text-gray-600">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">Current Mode:</span>
                <span className="rounded bg-purple-600 px-2 py-1 text-xs font-medium text-white">
                  {repetitionMode === 36 ? '36 repetitions, 3x daily' : '108 repetitions, 1x daily'}
                </span>
              </div>
              <p>{repetitionMode === 36 ? 'Repeat each affirmation 36 times per session, 3 times today.' : 'Repeat each affirmation 108 times in a single focused session today.'}</p>
            </div>

            <div className="space-y-4">
              {activeAffirmations.map((affirmation, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 text-sm font-medium text-gray-700">Affirmation #{index + 1}</div>
                  <blockquote className="rounded bg-gray-50 p-3 italic text-gray-800">“{affirmation}”</blockquote>
                  <div className="mt-2 text-sm text-gray-500">
                    Repeat {repetitionMode} times {repetitionMode === 36 ? 'per session' : ''}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Today's Progress:</h3>
              {repetitionMode === 36 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[0, 1, 2].map((sessionIndex) => (
                    <button
                      type="button"
                      key={sessionIndex}
                      onClick={() => toggleTodaySession(sessionIndex)}
                      className={`rounded-lg border p-4 text-left transition ${
                        todayCompletionStatus[sessionIndex]
                          ? 'border-green-200 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-sm text-gray-600">Session {sessionIndex + 1}</div>
                      <div className="mt-1 font-medium">
                        {todayCompletionStatus[sessionIndex] ? 'Completed' : 'Pending'}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleTodaySession(0)}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    todayCompletionStatus[0] ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm text-gray-600">Daily Session</div>
                  <div className="mt-1 font-medium">
                    {todayCompletionStatus[0] ? 'Completed' : 'Pending'}
                  </div>
                </button>
              )}
            </div>
          </div>
        </CollapsibleSection>
      ) : null}

      <CollapsibleSection
        title="Virtual Mala Beads"
        isOpen={!sections.virtualMala}
        onToggle={() => toggleSection('virtualMala')}
      >
        <VirtualMala affirmations={affirmations} repetitionMode={repetitionMode} />
      </CollapsibleSection>

      <CollapsibleSection
        title="About This Practice"
        isOpen={!sections.education}
        onToggle={() => toggleSection('education')}
      >
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-lg font-medium">Manifestation Practice: Enhancing Your Affirmations</h3>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">The Science Behind Affirmations</h4>
            <p>
              Positive affirmations leverage the power of your brain's <strong>Reticular Activating System (RAS)</strong>, an intricate network of neurons in the brainstem responsible for filtering and prioritizing the massive amounts of information you encounter daily.
              By consistently repeating affirmations, you train your RAS to recognize and prioritize experiences, opportunities, and resources that match your intentions.
            </p>
            <p>
              This neurological “tuning” enhances your perception, empowering you to notice and seize opportunities you might otherwise overlook.
              Affirmations prime your brain to transform your mindset and actions, guiding you closer to your desired outcomes.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">The Significance of Repetition Numbers</h4>
            <div className="space-y-2">
              <p>
                <strong>36 Repetitions:</strong> blends the energies of numbers <strong>3</strong> and <strong>6</strong>, representing creativity, harmony, compassion, and growth—ideal for focused, goal-oriented affirmations.
              </p>
              <p>
                <strong>108 Repetitions:</strong> carries profound spiritual resonance across traditions, reflecting completeness and universal harmony. Mala beads traditionally include 108 beads for mindful counting.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Best Practices for Effective Affirmations</h4>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Speak with genuine conviction:</strong> deliver affirmations with emotion and confidence.</li>
              <li><strong>Use positive, present-tense phrasing:</strong> treat your intentions as lived reality.</li>
              <li><strong>Stay consistent:</strong> regular practice reinforces neural pathways and deepens the impact.</li>
              <li><strong>Remain focused:</strong> give your full attention to each repetition to align mind and intention.</li>
              <li><strong>Visualize outcomes:</strong> pair affirmations with vivid imagery to amplify emotional resonance.</li>
              <li><strong>Create ritual:</strong> structured repetition anchors your practice and clarifies personal goals.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
