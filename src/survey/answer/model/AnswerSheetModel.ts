import { decorate, observable } from 'mobx';
import { NameValueList } from '@nara.platform/accent';

import { DramaEntityObservableModel } from 'shared';
import SuggestionSheetModel from './SuggestionSheetModel';
import RespondentModel from './RespondentModel';
import { AnswerProgress } from './AnswerProgress';

export default class AnswerSheetModel extends DramaEntityObservableModel {
  //
  surveyCaseId: string = '';
  round: number = 1;
  managementNumber: string = '';
  progress: AnswerProgress = AnswerProgress.Open;
  respondent: RespondentModel = new RespondentModel();
  suggestionSheet: SuggestionSheetModel = new SuggestionSheetModel();
  completeTime: number = 0;

  constructor(answerSheet?: AnswerSheetModel) {
    super();
    if (answerSheet) {
      Object.assign(this, answerSheet);
      this.respondent = answerSheet.respondent && new RespondentModel(answerSheet.respondent) || this.respondent;
      this.suggestionSheet = answerSheet.suggestionSheet && new SuggestionSheetModel(answerSheet.suggestionSheet) || this.suggestionSheet;
    }
  }

  static getNameValueList(answerSheet: AnswerSheetModel) {
    const nameValues = [];
    nameValues.push({ name: 'respondent', value: JSON.stringify(answerSheet.respondent) });
    nameValues.push({ name: 'suggestionSheet', value: JSON.stringify(answerSheet.suggestionSheet) });

    return { nameValues } as NameValueList;
  }
}

decorate(AnswerSheetModel, {
  respondent: observable,
  suggestionSheet: observable,
  managementNumber: observable,
  progress: observable,
  completeTime: observable,
});
