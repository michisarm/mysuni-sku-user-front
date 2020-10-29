import { decorate, observable, computed } from 'mobx';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { CategoryModel, LearningState } from 'shared/model';
import { LectureServiceType } from 'lecture/model';
import { CubeType } from 'personalcube/personalcube/model';
import { DifficultyLevel } from './DifficultyLevel';
import CubeTypeNameType from './CubeTypeNameType';


class InMyLectureTableViewModel {
  //
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

  constructor(inMyLectureTableView?: InMyLectureTableViewModel) {
    if (inMyLectureTableView) {
      Object.assign(this, inMyLectureTableView);
    }
  }

  @computed get formattedLearningTime(): string {
    return timeToHourMinutePaddingFormat(this.learningTime);
  }

  @computed get displayCubeType(): string {
    return CubeTypeNameType[this.cubeType];
  }

  @computed get displayStampCount() {
    // 획득할 수 있는 stampCount 가 없는 경우 '-' 로 화면에 노출.
    if (!this.stampCount) {
      return '-';
    }

    return this.stampCount;
  }

  @computed get displayCollegeName() {
    return this.category &&
      this.category.college && this.category.college.name || '-';
  }

  @computed get displayDifficultyLevel(): string {
    return this.difficultyLevel || '-';
  }

  /* functions */
  isCardType() {
    // 서버에서 serviceType 이 대문자로 전달됨. ( CARD, COURSE, PROGRAM )
    return this.serviceType === LectureServiceType.Card ? true : false;
  }

}

export default InMyLectureTableViewModel;

decorate(InMyLectureTableViewModel, {
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
