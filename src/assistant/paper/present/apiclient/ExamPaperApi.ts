import { axiosApi as axios } from '@nara.platform/accent';
import { ExamPaperResultModel } from '../../model/ExamPaperResultModel';
import { ExamPaperModel } from '../../model/ExamPaperModel';

export default class ExamPaperApi {

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_EXAM_PAPER_API === undefined || process.env.REACT_APP_EXAM_PAPER_API === '' ?
    '/lp/adm/exam/exampaper' : process.env.REACT_APP_EXAM_PAPER_API;

  static instance: ExamPaperApi;

  findExamPaper(paperId : string) {
    return axios.get<ExamPaperResultModel>(this.baseUrl + `/${paperId}/findExamPaperForm`, { noAuth: true })
      .then((response: any) => response && response.data && response.data.result && new ExamPaperModel(response.data.result) || null);
  }
}

Object.defineProperty(ExamPaperApi, 'instance', {
  value: new ExamPaperApi(),
  writable: false,
  configurable: false,
});
