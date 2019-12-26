import { decorate, observable } from 'mobx';
import { IdName } from 'shared-model';
import { OperatorModel } from './OperatorModel';

export class OperationModel {
  //
  operator: OperatorModel = new OperatorModel();                  // 운영담당자
  location: string = '';                                          // 교육장소
  phoneNumber: string = '';                                       // 전화번호
  organizer: IdName = new IdName();                               // 교육기관(출처)
  etcCp: string = '';
  siteUrl: string = '';                                           // url(classroom: 외부과정 url, e-learning: 교육과정)

  constructor(operation?: OperationModel) {
    if (operation) {
      const operator = operation.operator && new OperatorModel(operation.operator) || this.operator;
      const organizer = operation.organizer && new IdName(operation.organizer) || this.organizer;

      Object.assign(this, { ...operation, operator, organizer });
    }
  }
}

decorate(OperationModel, {
  operator: observable,
  location: observable,
  phoneNumber: observable,
  organizer: observable,
  etcCp: observable,
  siteUrl: observable,
});

