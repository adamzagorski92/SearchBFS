// src/algorithms/bfs/bfsShortestPath.ts
import type { Grid, Position, QueueNode } from "../../types/search/grid.js";

export const bfsShortestPath = (
  grid: Grid,
  start: Position,
  goal: Position
): Position[] | null => {
  const rows = grid.length;

  const isInBounds = (row: number, column: number): boolean =>
    row >= 0 &&
    row < grid.length &&
    column >= 0 &&
    column < (grid[row]?.length ?? 0);

  if (
    !isInBounds(start.row, start.column) ||
    !isInBounds(goal.row, goal.column)
  ) {
    return null;
  }

  console.log("🔍 ROZPOCZYNANIE BFS...\n");

  const queue: QueueNode[] = [
    {
      row: start.row,
      column: start.column,
      path: [start],
      distance: 0,
    },
  ];

  const visited: boolean[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: grid[r]?.length ?? 0 }, () => false)
  );

  const startVisitedRow = visited[start.row];
  if (!startVisitedRow) {
    return null;
  }
  startVisitedRow[start.column] = true;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ] as const;
  const directionNames = ["↑ (GÓRA)", "↓ (DÓŁ)", "→ (PRAWO)", "← (LEWO)"];

  let step = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    step++;

    console.log(`\n📍 KROK ${step}:`);
    console.log(
      `   Odwiedzam: (${current.row}, ${current.column}) - Dystans: ${current.distance}`
    );
    console.log(`   Długość ścieżki: ${current.path.length}`);
    console.log(`   Liczba elementów w kolejce: ${queue.length}`);

    if (current.row === goal.row && current.column === goal.column) {
      console.log(`\n✅ ZNALEZIONO CEL! (${goal.row}, ${goal.column})\n`);
      return current.path;
    }

    console.log(`   🔎 Sprawdzam sąsiadów:`);
    for (const [i, direction] of directions.entries()) {
      const directionName = directionNames[i] ?? "NIEZNANY KIERUNEK";

      const [dRow, dCol] = direction;
      const newRow = current.row + dRow;
      const newColumn = current.column + dCol;

      // Czy w granicach planszy?
      if (!isInBounds(newRow, newColumn)) {
        console.log(
          `      ${directionName}: (${newRow}, ${newColumn}) ❌ Poza planszą`
        );
        continue;
      }

      const gridRow = grid[newRow];
      const visitedRow = visited[newRow];

      if (!gridRow || !visitedRow) {
        continue;
      }

      // Czy jest przeszkoda?
      if (gridRow[newColumn] === 1) {
        console.log(
          `      ${directionName}: (${newRow}, ${newColumn}) ❌ Przeszkoda`
        );
        continue;
      }

      // Czy już odwiedzony?
      if (visitedRow[newColumn]) {
        console.log(
          `      ${directionName}: (${newRow}, ${newColumn}) ❌ Już odwiedzony`
        );
        continue;
      }

      // Dodaj do kolejki
      visitedRow[newColumn] = true;
      const newPath = [...current.path, { row: newRow, column: newColumn }];
      queue.push({
        row: newRow,
        column: newColumn,
        path: newPath,
        distance: current.distance + 1,
      });

      console.log(
        `      ${directionName}: (${newRow}, ${newColumn}) ✅ Dodano do kolejki`
      );
    }
  }

  console.log("\n❌ NIE ZNALEZIONO ŚCIEŻKI!\n");
  return null;
};
