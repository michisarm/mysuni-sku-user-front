import { observable, decorate } from 'mobx';
import { CategoryModel, LearningState } from 'shared/model';
import { DifficultyLevel } from 'myTraining/model/DifficultyLevel';
import { CubeType } from '../../personalcube/personalcube/model';


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

  // for make observable object from json data.
  constructor(lectureTableView?: LectureTableViewModel) {
    if (lectureTableView) {
      Object.assign(this, lectureTableView);
    }
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
