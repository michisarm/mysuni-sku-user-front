import { computed, decorate, observable } from 'mobx';
import { NameValueList } from '@nara.platform/accent';

import { LangStrings, DramaEntityObservableModel } from 'shared';
import RoundPartModel from './RoundPartModel';

export default class SurveyCaseModel extends DramaEntityObservableModel {
  //
  managementNumber: string = '';
  titles: LangStrings = new LangStrings();
  surveyFormId: string = '';
  multipleRound: boolean = false;
  time: number = 0;

  roundParts: RoundPartModel[] = [];

  constructor(surveyCase?: SurveyCaseModel) {
    //
    super();
    if (surveyCase) {
      Object.assign(this, surveyCase);
      this.titles = surveyCase.titles && new LangStrings(surveyCase.titles) || this.titles;
      this.roundParts = surveyCase.roundParts
        && surveyCase.roundParts.map((roundPart: any) => new RoundPartModel(roundPart)) || this.roundParts;
    } else {
      this.roundParts.push(new RoundPartModel());
    }
  }

  @computed
  get roundPart() {
    return this.roundParts[0];
  }

  static getNameValueList(surveyCase: SurveyCaseModel) {
    const nameValues = [];
    nameValues.push({ name: 'managementNumber', value: surveyCase.managementNumber });
    nameValues.push({ name: 'titles', value: JSON.stringify(surveyCase.titles) });
    nameValues.push({ name: 'surveyFormId', value: surveyCase.surveyFormId });

    return { nameValues } as NameValueList;
  }
}

decorate(SurveyCaseModel, {
  titles: observable,
  surveyFormId: observable,
  multipleRound: observable,
  roundParts: observable,
});
