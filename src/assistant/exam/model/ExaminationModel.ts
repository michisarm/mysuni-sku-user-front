import { decorate, observable } from 'mobx';
import { EventSummaryModel } from './EventSummaryModel';

export class ExaminationModel {
  //
  id: string = '';
  title: string = '';
  eventSummary: EventSummaryModel = new EventSummaryModel();
  examinerId: string = '';
  examinerName: string = '';
  examineeCount: number = 0;
  absenteeCount: number = 0;
  average: number = 0;
  questionCount: number = 0;
  takenDate: Date = new Date();
  finalCopy: string = '';
  paperId: string = '';

  successPoint: number = 0;

  constructor(examination?: ExaminationModel) {
    if (examination) {
      Object.assign(this, { ...examination });
    }
  }
}

decorate(ExaminationModel, {
  id: observable,
  title: observable,
  eventSummary: observable,
  examinerId: observable,
  examinerName: observable,
  examineeCount: observable,
  absenteeCount: observable,
  average: observable,
  questionCount: observable,
  takenDate: observable,
  finalCopy: observable,
  paperId: observable,
  successPoint: observable,
});
