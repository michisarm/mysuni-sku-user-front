
import { AplCdoModel } from './AplCdoModel';

export class AplFlowCdoModel {
  // menuMainId: string = '';
  aplCdoModel: AplCdoModel = new AplCdoModel();
  mode?: string= '';

  constructor(aplCdoModel: AplCdoModel, mode?: string) {
    if (aplCdoModel) {
      // this.menuMainId = menuMainId;
      this.aplCdoModel = aplCdoModel;
      this.mode = mode;
    }
  }
}
