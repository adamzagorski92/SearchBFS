// src/utils/maze/printGrid.ts
import type { Grid, Position } from "../../types/search/grid.js";

export const printGrid = (
  grid: Grid,
  start: Position,
  goal: Position,
  path?: Position[]
): void => {
  const size = grid.length;
  const display: Array<Array<number | string>> = grid.map((row) => [...row]);

  if (path) {
    for (const pos of path) {
      if (
        !(pos.row === start.row && pos.column === start.column) &&
        !(pos.row === goal.row && pos.column === goal.column)
      ) {
        const row = display[pos.row];
        if (row && pos.column >= 0 && pos.column < row.length) {
          row[pos.column] = "*";
        }
      }
    }
  }

  const startRow = display[start.row];
  if (startRow && startRow[start.column] !== undefined) {
    startRow[start.column] = "S";
  }

  const goalRow = display[goal.row];
  if (goalRow && goalRow[goal.column] !== undefined) {
    goalRow[goal.column] = "E";
  }

  console.log("\n📍 Plansza:");

  // Nagłówek z numerami kolumn
  const headerNumbers = Array.from({ length: size }, (_, i) =>
    i.toString().padStart(2)
  ).join(" ");
  console.log(`   ${headerNumbers}`);

  for (let i = 0; i < size; i++) {
    const row = display[i];
    if (!row) continue;

    const rowStr = row
      .map((cell: number | string) => {
        if (cell === "S") return "🟢";
        if (cell === "E") return "🏁";
        if (cell === "*") return "✅";
        if (cell === 1) return "🟫";
        return "⬜";
      })
      .join(" ");
    console.log(`${i.toString().padStart(2)}  ${rowStr}`);
  }
  console.log("");
};
