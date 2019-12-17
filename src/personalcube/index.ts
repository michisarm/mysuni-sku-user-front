
import { BoardService } from '@sku/personalcube';
import { PersonalCubeService } from './personalcube';
import { CubeIntroService } from './cubeintro';
import { ClassroomService } from './classroom';

export { PostListPage, PostFormPage, PostDetailPage, MyPostListPage, ReplyFormPage, ReplyDetailPage } from './community';

export const personalCubeStores = {
  personalCube: {
    personalCubeService: PersonalCubeService.instance,
    cubeIntroService: CubeIntroService.instance,
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
