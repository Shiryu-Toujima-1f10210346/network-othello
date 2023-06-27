import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    query: {
      roomId: string;
    };
    resBody: RoomModel | null;
  };
  post: {
    resBody: RoomModel;
  };
};
