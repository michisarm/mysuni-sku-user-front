import { NameValueList } from '../../../shared/model/NameValueList';
import { CubeIntroModel } from '../../cubeintro';
import { MediaModel } from './MediaModel';

export class MediaFlowUserUdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeIntroNameValueList: NameValueList = new NameValueList();
  mediaNameValueList: NameValueList = new NameValueList();

  constructor(cubeIntro: CubeIntroModel, media: MediaModel) {
    //
    this.cubeIntroNameValueList = CubeIntroModel.asNameValues(cubeIntro);
    this.mediaNameValueList = MediaModel.asNameValues(media);
  }
}
