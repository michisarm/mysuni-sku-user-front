
import { decorate, observable } from 'mobx';
import { IdNameList, NameValueList } from 'shared';
import { DramaEntity, PatronKey } from '@nara.platform/accent';


class StudySummaryModel implements DramaEntity {
  //
  entityVersion: number = 0;
  id: string = '';
  patronKey: PatronKey = {} as PatronKey;

  favoriteChannels: IdNameList = new IdNameList();
  favoriteColleges: IdNameList = new IdNameList();
  favoriteLearningType: IdNameList = new IdNameList();

  //Donmain 변경 :   My training
  // learningTime: LearningTimeModel = new LearningTimeModel();
  // lectureSummary: LectureSummary = new LectureSummary();
  // stampCount: number = 0;
  // joinedCommunity: number = 0;

  constructor(studySummary?: StudySummaryModel) {
    if (studySummary) {
      const favoriteChannels = studySummary.favoriteChannels && new IdNameList(studySummary.favoriteChannels) || this.favoriteChannels;
      const favoriteColleges = studySummary.favoriteColleges && new IdNameList(studySummary.favoriteColleges) || this.favoriteColleges;
      const favoriteLearningType = studySummary.favoriteLearningType
        && new IdNameList(studySummary.favoriteLearningType) || this.favoriteLearningType;
      // const learningTime = studySummary.learningTime && new LearningTimeModel(studySummary.learningTime) || '';
      // const lectureSummary = studySummary.lectureSummary && new LectureSummary((studySummary.lectureSummary)) || '';

      Object.assign(this, { ...studySummary, favoriteChannels, favoriteColleges, favoriteLearningType });
    }
  }

  static asNameValues(studySummary: StudySummaryModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'favoriteChannels',
          value: JSON.stringify(studySummary.favoriteChannels),
        },
        {
          name: 'favoriteColleges',
          value: JSON.stringify(studySummary.favoriteColleges),
        },
        {
          name: 'favoriteLearningType',
          value: JSON.stringify(studySummary.favoriteLearningType),
        },
      ],
    };

    return asNameValues;
  }
}

decorate(StudySummaryModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  favoriteChannels: observable,
  favoriteColleges: observable,
  favoriteLearningType: observable,
});

export default StudySummaryModel;
