import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import ExaminationApi from '../apiclient/ExaminationApi';
import { ExaminationModel } from '../../model/ExaminationModel';


@autobind
export default class ExaminationService {
  //
  static instance: ExaminationService;

  examinationApi: ExaminationApi;

  @observable
  examination: ExaminationModel = new ExaminationModel();

  constructor(examinationApi: ExaminationApi) {
    this.examinationApi = examinationApi;
  }

  @action
  async findExamination(examId: string) {
    const examination = await this.examinationApi.findExamination(examId);
    return runInAction(() => {
      this.examination = examination;
      return examination;
    });
  }

  @action
  clear() {
    //
    this.examination = new ExaminationModel();
  }
}

Object.defineProperty(ExaminationService, 'instance', {
  value: new ExaminationService(ExaminationApi.instance),
  writable: false,
  configurable: false,
});
