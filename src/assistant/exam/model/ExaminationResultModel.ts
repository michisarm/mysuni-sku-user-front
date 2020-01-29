import { decorate, observable } from 'mobx';
import { ExaminationModel } from './ExaminationModel';

export class ExaminationResultModel {
  //
  result: ExaminationModel = new ExaminationModel();

  constructor(result?: ExaminationResultModel) {
    if (result) {
      Object.assign(this, { ...result });
    }
  }

}

decorate(ExaminationResultModel, {
  result: observable,
});
