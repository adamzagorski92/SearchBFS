// src/utils/maze/printResult.ts
import type { Position } from "../../types/search/grid.js";
import { printGrid } from "./printGrid.js";
import type { Grid } from "../../types/search/grid.js";

export const printResult = (
  grid: Grid,
  start: Position,
  goal: Position,
  path: Position[] | null,
  size: number
): void => {
  if (path) {
    console.log("═══════════════════════════════════════");
    console.log("        ✅ ROZWIĄZANIE ZNALEZIONE ✅");
    console.log("═══════════════════════════════════════\n");

    console.log(`📊 Liczba ruchów: ${path.length - 1}`);
    console.log(`📊 Liczba kroków ścieżki: ${path.length}\n`);

    console.log("📍 Pełna ścieżka:");
    path.forEach((pos, index) => {
      console.log(`   Krok ${index}: (${pos.row}, ${pos.column})`);
    });

    console.log("\n");
    // printGrid(grid, start, goal, path);
  } else {
    console.log("═══════════════════════════════════════");
    console.log("      ❌ BRAK ROZWIĄZANIA ❌");
    console.log("═══════════════════════════════════════\n");
  }
};
