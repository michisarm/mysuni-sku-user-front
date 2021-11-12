import { decorate, observable, computed } from 'mobx';
import { getCollegeTime } from 'personalcube/personalcube/model/LectureTimeSummary';
import { DramaEntityObservableModel } from 'shared/model';
import CollegeLearningTimeModel from './CollegeLearningTimeModel';

class MyLearningSummaryModel {
  //
  // college별 학습시간
  collegeLearningTimes: CollegeLearningTimeModel[] = [];
  //개인 학습시간
  accumulatedLearningTime: number = 0;
  //
  myCompanyLearningTime: number = 0;

  // year: number = 0;
  // totalLearningTime: number = 0;
  // suniLearningTime: number = 0;
  // myCompanyLearningTime: number = 0;
  // completeLectureCount: number = 0;
  // acheiveStampCount: number = 0;
  // achieveBadgeCount: number = 0;

  // aiCollegeTime: number = 0;
  // dtCollegeTime: number = 0;
  // happyCollegeTime: number = 0;
  // svCollegeTime: number = 0;
  // designCollegeTime: number = 0;
  // globalCollegeTime: number = 0;
  // leadershipCollegeTime: number = 0;
  // managementCollegeTime: number = 0;
  // energySolutionCollegeTime: number = 0;

  // bmDesignerCollegeTime: number = 0;
  // semiconductorCollegeTime: number = 0;
  // skManagementCollegeTime: number = 0;
  // skAcademyCollegeTime: number = 0;
  // lifeStyleCollegeTime: number = 0;
  // myCompanyInSuniLearningTime: number = 0;

  // /* 개인 학습(인정)시간 */
  // aplAllowTime: number = 0;

  // /* 누적시간 */
  // totalSuniLearningTime: number = 0;
  // totalMyCompanyLearningTime: number = 0;
  // totalAplAllowTime: number = 0;
  // totalCompleteLectureCount: number = 0;
  // totalCollegeTime: number = 0;

  // /* mySUNI 학습시간 */
  // @computed get displayMySUNILearningTime(): number {
  //   return this.suniLearningTime - this.myCompanyInSuniLearningTime;
  // }

  // /* 관계사 학습시간 */
  // @computed get displayMyCompanyLearningTime(): number {
  //   return this.myCompanyLearningTime + this.myCompanyInSuniLearningTime;
  // }

  constructor(summary?: MyLearningSummaryModel) {
    if (summary) {
      Object.assign(this, { ...summary });

      this.collegeLearningTimes =
        (summary.collegeLearningTimes &&
          summary.collegeLearningTimes.length > 0 && [
            ...summary.collegeLearningTimes,
          ]) ||
        [];
    }
  }

  @computed
  get displayMyCompanyLearningTimeSummary() {
    //
    let summaryTime = 0;

    this.collegeLearningTimes &&
      this.collegeLearningTimes.length > 0 &&
      this.collegeLearningTimes.map((collegeLearningTime) => {
        if (
          includeCompanyCollegeIds.includes(collegeLearningTime.collegeId) ||
          !excludeCompanyCollegeIds.includes(collegeLearningTime.collegeId)
        ) {
          summaryTime += collegeLearningTime.learningTime;
        }
      });

    return summaryTime;
  }

  @computed
  get displayMySuniLearningTimeSummary() {
    //
    let summaryTime = 0;

    this.collegeLearningTimes &&
      this.collegeLearningTimes.length > 0 &&
      this.collegeLearningTimes.map((collegeLearningTime) => {
        if (mySuniLearningCollegeIds.includes(collegeLearningTime.collegeId)) {
          summaryTime += collegeLearningTime.learningTime;
        }
      });

    return summaryTime;
  }

  @computed
  get displayTotalLearningTimeSummary() {
    //
    let summaryTime = 0;
    this.collegeLearningTimes &&
      this.collegeLearningTimes.length > 0 &&
      this.collegeLearningTimes.map((collegeLearningTime) => {
        mySuniLearningCollegeIds.includes(collegeLearningTime.collegeId) &&
          (summaryTime += collegeLearningTime.learningTime);
      });

    summaryTime += this.myCompanyLearningTime;
    summaryTime += this.accumulatedLearningTime;

    return summaryTime;
  }

  getCollegeTime(
    collegeType:
      | 'ai'
      | 'dt'
      | 'happy'
      | 'sv'
      | 'design'
      | 'global'
      | 'leadership'
      | 'management'
      | 'semiconductor'
      | 'energySolution'
      | 'bmDesigner'
      | 'skAcademy'
      | 'skManagement'
      | 'lifeStyle'
  ) {
    const college = collegeIdMap.find((x) => x.type === collegeType);
    let findResultTime = 0;

    if (
      college &&
      college.id &&
      this.collegeLearningTimes &&
      this.collegeLearningTimes.length > 0
    ) {
      const collegeLearningTime = this.collegeLearningTimes.find(
        (x) => x.collegeId === college.id
      );

      findResultTime =
        (collegeLearningTime && collegeLearningTime.learningTime) || 0;
    }

    return findResultTime;
  }
}

decorate(MyLearningSummaryModel, {
  collegeLearningTimes: observable,
  accumulatedLearningTime: observable,
  myCompanyLearningTime: observable,
  // year: observable,
  // totalLearningTime: observable,
  // suniLearningTime: observable,
  // myCompanyLearningTime: observable,
  // completeLectureCount: observable,
  // acheiveStampCount: observable,
  // achieveBadgeCount: observable,
  // aiCollegeTime: observable,
  // dtCollegeTime: observable,
  // happyCollegeTime: observable,
  // svCollegeTime: observable,
  // designCollegeTime: observable,
  // globalCollegeTime: observable,
  // leadershipCollegeTime: observable,
  // managementCollegeTime: observable,
  // energySolutionCollegeTime: observable,
  // bmDesignerCollegeTime: observable,
  // semiconductorCollegeTime: observable,
  // skManagementCollegeTime: observable,
  // skAcademyCollegeTime: observable,
  // lifeStyleCollegeTime: observable,
  // myCompanyInSuniLearningTime: observable,
  // aplAllowTime: observable,
  // totalSuniLearningTime: observable,
  // totalMyCompanyLearningTime: observable,
  // totalAplAllowTime: observable,
  // totalCompleteLectureCount: observable,
  // totalCollegeTime: observable,
});

export default MyLearningSummaryModel;

const excludeCompanyCollegeIds = [
  'CLG00001',
  'CLG00002',
  'CLG00003',
  'CLG00004',
  'CLG00005',
  'CLG00006',
  'CLG00007',
  'CLG00008',
  'CLG00019',
  'CLG00017',
  'CLG00018',
  'CLG0001a',
  'CLG0001c',
  'CLG00020',
];
const includeCompanyCollegeIds = ['CLG0001w'];
const mySuniLearningCollegeIds = [
  'CLG00001',
  'CLG00002',
  'CLG00003',
  'CLG00004',
  'CLG00005',
  'CLG00006',
  'CLG00007',
  'CLG00008',
  'CLG00019',
  'CLG00017',
  'CLG00018',
  'CLG0001a',
  'CLG0001c',
  'CLG00020',
];

const collegeIdMap = [
  { type: 'ai', id: 'CLG00001' },
  { type: 'dt', id: 'CLG00002' },
  { type: 'happy', id: 'CLG00003' },
  { type: 'sv', id: 'CLG00004' },
  { type: 'design', id: 'CLG00005' },
  { type: 'global', id: 'CLG00006' },
  { type: 'leadership', id: 'CLG00007' },
  { type: 'management', id: 'CLG00008' },
  { type: 'skManagement', id: 'CLG00017' },
  { type: 'skAcademy', id: 'CLG00018' },
  { type: 'semiconductor', id: 'CLG00019' },
  { type: 'bmDesigner', id: 'CLG00020' },
  { type: 'lifeStyle', id: 'CLG0001a' },
  { type: 'energySolution', id: 'CLG000c1' },
];
