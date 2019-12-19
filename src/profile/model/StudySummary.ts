
import { decorate, observable } from 'mobx';
import { IdNameList, NameValueList } from 'shared';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { LearningTimeModel } from './LearningTimeModel';
import { LectureSummary } from './LectureSummary';
import { StudySummaryCdoModel } from './StudySummaryCdoModel';

export  class StudySummary implements DramaEntity {
  entityVersion: number=0;
  id: string='';
  patronKey: PatronKey={} as PatronKey;

  favoriteChannels: IdNameList = new IdNameList();
  favoriteColleges: IdNameList = new IdNameList();
  favoriteLearningType: IdNameList = new IdNameList();

  learningTime: LearningTimeModel = new LearningTimeModel();
  lectureSummary: LectureSummary = new LectureSummary();
  stampCount: number = 0;
  joinedCommunity: number = 0;

  constructor(studySummary?: StudySummary) {
    if (studySummary) {
      const learningTime = studySummary.learningTime && new LearningTimeModel(studySummary.learningTime) || '';
      const lectureSummary = studySummary.lectureSummary && new LectureSummary((studySummary.lectureSummary)) || '';

      Object.assign(this, { ...studySummary, learningTime, lectureSummary });
    }
  }

  static asNameValues(studySummary: StudySummary): NameValueList {
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
        {
          name: 'learningTime',
          value: JSON.stringify(studySummary.learningTime),
        },
        {
          name: 'lectureSummary',
          value: JSON.stringify(studySummary.lectureSummary),
        },
        {
          name: 'stampCount',
          value: studySummary.stampCount.toString(),
        },
        {
          name: 'joinedCommunity',
          value: studySummary.joinedCommunity.toString(),
        },
      ],
    };
    console.log(asNameValues);

    return asNameValues;
  }

  static asCdo(studySummary: StudySummary) : StudySummaryCdoModel {
    return (
      {
        profileId: studySummary.id,
        favoriteChannels: studySummary.favoriteChannels,
        favoriteColleges: studySummary.favoriteColleges,
        favoriteLearningType: studySummary.favoriteLearningType,
      }
    );
  }
}

decorate(StudySummary, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  favoriteChannels: observable,
  favoriteColleges: observable,
  favoriteLearningType: observable,
  learningTime: observable,
  lectureSummary: observable,
  stampCount: observable,
  joinedCommunity: observable,
});
