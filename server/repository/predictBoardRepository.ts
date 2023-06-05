import type { BoardArr } from './boardRepository';
import { boardRepository } from './boardRepository';

const board = boardRepository.getBoard();
function predict(board: BoardArr, turn: number) {
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
  for (let a = 0; a < 8; a++) {
    for (let b = 0; b < 8; b++) {
      let checked = false;
      if (board[a][b] === 1 || board[a][b] === 2) {
        //白か黒はスキップ
        //console.log(b, a, 'は白か黒');
        continue;
      }/*
      for (const t of direction) {
        if (
          //見た方向が→
          board[a + t[0]] === undefined || //枠外ならスキップ
          board[a + t[0]][b + t[1]] === undefined || //枠外ならスキップ
          board[a + t[0]][b + t[1]] === -1 || //不可マスならスキップ
          board[a + t[0]][b + t[1]] !== turn //自分の色ならスキップ
        ) {
          //console.log(b, a, t, '方向はスキップ');
          continue;
        } else if (board[a + t[0]][b + t[1]] === 0) {
          //おけるマスならスキップ

          continue;
        } else {
          //見た方向が自分の色じゃないなら
          for (let c = 2; c < 7; c++) {
            if (
              board[a + t[0] * c] === undefined || //枠外ならスキップ
              board[a + t[0] * c][b + t[1] * c] === undefined || //枠外ならスキップ
              board[a + t[0] * c][b + t[1] * c] === 0 || //おけるマスならスキップ
              board[a + t[0] * c][b + t[1] * c] === -1 //空白マスならスキップ
            ) {
              break;
            } else if (board[a + t[0] * c][b + t[1] * c] !== turn) {
              //console.log(b, a, 'は置けます');
              board[a][b] = 0;
              checked = true;
              break;
            }
          }
        }
      }

      if (checked === false) {
        //console.log(b, a, 'は置けません');
        board[a][b] = -1;
      }
    }
  }

}

export const predictedBoard = {
  predictBoard: (board: BoardArr, turn: number) => {
    predict(board, turn);
    return board;
  },
};
