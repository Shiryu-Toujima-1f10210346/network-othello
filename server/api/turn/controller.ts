import { boardUsecase } from '$/usecase/boardUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: { turn: boardUsecase.getTurn() } }),
  post: ({ body }) => ({ status: 200, body: { turn: body.turn } }),
}));
