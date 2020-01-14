import { observable, action, configure, runInAction, computed } from 'mobx';
import _ from 'lodash';
import { autobind } from '@nara.platform/accent';
import AnswerSheetApi from '../apiclient/AnswerSheetApi';
import { AnswerSheetModel } from '../../model/AnswerSheetModel';
import { ItemAnswerModel } from '../../model/ItemAnswerModel';

configure({
  enforceActions: 'observed',
});

@autobind
export default class AnswerSheetService {
  //
  static instance: AnswerSheetService;

  answerSheetApi: AnswerSheetApi;

  @observable
  answerSheet: AnswerSheetModel = new AnswerSheetModel();

  constructor(answerSheetApi: AnswerSheetApi) {
    this.answerSheetApi = answerSheetApi;
  }

  @computed
  get answerMap() {
    const map = new Map<string, string>();
    if (this.answerSheet && this.answerSheet.answers && this.answerSheet.answers.length) {
      this.answerSheet.answers.map(answer => {
        map.set(answer.questionNo, answer.answer);
      });
    }
    return map;
  }

  registerAnswerSheet(answerSheet: AnswerSheetModel) {
    return this.answerSheetApi.registerAnswerSheet(answerSheet);
  }

  modifyAnswerSheet(answerSheet: AnswerSheetModel) {
    return this.answerSheetApi.modifyAnswerSheet(answerSheet.id, answerSheet);
  }

  @action
  async findAnswerSheet(examId: string, examineeId: string) {
    const answerSheet = await this.answerSheetApi.findAnswerSheet(examId, examineeId);
    return runInAction(() => {
      this.answerSheet = answerSheet;
      return answerSheet;
    });
  }

  @action
  setAnswer(questionNo: string, answer: string, questionsNos: string[]) {
    console.log(';;');
    console.log(this.answerSheet);
    if (this.answerSheet && this.answerSheet.answers) {
      let answers = [ ...this.answerSheet.answers ];
      if (!answers.length) {
        answers = questionsNos.map((questionNo) => new ItemAnswerModel({ questionNo, answer: ''}));
      }
      console.log(answers);
      const index = answers.map(answer => answer.questionNo).findIndex(qno => qno === questionNo);
      if (index >= 0) {
        answers[index].answer = answer;
        console.log(answers);
        this.answerSheet = _.set(this.answerSheet, `answers`, answers);
      }
    }
  }

  @action
  setAnswerSheetProp(name: string, value: any) {
    this.answerSheet = _.set(this.answerSheet, name, value);
  }

  @action
  clear() {
    //
    this.answerSheet = new AnswerSheetModel();
  }
}

Object.defineProperty(AnswerSheetService, 'instance', {
  value: new AnswerSheetService(AnswerSheetApi.instance),
  writable: false,
  configurable: false,
});
