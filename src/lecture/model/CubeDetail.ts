import { Cube } from './Cube';
import { CubeContents } from './CubeContents';
import { CubeMaterial } from './CubeMaterial';
import { CubeReactiveModel } from './CubeReactiveModel';
import { UserIdentity } from './UserIdentity';

export interface CubeDetail {
  cube: Cube;
  cubeContents: CubeContents;
  cubeMaterial: CubeMaterial;
  cubeReactiveModel: CubeReactiveModel;
  operators: UserIdentity[];
}
