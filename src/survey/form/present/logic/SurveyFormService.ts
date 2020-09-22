import autobind from 'autobind-decorator';
import { action, observable, runInAction } from 'mobx';
import SurveyFormApi from '../apiclient/SurveyFormApi';
import { SurveyFormModel } from '../../model/SurveyFormModel';

@autobind
export default class SurveyFormService {
  //
  static instance: SurveyFormService;

  surveyFormApi: SurveyFormApi;

  @observable
  surveyForm: SurveyFormModel = new SurveyFormModel();

  constructor(surveyFormApi: SurveyFormApi) {
    //
    this.surveyFormApi = surveyFormApi;
  }

  @action
  async findSurveyForm(surveyFormId: string) {
    //
    const surveyForm = await this.surveyFormApi.findSurvey(surveyFormId);
    return runInAction(() => this.surveyForm = new SurveyFormModel(surveyForm));
  }

  @action
  setSurveyForm(surveyForm: SurveyFormModel) {
    return runInAction(() => this.surveyForm = new SurveyFormModel(surveyForm));
  }

  @action
  clear() {
    //
    this.surveyForm = new SurveyFormModel();
  }

}


Object.defineProperty(SurveyFormService, 'instance', {
  value: new SurveyFormService(SurveyFormApi.instance),
  writable: false,
  configurable: false,
});

