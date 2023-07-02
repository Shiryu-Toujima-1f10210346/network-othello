import { roomsRepository } from '$/repository/roomsRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ params }) => ({
    status: 200,
    body: await roomsRepository.findRoom(params.roomId),
  }),

  post: async ({ body }) => ({ status: 201, body: await roomsRepository.findRoom(body.label) }),
}));
