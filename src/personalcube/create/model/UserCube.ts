import CubeState from "../../../lecture/detail/model/CubeState";
import { OpenRequest } from "./OpenRequest";

export interface UserCube {
  state: CubeState;
  openRequests: OpenRequest[];
  creator: {
    keyString: string;
  };
  openedTime: number;
}

