
import { BoardService } from '@sku/personalcube';
import { PersonalCubeService } from './personalcube';
import { CubeIntroService } from './cubeintro';
import { ClassroomService } from './classroom';
import { MediaService } from './media';
import { OfficeWebService } from './officeweb';

export { PostListPage, PostFormPage, PostDetailPage, MyPostListPage, ReplyFormPage, ReplyDetailPage } from './community';

export const personalCubeStores = {
  personalCube: {
    personalCubeService: PersonalCubeService.instance,
    cubeIntroService: CubeIntroService.instance,
    boardService: BoardService.instance,
    classroomService: ClassroomService.instance,
    mediaService: MediaService.instance,
    officeWebService: OfficeWebService.instance,
  },
};

export {
  PersonalCubeService,
  CubeIntroService,
  ClassroomService,
  MediaService,
  OfficeWebService,
  BoardService,
};
