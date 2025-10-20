export const GRID_SIZE = 3;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
export const ALL_ON_STATE = (1 << TOTAL_CELLS) - 1;

export type LightsState = boolean[];
export type SolveMode = 'set' | 'solve';

const toggleMasks = buildToggleMasks();

function buildToggleMasks(): number[] {
  const masks = Array<number>(TOTAL_CELLS).fill(0);
  for (let index = 0; index < TOTAL_CELLS; index += 1) {
    let mask = 1 << index;
    // left neighbour
    if (index % GRID_SIZE > 0) mask |= 1 << (index - 1);
    // right neighbour
    if (index % GRID_SIZE < GRID_SIZE - 1) mask |= 1 << (index + 1);
    // up neighbour
    if (index >= GRID_SIZE) mask |= 1 << (index - GRID_SIZE);
    // down neighbour
    if (index < TOTAL_CELLS - GRID_SIZE) mask |= 1 << (index + GRID_SIZE);
    masks[index] = mask;
  }
  return masks;
}

export function getAffectedPositions(index: number): number[] {
  const affected = [index];
  if (index % GRID_SIZE > 0) affected.push(index - 1);
  if (index % GRID_SIZE < GRID_SIZE - 1) affected.push(index + 1);
  if (index >= GRID_SIZE) affected.push(index - GRID_SIZE);
  if (index < TOTAL_CELLS - GRID_SIZE) affected.push(index + GRID_SIZE);
  return affected;
}

export function stateToNumber(state: LightsState): number {
  return state.reduce((accumulator, cell, index) => (cell ? accumulator | (1 << index) : accumulator), 0);
}

export function numberToState(encoded: number): LightsState {
  const state: LightsState = Array(TOTAL_CELLS).fill(false);
  for (let index = 0; index < TOTAL_CELLS; index += 1) {
    state[index] = ((encoded >> index) & 1) === 1;
  }
  return state;
}

export function toggleCell(state: LightsState, index: number, mode: SolveMode): LightsState {
  const next = [...state];
  if (mode === 'set') {
    next[index] = !next[index];
    return next;
  }
  getAffectedPositions(index).forEach((position) => {
    next[position] = !next[position];
  });
  return next;
}

export function applyToggle(state: number, index: number): number {
  return state ^ toggleMasks[index];
}

export function findSolution(initial: LightsState): number[] | null {
  const start = stateToNumber(initial);
  if (start === ALL_ON_STATE) return [];

  const visited = new Set<number>([start]);
  const queue: number[] = [start];
  const parent = new Map<number, { state: number; move: number }>();

  while (queue.length) {
    const current = queue.shift()!;
    for (let move = 0; move < TOTAL_CELLS; move += 1) {
      const nextState = applyToggle(current, move);
      if (visited.has(nextState)) continue;
      visited.add(nextState);
      parent.set(nextState, { state: current, move });
      if (nextState === ALL_ON_STATE) {
        return reconstructPath(parent, start, nextState);
      }
      queue.push(nextState);
    }
  }

  return null;
}

function reconstructPath(
  parent: Map<number, { state: number; move: number }>,
  start: number,
  goal: number,
): number[] {
  const moves: number[] = [];
  let cursor = goal;
  while (cursor !== start) {
    const record = parent.get(cursor);
    if (!record) break;
    moves.push(record.move);
    cursor = record.state;
  }
  return moves.reverse();
}

export function randomState(): LightsState {
  return Array.from({ length: TOTAL_CELLS }, () => Math.random() < 0.5);
}

export function allOffState(): LightsState {
  return Array(TOTAL_CELLS).fill(false);
}
