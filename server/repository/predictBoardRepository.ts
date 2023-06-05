import type { BoardArr } from './boardRepository';
import { boardRepository } from './boardRepository';

const board = boardRepository.getBoard();
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
  /*
  for (let c = 2; c < 7; c++) {
    if (!isValid(board, x + dx * c, y + dy * c) || board[x + dx * c][y + dy * c] === 0) {
      break;
    }
    if (board[x + dx * c][y + dy * c] === turn) {
      return true;
    }
  }
  return false;
}

function predict(board: BoardArr, turn: number): void {
  for (let a = 0; a < 8; a++) {
    for (let b = 0; b < 8; b++) {
      let checked = false;
      if (![1, 2].includes(board[a][b])) {
        for (const t of direction) {
          if (
            isValid(board, a + t[0], b + t[1]) &&
            board[a + t[0]][b + t[1]] !== turn &&
            board[a + t[0]][b + t[1]] !== 0
          ) {
            if (canPlace(board, a, b, turn, t[0], t[1])) {
              board[a][b] = 0;
              checked = true;
              break;
            }
          }
        }
      }
      if (!checked) {
        board[a][b] = -1;
      }
    }
  }
}*/

export const predictedBoard = {
  predictBoard: (board: BoardArr, turn: number) => {
    predict(board, turn);
    return board;
  },
};
