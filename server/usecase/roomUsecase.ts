import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomsRepository';
import { UserIdParser, roomIdParser } from '$/service/idParsers';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { boardUsecase } from './boardUsecase';

const initBoard = () => [
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, 0, -1, -1, -1],
  [-1, -1, -1, 1, 2, 0, -1, -1],
  [-1, -1, 0, 2, 1, -1, -1, -1],
  [-1, -1, -1, 0, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
];

export const roomUsecase = {
  create: async (): Promise<RoomModel> => {
    const newRoom: RoomModel = {
      id: roomIdParser.parse(randomUUID()),
      board: initBoard(),
      status: 'waiting',
      created: Date.now(),
      turn: 1,
      blackUserId: UserIdParser.parse('0'),
      whiteUserId: UserIdParser.parse('0'),
    };
    await roomsRepository.save(newRoom);
    return newRoom;
  },
  clickBoard: async (x: number, y: number, roomId: string, userId: UserId): Promise<RoomModel> => {
    const room = await roomsRepository.findRoom(roomId, userId);
    assert(room, 'curl叩くな！');
    const newBoard = await boardUsecase.clickBoard(x, y, room, userId);
    const newRoom: RoomModel = { ...room, board: newBoard, status: 'playing' };
    await roomsRepository.save(newRoom);
    return newRoom;
  },
};
