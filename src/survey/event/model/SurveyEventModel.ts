import { LangStrings } from 'shared';

export default class SurveyEventModel {
  //
  targetId: string = '';
  targetNames: LangStrings = new LangStrings();
  categoryCode: string = '';

  constructor(surveyEvent?: any) {
    if (surveyEvent) {
      Object.assign(this, surveyEvent);
      this.targetNames = surveyEvent.targetNames && new LangStrings(surveyEvent.targetNames) || this.targetNames;
    }
  }
}
