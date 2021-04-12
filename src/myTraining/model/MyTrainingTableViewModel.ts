import { observable, decorate } from 'mobx';
import moment from 'moment';
import { timeToHourMinutePaddingFormat, convertTimeToDate } from 'shared/helper/dateTimeHelper';
import { CategoryModel, LearningState } from 'shared/model';
import { DifficultyLevel } from './DifficultyLevel';
import { CompletedXlsxModel } from './CompletedXlsxModel';
import { InProgressXlsxModel } from './InProgressXlsxModel';
import { MyStampXlsxModel } from './MyStampXlsxModel';
import { CubeType } from '../../personalcube/personalcube/model';

class MyTrainingTableViewModel {
  [key: string]: any;
  id: string = '';
  serviceId: string = '';
  serviceType: string = '';
  category: CategoryModel = new CategoryModel();
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  learningState?: LearningState;
  cubeType: CubeType = CubeType.None;
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

  toXlsxForInProgress(index: number, collegeName?: string): InProgressXlsxModel {

    return {
      No: String(index),
      College: collegeName || '-',
      과정명: this.name || '-',
      학습유형: this.serviceType || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      최근학습일: convertTimeToDate(this.time),
    };
  }

  toXlsxForCompleted(index: number, collegeName?: string): CompletedXlsxModel {

    return {
      No: String(index),
      College: collegeName || '-',
      과정명: this.name || '-',
      학습유형: this.serviceType || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      학습완료일: convertTimeToDate(this.endDate),
    };
  }

  toXlsxForMyStamp(index: number, collegeName?: string): MyStampXlsxModel {
    return {
      No: String(index),
      College: collegeName || '-',
      과정명: this.name || '-',
      스탬프: String(this.stampCount),
      획득일자: convertTimeToDate(this.endDate),
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
