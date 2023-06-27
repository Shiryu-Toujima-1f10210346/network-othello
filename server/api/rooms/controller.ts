import { roomsRepository } from '$/repository/roomsRepository';
import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query: { roomId } }) => ({
    status: 200,
    body: await roomsRepository.findRoom(roomId),
  }),

  post: async () => ({
    status: 201,
    body: await roomUsecase.create(),
  }),
}));
