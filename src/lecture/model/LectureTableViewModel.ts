import { observable, decorate, computed } from 'mobx';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { CategoryModel, LearningState, LearningStateName } from 'shared/model';
import { LectureServiceType } from 'lecture/model';
import { CubeType, CubeTypeNameType } from 'myTraining/model';
import { DifficultyLevel } from 'myTraining/model/DifficultyLevel';

class LectureTableViewModel {
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
  time: number = 0; // 학습완료일 (취소/미이수일)
  creationTime: number = 0; // 등록일
  updateTime: number = 0;
  updateTimeForTest: number = 0;
  stampCount: number = 0; // 스탬프
  passedLearningCount: number = 0;
  totalLearningCount: number = 0;

  // for make observable object from json data.
  constructor(lectureTableView?: LectureTableViewModel) {
    if (lectureTableView) {
      Object.assign(this, lectureTableView);
    }
  }

  @computed get displayLearningTime() {
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
    return (
      (this.category && this.category.college && this.category.college.name) ||
      '-'
    );
  }

  @computed get displayDifficultyLevel(): string {
    return this.difficultyLevel || '-';
  }

  @computed
  get state() {
    if (this.learningState) {
      return LearningStateName[LearningState[this.learningState]];
    }
  }

  @computed get displayProgressRate(): string {
    return this.isCardType()
      ? '-'
      : `${this.passedLearningCount}/${this.totalLearningCount}`;
  }

  /* functions */
  isCardType() {
    // 서버에서 serviceType 이 대문자로 전달됨. ( CARD, COURSE, PROGRAM )
    return this.serviceType === LectureServiceType.Card.toUpperCase()
      ? true
      : false;
  }
}

export default LectureTableViewModel;

decorate(LectureTableViewModel, {
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
