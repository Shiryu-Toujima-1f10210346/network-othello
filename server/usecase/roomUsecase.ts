import type { RoomModel } from "$/commonTypesWithClient/models";
import {roomsRepository} from "$/repository/roomsRepository";
import {roomIdParser} from "$/service/idParsers";
import {randomUUID} from "crypto";
import { userColorUsecase } from "./userColorUsecase";
import type { UserId } from "$/commonTypesWithClient/branded";
import assert from "assert";
import { boardUsecase } from "./boardUsecase";

const initBoard = ()=>[
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, 0, -1, -1, -1],
  [-1, -1, -1, 1, 2, 0, -1, -1],
  [-1, -1, 0, 2, 1, -1, -1, -1],
  [-1, -1, -1, 0, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1],
]

export const roomUsecase = {
  create: async () :Promise<RoomModel> => {
    const newRoom: RoomModel = {
      id : roomIdParser.parse(randomUUID()),
      board: initBoard(),
      status: "waiting",
      created: Date.now(),
    };
    await roomsRepository.save(newRoom);

    return newRoom;
  },
  clickBoard: async (x : number, y : number, userId:UserId) : Promise<RoomModel> => {

    const latest = await roomsRepository.findLatest();
    assert(latest, "curl叩くな！");
    const newBoard = boardUsecase.clickBoard(x, y, userId);
    const newRoom: RoomModel = { ...latest, board: newBoard };
    await roomsRepository.save(newRoom);
    return newRoom;
  },

  };