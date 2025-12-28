import type { Position } from "../../types/search/grid.js";
import { bfsShortestPathOptimized } from "./bfsOptimized.js";
import { createEmptyGrid } from "./gameBoard.js";
import { addRandomObstacles } from "./obstacleBuilder.js";
import { printResult } from "./printResult.js";

export const runMazeSolver = (size: number, obstacles: number): void => {
  console.log("═══════════════════════════════════════");
  console.log(`   🎮 SOLVER LABIRYNTU ${size}x${size} Z BFS 🎮`);
  console.log("═══════════════════════════════════════\n");

  // 1. Utwórz planszę
  const grid = createEmptyGrid(size);
  console.log(`✅ Stworzona plansza ${size}x${size}\n`);

  // 2. Dodaj przeszkody
  addRandomObstacles(grid, obstacles);
  console.log(`✅ Dodano ${obstacles} losowych przeszkód\n`);

  // 3. Zdefiniuj start i cel
  const start: Position = { row: 0, column: 0 };
  const goal: Position = { row: size - 1, column: size - 1 };

  console.log(`✅ Start: (${start.row}, ${start.column})`);
  console.log(`✅ Cel: (${goal.row}, ${goal.column})\n`);

  // // 4. Wyświetl planszę
  // printGrid(grid, start, goal);

  // 5. Uruchom BFS
  const path = bfsShortestPathOptimized(grid, start, goal);

  // 6. Wyświetl wynik
  printResult(grid, start, goal, path, size);
};
