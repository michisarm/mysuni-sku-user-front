
import { PersonalCubeService } from './personalcube';
import { CubeIntroService } from './cubeintro';
import { ClassroomService } from './classroom';
import { MediaService } from './media';
import { OfficeWebService } from './officeweb';


export const personalCubeStores = {
  personalCubeService: PersonalCubeService.instance,
  cubeIntroService: CubeIntroService.instance,
  classroomService: ClassroomService.instance,
  mediaService: MediaService.instance,
  officeWebService: OfficeWebService.instance,
};

export {
  PersonalCubeService,
  CubeIntroService,
  ClassroomService,
  MediaService,
  OfficeWebService,
};
