import { observable, decorate, computed } from 'mobx';
import moment from 'moment';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { CategoryModel, LearningState } from 'shared/model';
import { LectureServiceType } from 'lecture/model';
import { DifficultyLevel } from './DifficultyLevel';
import { CompletedXlsxModel } from './CompletedXlsxModel';
import { InProgressXlsxModel } from './InProgressXlsxModel';
import { CubeType } from '../../personalcube/personalcube/model';
import { MyStampXlsxModel } from './MyStampXlsxModel';
import CubeTypeNameType from './CubeTypeNameType';


class MyTrainingTableViewModel {
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
  endDate: number = 0; // 학습완료일
  createDate: number = 0; // 등록일
  time: number = 0; // 최근학습일 || 취소 미이수일
  stampCount: number = 0; // 스탬프

  passedLearningCount: number = 0;
  totalLearningCount: number = 0;

  // for make observable object from json data.
  constructor(myTrainingTableView?: MyTrainingTableViewModel) {
    if (myTrainingTableView) {
      Object.assign(this, myTrainingTableView);
    }
  }

  @computed get displayLearningTime(): string {
    return timeToHourMinutePaddingFormat(this.learningTime);
  }

  @computed get displayStampCount() {
    // 획득할 수 있는 stampCount 가 없는 경우 '-' 로 화면에 노출.
    if (!this.stampCount) {
      return '-';
    }
    return this.stampCount;
  }

  @computed get displayCubeType(): string {
    return CubeTypeNameType[this.cubeType];
  }

  @computed get displayCollegeName(): string {
    return this.category &&
      this.category.college && this.category.college.name || '-';
  }

  @computed get displayDifficultyLevel(): string {
    return this.difficultyLevel || '-';
  }

  @computed get displayProgressRate(): string {
    return this.isCardType() ? '-' : `${this.passedLearningCount}/${this.totalLearningCount}`;
  }

  /* functions */
  isCardType() {
    // 서버에서 serviceType 이 대문자로 전달됨. ( CARD, COURSE, PROGRAM )
    return this.serviceType === LectureServiceType.Card.toUpperCase() ? true : false;
  }

  isCourseOrProgram(): boolean {
    return this.serviceType === (LectureServiceType.Course.toUpperCase() || LectureServiceType.Program.toUpperCase()) ? true : false;
  }

  isCollegeEmpty() {
    return (this.category && this.category.college) ? false : true;
  }


  toXlsxForInProgress(index: number): InProgressXlsxModel {
    /* CARD 가 아닌 PROGRAM & COURSE 는 'Course' 를 화면에 보여준다. */
    const displayCourse = 'Course';

    return {
      No: String(index),
      College: this.isCollegeEmpty() ? '-' : this.category.college.name,
      과정명: this.name || '-',
      학습유형: this.cubeType && this.cubeType || displayCourse,
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      최근학습일: moment(this.time).format('YYYY.MM.DD')
    };
  }

  toXlsxForCompleted(index: number): CompletedXlsxModel {
    /* CARD 가 아닌 PROGRAM & COURSE 는 'Course' 를 화면에 보여준다. */
    const displayCourse = 'Course';

    return {
      No: String(index),
      College: this.isCollegeEmpty() ? '-' : this.category.college.name,
      과정명: this.name || '-',
      학습유형: this.cubeType && this.cubeType || displayCourse,
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      학습완료일: moment(Number(this.endDate)).format('YYYY.MM.DD')
    };
  }

  toXlsxForMyStamp(index: number): MyStampXlsxModel {

    return {
      No: String(index),
      College: this.isCollegeEmpty() ? '-' : this.category.college.name,
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
