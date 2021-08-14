import { decorate, observable } from 'mobx';
import { CategoryModel, LearningState } from 'shared/model';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { DifficultyLevel } from './DifficultyLevel';
import { LearningType } from './LearningType';

class InMyLectureTableViewModel {
  [key: string]: any;
  id: string = '';
  serviceId: string = '';
  serviceType: string = '';
  cardId: string = '';
  category: { categoryId: string; collegeId: string } = {
    categoryId: '',
    collegeId: '',
  };

  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  learningState: LearningState = LearningState.Progress;
  name: PolyglotString = { ko: '', en: '', zh: '' };
  cubeType: LearningType = LearningType.None;
  learningTime: number = 0;
  startDate: number = 0;
  endDate: number = 0;
  createDate: number = 0;
  lastStudyDate: number = 0;
  stampCount: number = 0;
  passedLearningCount: number = 0;
  totalLearningCount: number = 0;
  useNote?: boolean = false; // 노트 작성 여부 Home > Learning > 학습중 List 에서 아이콘 표현

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
