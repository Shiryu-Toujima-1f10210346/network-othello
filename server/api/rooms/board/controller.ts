import { boardUsecase } from '$/usecase/boardUsecase';
import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';
export default defineController(() => ({
  post: async ({ body, user }) => ({
    status: 201,
    body: await roomUsecase.clickBoard(body.y, body.x, user.id),
  }),
  get: async () => ({
    status: 200,

    body: await boardUsecase.getTurn(),
  }),
}));
