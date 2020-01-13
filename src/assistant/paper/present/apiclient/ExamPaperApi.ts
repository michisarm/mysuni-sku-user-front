import { axiosApi as axios } from '@nara.platform/accent';
import { ExamPaperResultModel } from '../../model/ExamPaperResultModel';
import { ExamPaperModel } from '../../model/ExamPaperModel';

export default class ExamPaperApi {

  URL = '/lp/adm/exam/exampapers';

  static instance: ExamPaperApi;

  findExamPaper(paperId : string) {
    return axios.get<ExamPaperResultModel>(this.URL + `/${paperId}`, { noAuth: true })
      .then((response: any) => response && response.data && response.data.result && new ExamPaperModel(response.data.result) || null);
  }
}

Object.defineProperty(ExamPaperApi, 'instance', {
  value: new ExamPaperApi(),
  writable: false,
  configurable: false,
});
