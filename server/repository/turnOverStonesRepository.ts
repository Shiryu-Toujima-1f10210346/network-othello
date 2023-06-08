import type { BoardArr } from './boardRepository';
import { boardRepository } from './boardRepository';


const direction = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

function isValid(board: BoardArr, x: number, y: number): boolean {
  return board[x] !== undefined && board[x][y] !== undefined && board[x][y] !== -1;
}

function canPlace(
  board: BoardArr,
  x: number,
  y: number,
  turn: number,
  dx: number,
  dy: number
): boolean {
  for (let c = 2; c < 7; c++) {
    //eslint-disable-next-line
    if (!isValid(board, x + dx * c, y + dy * c) || board[x + dx * c][y + dy * c] === 0) {
      break;
    }
    //eslint-disable-next-line
    if (board[x + dx * c][y + dy * c] === turn) {
      return true;
    }
  }
  return false;
}

function turnOver(
  board: BoardArr,
  x: number,
  y: number,
  turn: number,
  dx: number,
  dy: number
): void {
  for (let c = 1; c < 7; c++) {
    //eslint-disable-next-line
    if (!isValid(board, x + dx * c, y + dy * c) || board[x + dx * c][y + dy * c] === 0) {
      break;
    }
    //eslint-disable-next-line
    if (board[x + dx * c][y + dy * c] === turn) {
      //eslint-disable-next-line
      for (let i = 1; i < c; i++) {
        board[x + dx * i][y + dy * i] = turn;
      }
      break;
    }
  }
}

export const turnOverStonesRepository = {
  turnOverStones: (x: number, y: number, turn: number) => {
    const newBoard = boardRepository.getBoard();
    for (const [dx, dy] of direction) {
      //eslint-disable-next-line
      if (canPlace(newBoard, x, y, turn, dx, dy)) {
        turnOver(newBoard, x, y, turn, dx, dy);
      }
    }
    return newBoard;
  },
};
1;
