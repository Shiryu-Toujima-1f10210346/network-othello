import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomsRepository';
import { predictedBoard } from './predictBoardUsecase';
import { turnOverStonesUsecase } from './turnOverStonesUsecase';
import { userColorUsecase } from './userColorUsecase';
export type BoardArr = number[][];

export type Pos = { x: number; y: number };

export const boardUsecase = {
  getBoard: (room: RoomModel) => room.board,
  getTurn: (room: RoomModel) => room.turn,
  clickBoard: async (y: number, x: number, room: RoomModel, userId: UserId) => {
    if (userColorUsecase.getUserColor(userId) === room.turn && room.board[y][x] === 0) {
      //roomのboardを更新する
      let newBoard = boardUsecase.getBoard(room);
      //クリックした場所が盤面内かつ空白の場合
      newBoard[y][x] = userColorUsecase.getUserColor(userId);
      //ここにひっくり返す処理を書く
      newBoard = turnOverStonesUsecase.turnOverStones(y, x, room.turn, newBoard);
      room.turn = 3 - room.turn; //1と2を入れ替える
      const newRoom: RoomModel = { ...room, turn: room.turn };
      await roomsRepository.save(newRoom);
      //ここに推測盤面を作る処理を書く
      newBoard = predictedBoard.predictBoard(newBoard, room.turn);
      return newBoard;
    }
    return room.board;
  },
};
