import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorReoisitory';
import { turnOverStonesRepository } from './turnOverStonesRepository';
export type BoardArr = number[][];

export type Pos = { x: number; y: number };

const board: BoardArr = [
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
]; //1:黒,2:白,-1:不可,0:空白
const turnAPI = 1;
/*
const board: BoardArr = [
  //デバッグ用
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, 0, -1, -1, -1],
  [-1, -1, -1, 1, 2, 0, -1, -1],
  [-1, -1, 0, 2, 1, -1, -1, -1],
  [-1, -1, -1, 0, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
]; */ //1:黒,2:白,-1:不可,0:空白
//turn: 1:黒,2:白
let turn = 1;
export const boardRepository = {
  getBoard: () => board,
  getTurn: () => turn,
  clickBoard: (params: Pos, userId: UserId) => {
    if (userColorRepository.getUserColor(userId) === turn && board[params.y][params.x] === 0) {
      let newBoard = board;
      //クリックした場所が盤面内かつ空白の場合
      board[params.y][params.x] = userColorRepository.getUserColor(userId);
      //ここにひっくり返す処理を書く
      newBoard = turnOverStonesRepository.turnOverStones(params.y, params.x, turn);
      turn = 3 - turn; //1と2を入れ替える
      return newBoard;
      //ここに推測盤面を作る処理を書く
    }
    return board;
  },
};