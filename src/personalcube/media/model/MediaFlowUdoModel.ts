
import { NameValueList } from 'shared/model';
import { PersonalCubeModel } from '../../personalcube/model';
import { CubeIntroModel } from '../../cubeintro/model';
import { MediaModel } from './MediaModel';


export class MediaFlowUdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeNameValueList: NameValueList = new NameValueList();
  cubeIntroNameValueList: NameValueList = new NameValueList();
  mediaNameValueList: NameValueList = new NameValueList();

  constructor(cube: PersonalCubeModel, cubeIntro: CubeIntroModel, media: MediaModel) {
    //
    this.cubeNameValueList = PersonalCubeModel.asNameValues(cube);
    this.cubeIntroNameValueList = CubeIntroModel.asNameValues(cubeIntro);
    this.mediaNameValueList = MediaModel.asNameValues(media);
  }
}
