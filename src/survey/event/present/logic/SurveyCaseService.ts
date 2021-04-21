import autobind from 'autobind-decorator';
import { action, computed, observable, runInAction } from 'mobx';
import SurveyCaseApi from '../apiclient/SurveyCaseApi';
import SurveyCaseModel from '../../model/SurveyCaseModel';
import RoundPartModel from '../../model/RoundPartModel';

@autobind
export default class SurveyCaseService {
  //
  static instance: SurveyCaseService;

  surveyCaseApi: SurveyCaseApi;

  @observable
  surveyCase: SurveyCaseModel = new SurveyCaseModel();

  @action
  setSurveyCase(surveyCase: SurveyCaseModel) {
    this.surveyCase = new SurveyCaseModel(surveyCase);
  }

  @computed
  get getSurveyCase() {
    return this.surveyCase;
  }

  @observable
  roundPart: RoundPartModel = new RoundPartModel();

  constructor(surveyCaseApi: SurveyCaseApi) {
    this.surveyCaseApi = surveyCaseApi;
  }

  @action
  async findSurveyCaseFeedBack(surveyCaseId: string) {
    const surveyCase = await this.surveyCaseApi.findSurveyCaseByFeed(
      surveyCaseId
    );
    //return surveyCase.commentFeedbackId;
    //return surveyCase.surveyFormId;
    return runInAction(() => {
      this.surveyCase = surveyCase;
      return surveyCase;
    });
  }

  @action
  async findSurveyCase(surveyCaseId: string) {
    const surveyCase = await this.surveyCaseApi.findSurveyCase(surveyCaseId);
    return runInAction(() => {
      this.surveyCase = surveyCase;
      this.roundPart = surveyCase.roundPart;
      return surveyCase;
    });
  }

  @action
  clear() {
    this.surveyCase = new SurveyCaseModel();
    this.roundPart = new RoundPartModel();
  }
}

Object.defineProperty(SurveyCaseService, 'instance', {
  value: new SurveyCaseService(SurveyCaseApi.instance),
  writable: false,
  configurable: false,
});
