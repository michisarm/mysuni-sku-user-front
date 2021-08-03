import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import CubeState from '../../../lecture/detail/model/CubeState';
import CubeType from '../../../lecture/detail/model/CubeType';

export interface CreateCube {
  cubeId: string;
  name: PolyglotString | null;
  // name: PolyglotString | null;
  state: CubeState;
  type: CubeType;
  time: number;
}
