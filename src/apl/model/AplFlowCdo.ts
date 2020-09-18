
import { AplCdoModel } from './AplCdoModel';

export class AplFlowCdo {
  // menuMainId: string = '';
  menuMainCdo: AplCdoModel = new AplCdoModel();
  mode?: string= '';

  constructor(menuMainCdo: AplCdoModel, mode?: string) {
    if (menuMainCdo) {
      // this.menuMainId = menuMainId;
      this.menuMainCdo = menuMainCdo;
      this.mode = mode;
    }
  }
}
