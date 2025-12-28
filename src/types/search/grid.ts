export type Grid = number[][];

export interface Position {
  row: number;
  column: number;
}

export interface QueueNode {
  row: number;
  column: number;
  path: Position[];
  distance: number;
}
