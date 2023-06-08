import { boardRepository } from '$/repository/boardRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: { turn: boardRepository.getTurn() } }),
  post: ({ body }) => ({ status: 200, body: { turn: body.turn } }),
}));
