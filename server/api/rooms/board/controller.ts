import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';
export default defineController(() => ({
  post: async ({ body, user }) => ({
    status: 201,
    body: await roomUsecase.clickBoard(body.y, body.x, body.roomId, user.id),
  }),
}));
