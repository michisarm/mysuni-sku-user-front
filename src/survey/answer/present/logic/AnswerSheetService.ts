import autobind from 'autobind-decorator';
import { action, computed, observable, runInAction } from 'mobx';
import _ from 'lodash';
import AnswerSheetApi from '../apiclient/AnswerSheetApi';
import ResponseApi from '../apiclient/ResponseApi';
import AnswerSheetModel from '../../model/AnswerSheetModel';
import AnswerModel from '../../model/AnswerModel';
import EvaluationSheetModel from '../../model/EvaluationSheetModel';
import { QuestionModel } from '../../../form/model/QuestionModel';
import { QuestionItemType } from '../../../form/model/QuestionItemType';
import { AnswerItemModel } from '../../model/AnswerItemModel';

@autobind
export default class AnswerSheetService {
  //
  static instance: AnswerSheetService;

  responseApi: ResponseApi;

  answerSheetApi: AnswerSheetApi;

  @observable
  answerSheet: AnswerSheetModel = new AnswerSheetModel();

  @observable
  evaluationSheet: EvaluationSheetModel = new EvaluationSheetModel();

  constructor(responseApi: ResponseApi, answerSheetApi: AnswerSheetApi) {
    //
    this.responseApi = responseApi;
    this.answerSheetApi = answerSheetApi;
  }

  @computed
  get answerMap() {
    const map = new Map<string, AnswerItemModel>();
    if (this.evaluationSheet && this.evaluationSheet.answers && this.evaluationSheet.answers.length) {
      this.evaluationSheet.answers.map(answer => {
        map.set(answer.questionNumber, answer.answerItem);
      });
    }
    return map;
  }


  @action
  openAnswerSheet(surveyCaseId: string, round: number, serviceId: string, serviceType: string) {
    this.answerSheet.serviceId = serviceId;
    this.answerSheet.serviceType = serviceType;
    return this.responseApi.openAnswerSheet(surveyCaseId, round, this.answerSheet);
  }

  @action
  async submitAnswerSheet(answerSheetId: string) {
    if (answerSheetId || answerSheetId.length) {
      await this.responseApi.submitAnswerSheet(answerSheetId, this.answerSheet.round, this.answerSheet);
    }
  }

  @action
  clearAnswerSheet() {
    this.answerSheet = new AnswerSheetModel();
  }

  @action
  async findAnswerSheet(surveyCaseId: string) {
    const answerSheet = await this.answerSheetApi.findAnswerSheet(surveyCaseId);
    runInAction(() => {
      this.answerSheet = answerSheet;
      if (answerSheet && answerSheet.evaluationSheet) {
        this.evaluationSheet = answerSheet.evaluationSheet;
      }
    });
  }

  @action
  async saveAnswerSheet() {
    await this.answerSheetApi.modifyAnswerSheet(this.answerSheet);
    await this.answerSheetApi.modifyEvaluationSheet(this.answerSheet.id, this.evaluationSheet);
  }

  @action
  changeAnswerSheetProp(prop: string, value: any) {
    this.answerSheet = _.set(this.answerSheet, prop, value);
  }

  @action
  initializeEvaluationSheet(questions: QuestionModel[]) {
    //
    this.evaluationSheet.answers = questions.map(question => {
      const answer = new AnswerModel();
      answer.questionNumber = question.sequence.toSequenceString();
      return answer;
    });
  }

  @action
  findAnswer(questionNumber: string) {
    const answers = this.evaluationSheet.answers;
    let answer = answers.find((answer) => answer.questionNumber === questionNumber);
    if (!answer) {
      answer = new AnswerModel();
      answer.questionNumber = questionNumber;
      answers.push(answer);
    }

    return answer;
  }

  @action
  changeEvaluationSheetProp(question: QuestionModel, answerValue: any) {
    const answer = this.findAnswer(question.sequence.toSequenceString());
    if (!answer) return;

    switch (question.questionItemType) {
      case QuestionItemType.Choice:
        answer.answerItem.itemNumbers = answerValue;
        break;
      case QuestionItemType.Criterion:
        answer.answerItem.criteriaItem = answerValue;
        break;
      case QuestionItemType.Essay:
        answer.answerItem.sentence = answerValue;
        break;
    }

    this.evaluationSheet.answers = [...this.evaluationSheet.answers];
  }

  @action
  clear() {
    this.answerSheet = new AnswerSheetModel();
    this.evaluationSheet = new EvaluationSheetModel();
  }
}

Object.defineProperty(AnswerSheetService, 'instance', {
  value: new AnswerSheetService(ResponseApi.instance, AnswerSheetApi.instance),
  writable: false,
  configurable: false,
});
