
//import { BoardService } from '@sku/personalcube';
import { PersonalCubeService } from './personalcube/stores';
import { CubeIntroService } from './cubeintro/stores';
import { ClassroomService } from './classroom/stores';
import { MediaService } from './media/stores';
import { OfficeWebService } from './officeweb/stores';
import { BoardService } from './community/stores';
import CreateCubeService from './personalcube/present/logic/CreateCubeService';


export default {
  personalCube: {
    personalCubeService: PersonalCubeService.instance,
    createCubeService: CreateCubeService.instance,
    cubeIntroService: CubeIntroService.instance,
    classroomService: ClassroomService.instance,
    mediaService: MediaService.instance,
    officeWebService: OfficeWebService.instance,
    boardService: BoardService.instance,
  },
};
