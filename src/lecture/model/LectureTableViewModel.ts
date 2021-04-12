import { observable, decorate } from 'mobx';
import { CardCategory } from '../../shared/model/CardCategory';

class LectureTableViewModel {
  [key: string]: any;
  id: string = '';
  serviceId: string = '';
  serviceType: string = 'Card';
  category: CardCategory = initialCardCategory;
  difficultyLevel: string = '';
  name: string = '';
  learningTime: number = 0
  learningState: string = '';
  updateTime: number = 0;
  updateTimeForTest: number = 0;
  passedLearningCount: number = 0;
  totalLearningCount: number = 0;

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


const initialCardCategory: CardCategory = {
  collegeId: '',
  channelId: '',
  mainCategory: false,
}