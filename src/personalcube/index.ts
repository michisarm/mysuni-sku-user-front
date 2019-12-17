
import { BoardService } from '@sku/personalcube';
import { PersonalCubeService } from './personalcube';
import { CubeIntroService } from './cubeintro';
import { ClassroomService } from './classroom';

export { MyPostListPage } from './community';

export const personalCubeStores = {
  personalCube: {
    personalCubeService: PersonalCubeService.instance,
    boardService: BoardService.instance,
  },
  personalCubeService: PersonalCubeService.instance,
  cubeIntroService: CubeIntroService.instance,
  classroomService: ClassroomService.instance,
};

export {
  PersonalCubeService,
  CubeIntroService,
  ClassroomService,
  BoardService,
};
