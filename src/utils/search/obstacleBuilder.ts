// src/utils/maze/obstacleBuilder.ts
import type { Grid } from "../../types/search/grid.js";

export const addRandomObstacles = (grid: Grid, obstacleCount: number): void => {
  const size = grid.length;
  let added = 0;

  while (added < obstacleCount) {
    const row = Math.floor(Math.random() * size);
    const column = Math.floor(Math.random() * size);

    if (
      (row === 0 && column === 0) ||
      (row === size - 1 && column === size - 1)
    ) {
      continue;
    }

    const rowData = grid[row];
    if (!rowData || column >= rowData.length) {
      continue;
    }

    if (rowData[column] === 0) {
      rowData[column] = 1;
      added++;
    }
  }
};
