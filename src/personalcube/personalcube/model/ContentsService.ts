
import CubeType from './CubeType';
import ContentsServiceType from './ContentsServiceType';


class ContentsService {
  //
  type: ContentsServiceType = ContentsServiceType.None;

  constructor(cubeType?: CubeType) {
    if (cubeType) {
      this.type = ContentsService.getType(cubeType);
    }
  }

  static getType(cubeType: CubeType) {
    //
    if (cubeType === CubeType.ClassRoomLecture || cubeType === CubeType.ELearning) {
      return ContentsServiceType.Classroom;
    }
    else if (cubeType === CubeType.Video || cubeType === CubeType.Audio) {
      return ContentsServiceType.Media;
    }
    else if (cubeType === CubeType.WebPage || cubeType === CubeType.Documents || cubeType === CubeType.Experiential) {
      return ContentsServiceType.OfficeWeb;
    }
    else if (cubeType === CubeType.Community) {
      return ContentsServiceType.Community;
    }
    return ContentsServiceType.None;
  }
}


export default ContentsService;
