import { decorate, observable } from 'mobx';
import moment from 'moment';
import { LearningType } from 'myTraining/model/LearningType';
import { DifficultyLevel } from 'personalcube/cubeintro/model';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

//import LectrueRibbon from './LectrueRibbon';

class EnrolledCardModel {
  //
  [key: string]: any;
  cardId: string = '';
  collegeId: string = '';
  cubeId: string = '';
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  learningStartDate: string = '';
  learningTime: number = 0;
  name: PolyglotString | null = null;
  round: number = 0;
  studentId: string = '';
  type: LearningType = LearningType.None;
  useNote: boolean = false;
  longLearningStartDate: number = 0;

  constructor(card?: EnrolledCardModel) {
    //
    if (card) {
      Object.assign(this, { ...card });
      this.longLearningStartDate =
        (this.learningStartDate && moment(this.learningStartDate).valueOf()) ||
        0;
    }
  }
}

decorate(EnrolledCardModel, {
  cardId: observable,
  collegeId: observable,
  cubeId: observable,
  difficultyLevel: observable,
  learningStartDate: observable,
  learningTime: observable,
  name: observable,
  round: observable,
  studentId: observable,
  type: observable,
});

export default EnrolledCardModel;
