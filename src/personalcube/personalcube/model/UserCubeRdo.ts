import { CubeState } from "../../../shared/model";

export interface UserCubeRdo {
  offset: number;
  limit: number;
  state: CubeState;
}