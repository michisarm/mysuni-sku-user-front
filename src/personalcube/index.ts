//import { BoardService } from '@sku/personalcube';
import { PersonalCubeService } from './personalcube';
import { CubeIntroService } from './cubeintro';
import { ClassroomService } from './classroom';
import { MediaService } from './media';
import { OfficeWebService } from './officeweb';
import { BoardService } from './community';


export const personalCubeStores = {
  personalCube: {
    personalCubeService: PersonalCubeService.instance,
    cubeIntroService: CubeIntroService.instance,
    classroomService: ClassroomService.instance,
    mediaService: MediaService.instance,
    officeWebService: OfficeWebService.instance,
    boardService: BoardService.instance,
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

export { default as OverviewField } from './shared/OverviewField';
