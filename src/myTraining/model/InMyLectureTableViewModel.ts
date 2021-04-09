import { decorate, observable } from 'mobx';
import { CategoryModel, LearningState } from 'shared/model';
import { CubeType } from 'personalcube/personalcube/model';
import { DifficultyLevel } from './DifficultyLevel';


class InMyLectureTableViewModel {
  [key: string]: any;
  id: string = '';
  serviceId: string = '';
  serviceType: string = '';
  cardId: string = '';
  category: CategoryModel = new CategoryModel();
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  learningState: LearningState = LearningState.Progress;
  name: string = '';
  cubeType: CubeType = CubeType.None;
  learningTime: number = 0;
  startDate: number = 0;
  endDate: number = 0;
  createDate: number = 0;
  lastStudyDate: number = 0;
  stampCount: number = 0;
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
