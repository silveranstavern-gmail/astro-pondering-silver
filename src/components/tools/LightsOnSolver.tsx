import { useCallback, useMemo, useState } from 'react';
import type { LightsState, SolveMode } from '../../utils/lightsOn';
import {
  allOffState,
  findSolution,
  getAffectedPositions,
  randomState,
  toggleCell,
  TOTAL_CELLS,
  GRID_SIZE,
} from '../../utils/lightsOn';

function createInitialState(): LightsState {
  return allOffState();
}

const MODE_LABELS: Record<SolveMode, { title: string; helper: string }> = {
  set: {
    title: 'Set State',
    helper: 'Toggle individual lights to match the puzzle input.',
  },
  solve: {
    title: 'Solve Mode',
    helper: 'Simulate in-game behaviour by toggling a light and its neighbours.',
  },
};

export function LightsOnSolver() {
  const [mode, setMode] = useState<SolveMode>('set');
  const [lights, setLights] = useState<LightsState>(createInitialState);
  const [solution, setSolution] = useState<number[]>([]);
  const [solving, setSolving] = useState(false);
  const [noSolutionFound, setNoSolutionFound] = useState(false);

  const rows = useMemo(() => Array.from({ length: GRID_SIZE }, (_, row) => row), []);

  const clearSolutionState = useCallback(() => {
    setSolution([]);
    setNoSolutionFound(false);
  }, []);

  const handleCellClick = useCallback(
    (index: number) => {
      setLights((previous) => toggleCell(previous, index, mode));
      clearSolutionState();
    },
    [mode, clearSolutionState],
  );

  const handleReset = useCallback(() => {
    setLights(allOffState());
    clearSolutionState();
  }, [clearSolutionState]);

  const handleRandomize = useCallback(() => {
    setLights(randomState());
    clearSolutionState();
  }, [clearSolutionState]);

  const handleSolve = useCallback(async () => {
    setSolving(true);
    setSolution([]);
    setNoSolutionFound(false);

    await Promise.resolve();

    try {
      const result = findSolution(lights);
      if (result && result.length >= 0) {
        setSolution(result);
        setNoSolutionFound(result.length === 0);
      } else {
        setNoSolutionFound(true);
      }
    } catch (error) {
      console.error('LightsOnSolver: solver error', error);
      setNoSolutionFound(true);
    } finally {
      setSolving(false);
    }
  }, [lights]);

  const activeHelper = MODE_LABELS[mode].helper;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Mode</h2>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(MODE_LABELS) as SolveMode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                  mode === option
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {MODE_LABELS[option].title}
              </button>
            ))}
          </div>
        </header>
        <p className="mt-3 text-sm text-gray-600">{activeHelper}</p>
      </section>

      <section className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-gray-900 p-6 text-white shadow-sm">
        <div className="grid grid-cols-3 gap-3 self-center">
          {Array.from({ length: TOTAL_CELLS }, (_, index) => {
            const isOn = lights[index];
            const neighbours = getAffectedPositions(index).length - 1;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleCellClick(index)}
                className={`relative flex h-16 w-16 items-center justify-center rounded-xl border text-2xl font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                  isOn
                    ? 'border-purple-400 bg-slate-800 text-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.5)]'
                    : 'border-slate-700 bg-slate-800 text-slate-500 hover:border-purple-300'
                }`}
                aria-label={`Toggle light ${index + 1}${mode === 'solve' ? ` (affects ${neighbours} neighbours)` : ''}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleSolve}
            disabled={solving}
            className="rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {solving ? 'Solving…' : 'Solve'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-slate-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-500"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleRandomize}
            className="rounded-lg bg-purple-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
          >
            Randomize
          </button>
        </div>
      </section>

      {solution.length ? (
        <section className="rounded-2xl border border-purple-100 bg-purple-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-800">Solution Steps</h3>
          <p className="mt-1 text-sm text-purple-700">
            Click the lights in this order to turn everything on. Each step references the numbered grid above.
          </p>
          <ol className="mt-4 space-y-2 text-sm text-purple-900">
            {solution.map((step, index) => (
              <li key={`${step}-${index}`} className="rounded-lg bg-white px-4 py-2 shadow">
                <span className="font-semibold">Step {index + 1}:</span> Click position {step + 1}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {noSolutionFound ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          No solution found for this configuration. Try adjusting the starting state.
        </div>
      ) : null}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">How it works</h3>
        <p className="mt-3 text-sm text-gray-600">
          The solver uses a breadth-first search to examine every possible combination of toggles. Each move flips the selected
          light and its horizontal and vertical neighbours, matching the behaviour inside Magicraft. When a path that lights up
          the entire board is found, you&apos;ll see the steps above.
        </p>
      </section>
    </div>
  );
}
