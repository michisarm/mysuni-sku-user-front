import { CubeIntroModel } from '../../cubeintro';
import { NameValueList } from '../../../shared/model/NameValueList';
import { OfficeWebModel } from './OfficeWebModel';

export class OfficeWebFlowUserUdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeIntroNameValueList: NameValueList = new NameValueList();
  officeWebNameValueList: NameValueList = new NameValueList();

  constructor(cubeIntro: CubeIntroModel, officeWeb: OfficeWebModel) {
    if (cubeIntro && officeWeb) {
      this.cubeIntroNameValueList = CubeIntroModel.asNameValues(cubeIntro);
      this.officeWebNameValueList = OfficeWebModel.asNameValues(officeWeb);
    }
  }
}
