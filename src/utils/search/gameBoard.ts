// src/utils/maze/gameBoard.ts
import type { Grid } from "../../types/search/grid.js";

export const createEmptyGrid = (size: number): Grid => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
};
