import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Room } from '@prisma/client';
import { z } from 'zod';
const toRoomModel = (prismaRoom: Room): RoomModel => ({
  id: roomIdParser.parse(prismaRoom.roomId),
  board: z.array(z.array(z.number())).parse(prismaRoom.board),
  status: z.enum(['waiting', 'playing', 'ended']).parse(prismaRoom.status),
  created: prismaRoom.createdAt.getTime(),
  turn: prismaRoom.turn,
});
export const roomsRepository = {
  save: async (room: RoomModel) => {
    await prismaClient.room.upsert({
      where: { roomId: room.id },
      update: { status: room.status, board: room.board, turn: room.turn },
      create: {
        roomId: room.id,
        board: room.board,
        status: room.status,
        createdAt: new Date(room.created),
        turn: room.turn,
      },
    });
  },
  findLatest: async (): Promise<RoomModel | null> => {
    const room = await prismaClient.room.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return room && toRoomModel(room);
  },
  findRoom: async (roomId: string): Promise<RoomModel | null> => {
    //roomIdが一致するroomを取得
    const room = await prismaClient.room.findFirst({
      where: { roomId: roomIdParser.parse(roomId) },
    });
    return room && toRoomModel(room);
  },
  findAll: async (): Promise<RoomModel[]> => {
    const rooms = await prismaClient.room.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rooms.map(toRoomModel);
  },
};
