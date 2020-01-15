import { computed, decorate, observable } from 'mobx';
import { LangStrings, DramaEntityObservableModel } from 'shared';
import moment from 'moment';
import { FormDesignerModel } from './FormDesignerModel';
import { DesignState } from './DesignState';
import { QuestionPathModel } from './QuestionPathModel';
import { CriterionModel } from './CriterionModel';
import { QuestionGroupModel } from './QuestionGroupModel';
import { QuestionModel } from './QuestionModel';
import { SuggestionModel } from './SuggestionModel';

export class SurveyFormModel extends DramaEntityObservableModel {
  //
  titles: LangStrings = new LangStrings();
  managementNumber: string = '';
  formDesigner: FormDesignerModel = new FormDesignerModel();
  description: string = '';
  time: number = 0;
  designState: DesignState = DesignState.Confirmed;
  confirmTime: number = 0;
  supportedLanguages: string[] = [];
  questionPath: QuestionPathModel = new QuestionPathModel();
  criterionList: CriterionModel[] = [];
  questionGroups: QuestionGroupModel[] = [];
  questions: QuestionModel[] = [];
  suggestions: SuggestionModel[] = [];

  constructor(surveyForm?: SurveyFormModel) {
    //
    super();
    if (surveyForm) {
      const titles = surveyForm.titles && new LangStrings(surveyForm.titles) || this.titles;
      const formDesigner = surveyForm.formDesigner && new FormDesignerModel(surveyForm.formDesigner) || this.formDesigner;
      const questionPath = surveyForm.questionPath && new QuestionPathModel(surveyForm.questionPath) || this.questionPath;
      Object.assign(this, { ...surveyForm, titles, formDesigner, questionPath });
      this.questions = surveyForm.questions && surveyForm.questions.length
        && surveyForm.questions.map(question => new QuestionModel(question)) || this.questions;
      this.criterionList = surveyForm.criterionList && surveyForm.criterionList.length
        && surveyForm.criterionList.map(criterion => new CriterionModel(criterion)) || this.criterionList;
      this.questionGroups = surveyForm.questionGroups && surveyForm.questionGroups.length
        && surveyForm.questionGroups.map(questionGroup => new QuestionGroupModel(questionGroup)) || this.questionGroups;
      this.suggestions = surveyForm.suggestions && surveyForm.suggestions.length
        && surveyForm.suggestions.map(suggestion => new SuggestionModel(suggestion)) || this.suggestions;
    }
  }

  @computed
  get title(): string {
    return this.titles && this.titles.langStringMap && this.titles.langStringMap.get(this.titles.defaultLanguage) || '';
  }

  @computed
  get formDesignerName(): string {
    return this.formDesigner && this.formDesigner.names && this.formDesigner.names.langStringMap.get(this.formDesigner.names.defaultLanguage) || '';
  }

  @computed
  get timeStr() : string {
    return this.time && moment(this.time).format('YYYY.MM.DD') || '';
  }
}

decorate(SurveyFormModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  titles: observable,
  managementNumber: observable,
  formDesigner: observable,
  description: observable,
  time: observable,
  designState: observable,
  confirmTime: observable,
  supportedLanguages: observable,
  questionPath: observable,
  criterionList: observable,
  questionGroups: observable,
  questions: observable,
  suggestions: observable,
});
