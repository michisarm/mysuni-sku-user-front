import { observable, decorate, computed } from 'mobx';
import moment from 'moment';
import { CategoryModel, LearningState } from 'shared/model';
import { LectureServiceType } from 'lecture/model';
import { DifficultyLevel } from './DifficultyLevel';
import { CubeType } from '../../personalcube/personalcube/model';
import { CompletedXlsxModel } from './CompletedXlsxModel';
import { InProgressXlsxModel } from './InProgressXlsxModel';

class MyTrainingModelV2 {

  [key: string]: any;
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
  endDate: number = 0; // 학습완료일 (취소/미이수일)
  createDate: number = 0; // 등록일
  stampCount: number = 0; // 스탬프

  // for make observable object from json data.
  constructor(myTrainingV2?: MyTrainingModelV2) {
    if (myTrainingV2) {
      Object.assign(this, myTrainingV2);
    }
  }

  @computed get formattedLearningTime() {
    const hour = Math.floor(this.learningTime / 60);
    const minute = this.learningTime % 60;

    return hour && `${hour}h ${minute}m` || `${minute}m`;
  }

  @computed get stampCountForDisplay() {
    // 획득할 수 있는 stampCount 가 없는 경우 '-' 로 화면에 노출.
    if (!this.stampCount) {
      return '-';
    }

    return this.stampCount;
  }

  /* functions */
  isCardType() {
    // 서버에서 serviceType 이 대문자로 전달됨. ( CARD, COURSE, PROGRAM )
    return this.serviceType === LectureServiceType.Card.toUpperCase() ? true : false;
  }





  toXlsxForInProgress(index: number): InProgressXlsxModel {
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

  toXlsxForCompleted(index: number): CompletedXlsxModel {
    /*
      No: string = '';
      College: string = '';
      과정명: string = '';
      학습유형: string = '';
      Level: string = '';
      학습시간: string = '';
      학습완료일: string = '';
    */
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
  stampCount: observable,
});
