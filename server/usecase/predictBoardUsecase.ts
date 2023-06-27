/* eslint-disable max-depth */

import type { BoardArr } from './boardUsecase';

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
let pass = true;
function predict(turn: number, newBoard: BoardArr) {
  pass = true;

  for (let a = 0; a < 8; a++) {
    for (let b = 0; b < 8; b++) {
      let checked = false;
      if (newBoard[a][b] === 1 || newBoard[a][b] === 2) {
        //白か黒はスキップ
        //console.log(b, a, 'は白か黒');
        continue;
      }
      for (const t of direction) {
        if (
          //見た方向が→
          newBoard[a + t[0]] === undefined || //枠外ならスキップ
          newBoard[a + t[0]][b + t[1]] === undefined || //枠外ならスキップ
          newBoard[a + t[0]][b + t[1]] === -1 || //不可マスならスキップ
          newBoard[a + t[0]][b + t[1]] !== turn || //自分の色ならスキップ
          newBoard[a + t[0]][b + t[1]] === 0 ///おけるマスならスキップ
        ) {
          //console.log(b, a, t, '方向はスキップ');

          continue;
        } else {
          //見た方向が自分の色じゃないなら
          for (let c = 2; c < 7; c++) {
            if (
              newBoard[a + t[0] * c] === undefined || //枠外ならスキップ
              newBoard[a + t[0] * c][b + t[1] * c] === undefined || //枠外ならスキップ
              newBoard[a + t[0] * c][b + t[1] * c] === 0 || //おけるマスならスキップ
              newBoard[a + t[0] * c][b + t[1] * c] === -1 //空白マスならスキップ
            ) {
              break;
            } else if (newBoard[a + t[0] * c][b + t[1] * c] !== turn) {
              //console.log(b, a, 'は置けます');
              newBoard[a][b] = 0;
              pass = false;
              checked = true;
              break;
            }
          }
        }
      }

      if (checked === false) {
        //console.log(b, a, 'は置けません');
        newBoard[a][b] = -1;
      }
    }
  }
}

export const predictedBoard = {
  predictBoard: (board: BoardArr, turn: number) => {
    predict(3 - turn, board);
    return board;
  },
};
