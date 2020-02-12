
import { NameValueList } from 'shared/model';
import { PersonalCubeModel } from '../../personalcube/model';
import { CubeIntroModel } from '../../cubeintro/model';
import { OfficeWebModel } from './OfficeWebModel';


export class OfficeWebFlowUdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  cubeNameValueList: NameValueList = new NameValueList();
  cubeIntroNameValueList: NameValueList = new NameValueList();
  officeWebNameValueList: NameValueList = new NameValueList();

  constructor(cube: PersonalCubeModel, cubeIntro: CubeIntroModel, officeWeb: OfficeWebModel) {
    if (cube && cubeIntro && officeWeb) {
      this.cubeNameValueList = PersonalCubeModel.asNameValues(cube);
      this.cubeIntroNameValueList = CubeIntroModel.asNameValues(cubeIntro);
      this.officeWebNameValueList = OfficeWebModel.asNameValues(officeWeb);
    }
  }
}
