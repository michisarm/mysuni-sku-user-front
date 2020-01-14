import autobind from 'autobind-decorator';
import { action, observable, runInAction } from 'mobx';
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

  @observable
  roundPart: RoundPartModel = new RoundPartModel();


  constructor(surveyCaseApi: SurveyCaseApi) {
    this.surveyCaseApi = surveyCaseApi;
  }

  @action
  async findSurveyCase(surveyCaseId: string) {
    const surveyCase = await this.surveyCaseApi.findSurveyCase(surveyCaseId);
    runInAction(() => {
      this.surveyCase = surveyCase;
      this.roundPart = surveyCase.roundPart;
    });
  }
}

Object.defineProperty(SurveyCaseService, 'instance', {
  value: new SurveyCaseService(SurveyCaseApi.instance),
  writable: false,
  configurable: false,
});
