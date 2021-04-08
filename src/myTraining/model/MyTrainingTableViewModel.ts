import { observable, decorate, computed } from 'mobx';
import moment from 'moment';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { CategoryModel, LearningState } from 'shared/model';
import { DifficultyLevel } from './DifficultyLevel';
import { CompletedXlsxModel } from './CompletedXlsxModel';
import { InProgressXlsxModel } from './InProgressXlsxModel';
import { MyStampXlsxModel } from './MyStampXlsxModel';


class MyTrainingTableViewModel {
  [key: string]: any;
  id: string = '';
  serviceId: string = '';
  serviceType: string = '';
  category: CategoryModel = new CategoryModel();
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  learningState?: LearningState;
  name: string = '';
  learningTime: number = 0;
  startDate: number = 0; // 학습시작일
  endDate: number = 0; // 학습완료일
  createDate: number = 0; // 등록일
  time: number = 0; // 최근학습일 || 취소 미이수일
  stampCount: number = 0;
  passedLearningCount: number = 0;
  totalLearningCount: number = 0;

  constructor(myTrainingTableView?: MyTrainingTableViewModel) {
    if (myTrainingTableView) {
      Object.assign(this, myTrainingTableView);
    }
  }

  @computed get formattedLearningTime(): string {
    return timeToHourMinutePaddingFormat(this.learningTime);
  }

  @computed get displayStampCount() {
    if (!this.stampCount) {
      return '-';
    }
    return this.stampCount;
  }

  @computed get displayDifficultyLevel(): string {
    return this.difficultyLevel || '-';
  }

  @computed get displayProgressRate(): string {
    return this.serviceType === 'Card' ? `${this.passedLearningCount}/${this.totalLearningCount}` : '-';
  }

  toXlsxForInProgress(index: number): InProgressXlsxModel {

    return {
      No: String(index),
      College: this.category && this.category.college && this.category.college.id || '-',
      과정명: this.name || '-',
      학습유형: this.serviceType || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      최근학습일: moment(this.time).format('YYYY.MM.DD')
    };
  }

  toXlsxForCompleted(index: number): CompletedXlsxModel {

    return {
      No: String(index),
      College: this.category && this.category.college && this.category.college.id || '-',
      과정명: this.name || '-',
      학습유형: this.serviceType || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      학습완료일: moment(Number(this.endDate)).format('YYYY.MM.DD')
    };
  }

  toXlsxForMyStamp(index: number): MyStampXlsxModel {

    return {
      No: String(index),
      College: this.category && this.category.college && this.category.college.id || '-',
      과정명: this.name || '-',
      스탬프: String(this.stampCount),
      획득일자: moment(Number(this.endDate)).format('YYYY.MM.DD'),
    };
  }
}

export default MyTrainingTableViewModel;

decorate(MyTrainingTableViewModel, {
  category: observable,
  difficultyLevel: observable,
  name: observable,
  cubeType: observable,
  learningState: observable,
  learningTime: observable,
  startDate: observable,
  time: observable,
  endDate: observable,
  createDate: observable,
  stampCount: observable,
});
