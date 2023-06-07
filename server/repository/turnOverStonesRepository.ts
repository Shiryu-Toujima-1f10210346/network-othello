/*
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

function turnOver(
  board: BoardArr,
  x: number,
  y: number,
  turn: number,
  dx: number,
  dy: number
): void {
  for (let c = 1; c < 7; c++) {
    if (!isValid(board, x + dx * c, y + dy * c) || board[x + dx * c][y + dy * c] === 0) {
      break;
    }
    if (board[x + dx * c][y + dy * c] === turn) {
      for (let i = 1; i < c; i++) {
        board[x + dx * i][y + dy * i] = turn;
      }
      break;
    }
  }
}

export const turnOverStonesRepository = {
  turnOverStones: (x: number, y: number, turn: number) => {
    for (const [dx, dy] of direction) {
      if (canPlace(board, x, y, turn, dx, dy)) {
        turnOver(board, x, y, turn, dx, dy);
      }
    }
  },
};


*/
