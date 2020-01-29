import { decorate, observable } from 'mobx';
import { ExamPaperModel } from './ExamPaperModel';

export class ExamPaperResultModel {
  //
  result: ExamPaperModel = new ExamPaperModel();

  constructor(result?: ExamPaperResultModel) {
    if (result) {
      Object.assign(this, { ...result });
    }
  }

}

decorate(ExamPaperResultModel, {
  result: observable,
});
