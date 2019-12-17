
import { PersonalCubeService } from './personalcube';
import { CubeIntroService } from './cubeintro';
import { ClassroomService } from './classroom';


export const personalCubeStores = {
  personalCubeService: PersonalCubeService.instance,
  cubeIntroService: CubeIntroService.instance,
  classroomService: ClassroomService.instance,
};

export {
  PersonalCubeService,
  CubeIntroService,
  ClassroomService,
};
