import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomsRepository';
export const userColorUsecase = {
  getUserColor: async (userId: UserId, room: RoomModel) => {
    userColorUsecase.setUserColor(userId, room);
    if (room?.blackUserId === userId) {
      return 1;
    } else if (room?.whiteUserId === userId) {
      return 2;
    } else {
      return 0;
    }
  },
  setUserColor: async (userId: UserId, room: RoomModel) => {
    if (room?.blackUserId === '0') {
      room.blackUserId = userId;
    } else if (room?.blackUserId !== userId && room?.whiteUserId === '0') {
      room.whiteUserId = userId;
    }
    await roomsRepository.save(room);
  },
};
