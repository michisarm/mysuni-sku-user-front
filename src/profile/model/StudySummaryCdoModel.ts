import { AudienceKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdNameList } from '../../shared/model/IdNameList';

export class StudySummaryCdoModel {
  audienceKey : AudienceKey={} as AudienceKey;
  profileId : string ='';
  favoriteChannels : IdNameList = {} as IdNameList;
  favoriteColleges : IdNameList = {} as IdNameList;
  favoriteLearningType : IdNameList = {} as IdNameList;

  constructor(studySummary? : StudySummaryCdoModel) {
    if (studySummary) {
      Object.assign(this, { studySummary });
    }
  }
}

decorate(StudySummaryCdoModel, {
  audienceKey: observable,
  profileId: observable,
  favoriteChannels: observable,
  favoriteColleges: observable,
  favoriteLearningType: observable,
});
