import { decorate, observable } from 'mobx';

export class ReportFileBoxModel {
  //
  isReport: boolean = false;
  fileBoxId: string = '';

  constructor(reportFileBox?: ReportFileBoxModel) {
    if (reportFileBox) {
      Object.assign(this, reportFileBox);
    }
  }
}

decorate(ReportFileBoxModel, {
  isReport: observable,
  fileBoxId: observable,
});

