import { defineController } from './$relay'
import { boardUsecase } from '$/usecase/boardUsecase'
import { roomUsecase } from '$/usecase/roomUsecase'
export default defineController(() => ({
  post : async ({ body, user }) => ({
    status : 201,
    body : await roomUsecase.clickBoard(body.y, body.x, user.id),
  }),
}))
