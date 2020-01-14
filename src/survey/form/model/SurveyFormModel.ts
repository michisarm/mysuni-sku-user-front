import { DramaEntity } from '@nara.platform/accent';
import { computed, decorate, observable } from 'mobx';
import { PatronKey, LangStrings } from 'shared';
import { FormDesignerModel } from './FormDesignerModel';
import { DesignState } from './DesignState';
import { QuestionPathModel } from './QuestionPathModel';
import { CriterionModel } from './CriterionModel';
import { QuestionGroupModel } from './QuestionGroupModel';
import { QuestionModel } from './QuestionModel';
import { SuggestionModel } from './SuggestionModel';

export class SurveyFormModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = new PatronKey();

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
    if (surveyForm) {
      const titles = surveyForm.titles && new LangStrings(surveyForm.titles) || this.titles;
      const formDesigner = surveyForm.formDesigner && new FormDesignerModel(surveyForm.formDesigner) || this.formDesigner;
      const questionPath = surveyForm.questionPath && new QuestionPathModel(surveyForm.questionPath) || this.questionPath;
      Object.assign(this, { ...surveyForm, titles, formDesigner, questionPath });
    }
  }

  @computed
  get getTitles(): string {
    return this.titles && this.titles.langStringMap && this.titles.langStringMap.get(this.titles.defaultLanguage) || '';
  }

  @computed
  get getFormDesignerName(): string {
    return this.formDesigner && this.formDesigner.names && this.formDesigner.names.langStringMap.get(this.formDesigner.names.defaultLanguage) || '';
  }

  @computed
  get getStringTime() : string {
    return this.time && new Date(this.time).toLocaleDateString() || '';
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
