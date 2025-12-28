// src/algorithms/bfs/bfsOptimized.ts
import type { Grid, Position, QueueNode } from "../../types/search/grid.js";

/**
 * ZOPTYMALIZOWANA WERSJA BFS
 * - Bez zbędnych logów
 * - Set zamiast Boolean[][]
 * - Early termination
 */
export const bfsShortestPathOptimized = (
  grid: Grid,
  start: Position,
  goal: Position,
  verbose: boolean = false
): Position[] | null => {
  const size = grid.length;

  if (verbose) console.log("🔍 ROZPOCZYNANIE BFS...\n");
  const startTime = performance.now();

  // ✅ Queue
  const queue: QueueNode[] = [
    {
      row: start.row,
      column: start.column,
      path: [start],
      distance: 0,
    },
  ];

  // ✅ Set zamiast Boolean[][] (szybsze, mniejsze)
  const visited = new Set<string>();
  visited.add(`${start.row},${start.column}`);

  let step = 0;
  const directions: Array<[number, number]> = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    step++;

    // ✅ Log co 10,000 kroków (nie każdy!)
    if (verbose && step % 10000 === 0) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      console.log(
        `📊 Krok ${step} | Kolejka: ${queue.length} | Czas: ${elapsed}s`
      );
    }

    // ✅ Early termination - znaleźliśmy cel!
    if (current.row === goal.row && current.column === goal.column) {
      if (verbose) {
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ ZNALEZIONO CEL w ${elapsed}s!\n`);
      }
      return current.path;
    }

    // ✅ Eksploruj sąsiadów BEZ logów
    for (const [dRow, dCol] of directions) {
      const newRow = current.row + dRow;
      const newColumn = current.column + dCol;

      // Walidacja granic (wiersze)
      if (newRow < 0 || newRow >= size) {
        continue;
      }

      // noUncheckedIndexedAccess: grid[newRow] może być undefined
      const gridRow = grid[newRow];
      if (!gridRow) {
        continue;
      }

      // Walidacja granic (kolumny)
      if (newColumn < 0 || newColumn >= gridRow.length) {
        continue;
      }

      // noUncheckedIndexedAccess: gridRow[newColumn] może być undefined
      const cell = gridRow[newColumn];
      if (cell === undefined) {
        continue;
      }

      // Walidacja przeszkody
      if (cell === 1) {
        continue;
      }

      // Walidacja visited
      const key = `${newRow},${newColumn}`;
      if (visited.has(key)) {
        continue;
      }

      // Dodaj do kolejki
      visited.add(key);
      const newPath = [...current.path, { row: newRow, column: newColumn }];
      queue.push({
        row: newRow,
        column: newColumn,
        path: newPath,
        distance: current.distance + 1,
      });
    }
  }

  if (verbose) console.log("\n❌ NIE ZNALEZIONO ŚCIEŻKI!\n");
  return null;
};
