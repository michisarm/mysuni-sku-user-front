import { decorate, observable } from 'mobx';
import { CategoryModel, LearningState } from 'shared/model';
import { CubeType } from 'personalcube/personalcube/model';
import { DifficultyLevel } from './DifficultyLevel';


class InMyLectureTableViewModel {
  // 관심목록
  [key: string]: any;
  id: string = '';
  serviceId: string = '';
  serviceType: string = ''; // 카드 코스 구분을 위해
  cardId: string = '';
  category: CategoryModel = new CategoryModel(); // College & channel
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic; // Level
  learningState: LearningState = LearningState.Progress; // 학습 상태
  name: string = ''; // 과정명
  cubeType: CubeType = CubeType.None; // 학습유형
  learningTime: number = 0; // 학습시간
  startDate: number = 0; // 학습시작일
  endDate: number = 0; // 학습완료일 (취소/미이수일)
  createDate: number = 0; // 등록일
  stampCount: number = 0; // 스탬프
  lastStudyDate: number = 0; // 최근학습일
  passedLearningCount: number = 0;
  totalLearningCount: number = 0;

  constructor(inMyLectureTableView?: InMyLectureTableViewModel) {
    if (inMyLectureTableView) {
      Object.assign(this, inMyLectureTableView);
    }
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
