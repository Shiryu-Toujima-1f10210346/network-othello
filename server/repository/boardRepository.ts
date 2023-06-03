import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorReoisitory';

export type BoardArr = number[][];

export type Pos = { x: number; y: number };

const board: BoardArr = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0], // 0: none, 1: black, 2: white
];
export const boardRepository = {
  getBoard: () => board,
  clickBoard: (params: Pos, userId: UserId) => {
    userColorRepository.getUserColor(userId);
    board[params.y][params.x] = userColorRepository.getUserColor(userId);
    return board;
  },
};
