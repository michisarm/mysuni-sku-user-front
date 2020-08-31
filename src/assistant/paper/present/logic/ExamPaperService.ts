import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import ExamPaperApi from '../apiclient/ExamPaperApi';
import { ExamPaperModel } from '../../model/ExamPaperModel';


@autobind
export default class ExamPaperService {
  //
  static instance: ExamPaperService;

  examPaperApi: ExamPaperApi;

  @observable
  examPaper: ExamPaperModel = new ExamPaperModel();

  constructor(examPaperApi: ExamPaperApi) {
    this.examPaperApi = examPaperApi;
  }

  @action
  async findExamPaper(paperId: string) {
    const examPaper = await this.examPaperApi.findExamPaper(paperId);
    return runInAction(() => {
      this.examPaper = examPaper;
      return examPaper;
    });
  }

  @action
  setExamPaper(examPaper: ExamPaperModel) {
    return runInAction(() => {
      this.examPaper = examPaper;
      return examPaper;
    });
  }

  @action
  clear() {
    //
    this.examPaper = new ExamPaperModel();
  }
}

Object.defineProperty(ExamPaperService, 'instance', {
  value: new ExamPaperService(ExamPaperApi.instance),
  writable: false,
  configurable: false,
});
