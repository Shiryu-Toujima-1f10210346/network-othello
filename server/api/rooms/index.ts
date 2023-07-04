import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    query: {
      roomId: string;
      UserId: UserId;
    };
    resBody: RoomModel | null;
  };
  post: {
    resBody: RoomModel;
  };
};
