import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorUsecase } from './userColorUsecase';
import { turnOverStonesUsecase } from './turnOverStonesUsecase';
import { predictedBoard } from './predictBoardUsecase';
export type BoardArr = number[][];

export type Pos = { x: number; y: number };
/*
const board: BoardArr = [
  
  ...Array.from({ length: 2 }, () => Array(8).fill(0)),
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  ...Array.from({ length: 3 }, () => Array(8).fill(0)),
  
];*/ //1:黒,2:白,-1:不可,0:空白
const turnAPI = 1;

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
]; //1:黒,2:白,-1:不可,0:空白
//turn: 1:黒,2:白
let turn = 1;
export const boardUsecase = {
  getBoard: () => board,
  getTurn: () => turn,
  clickBoard: (y:number,x:number, userId: UserId) => {
    if (userColorUsecase.getUserColor(userId) === turn && board[y][x] === 0) {
      let newBoard = board;
      //クリックした場所が盤面内かつ空白の場合
      board[y][x] = userColorUsecase.getUserColor(userId);
      //ここにひっくり返す処理を書く
      newBoard = turnOverStonesUsecase.turnOverStones(y,x, turn);
      turn = 3 - turn; //1と2を入れ替える
      
      //ここに推測盤面を作る処理を書く
      newBoard = predictedBoard.predictBoard(newBoard, turn);
      console.log("predicted");
      return newBoard;
    }
    return board;
  },
};