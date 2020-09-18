import { observable, decorate, computed } from 'mobx';
import moment from 'moment';
import { CategoryModel, LearningState } from 'shared/model';
import { LectureServiceType } from 'lecture/model';
import { DifficultyLevel } from './DifficultyLevel';
import { CubeType } from '../../personalcube/personalcube/model';
import { CompletedXlsxModel } from './CompletedXlsxModel';
import { InProgressXlsxModel } from './InProgressXlsxModel';

class MyTrainingModelV2 {

  id: string = '';
  serviceId: string = '';
  serviceType: string = ''; // 카드 코스 구분을 위해
  cineroomId: string = '';
  coursePlanId: string = '';
  cubeId: string = '';
  category: CategoryModel = new CategoryModel(); // College & channel
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic; // Level
  name: string = ''; // 과정명
  organizer: string = ''; // 교육기관
  cubeType: CubeType = CubeType.None; // 학습유형
  learningState?: LearningState; // 학습 상태
  learningTime: number = 0; // 학습시간
  startDate: number = 0; // 학습시작일
  endDate: number = 0; // 학습완료일
  createDate: number = 0; // 등록일
  retryDate: number = 0; // 취소/미이수일
  stampCount: number = 0; // 스탬프

  // for make observable object from json data.
  constructor(myTrainingV2?: MyTrainingModelV2) {
    if (myTrainingV2) {
      Object.assign(this, myTrainingV2);
    }
  }

  @computed get learningTimeWithFormat() {
    const hour = Math.floor(this.learningTime / 60);
    const minute = this.learningTime % 60;

    return hour && `${hour}h ${minute}m` || `${minute}m`;
  }

  /* functions */
  isCardType() {
    return this.serviceType === LectureServiceType.Card ? true : false;
  }

  /*
    No: string = '';
    College: string = '';
    과정명: string = '';
    학습유형: string = '';
    Level: string = '';
    진행률: string = '';
    학습시간: string = '';
    학습시작일: string = '';
  */
  toXlsxForInProgress(index: number): InProgressXlsxModel {
    return {
      No: String(index),
      College: this.category.college.name,
      과정명: this.name,
      학습유형: this.cubeType,
      Level: this.difficultyLevel || '-',
      진행률: '-',
      학습시간: this.learningTimeWithFormat,
      학습시작일: moment(Number(this.startDate)).format('YYYY.MM.DD')
    };
  }

  /*
    No: string = '';
    College: string = '';
    과정명: string = '';
    학습유형: string = '';
    Level: string = '';
    학습시간: string = '';
    학습완료일: string = '';
  */
  toXlsxForCompleted(index: number): CompletedXlsxModel {
    return {
      No: String(index),
      College: this.category.college.name,
      과정명: this.name,
      학습유형: this.cubeType,
      Level: this.difficultyLevel || '-',
      학습시간: this.learningTimeWithFormat,
      학습완료일: moment(Number(this.endDate)).format('YYYY.MM.DD')
    };
  }
}

export default MyTrainingModelV2;

// made observable object!
decorate(MyTrainingModelV2, {
  category: observable,
  difficultyLevel: observable,
  name: observable,
  cubeType: observable,
  learningState: observable,
  learningTime: observable,
  startDate: observable,
  endDate: observable,
  createDate: observable,
  retryDate: observable,
  stampCount: observable,
});
