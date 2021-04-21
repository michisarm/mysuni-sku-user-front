import CubeState from "../../../lecture/detail/model/CubeState";
import CubeType from "../../../lecture/detail/model/CubeType";

export interface CreateCube {
  cubeId: string;
  name: string;
  state: CubeState;
  type: CubeType;
  time: number;
}