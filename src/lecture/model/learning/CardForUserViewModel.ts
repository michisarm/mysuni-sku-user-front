import { decorate, observable } from 'mobx';
import CardType from 'lecture/shared/model/CardType';
import { DifficultyLevel } from 'personalcube/cubeintro/model';
import { DramaEntityObservableModel, LearningState } from 'shared/model';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { LangSupport } from '../LangSupport';

class CardForUserViewModel extends DramaEntityObservableModel {
  //
  langSupports: LangSupport[] = [];
  name: PolyglotString = { ko: '', en: '', zh: '' };
  type: CardType = 'None';
  thumbImagePath: string = '';
  thumbnailImagePath: string = '';
  simpleDescription: PolyglotString = { ko: '', en: '', zh: '' };
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  mainCollegeId: string = '';
  required: boolean = false;
  learningTime: number = 0;
  additionalLearningTime: number = 0;
  paid: boolean = false;

  passedStudentCount: number = 0;
  studentCount: number = 0;
  starCount: number = 0;
  badgeCount: number = 0;

  learningState: LearningState = LearningState.Progress;

  phaseCount: number = 0;
  completePhaseCount: number = 0;

  constructor(card?: CardForUserViewModel) {
    super();
    if (card) {
      Object.assign(this, card);
    }
  }
}

decorate(CardForUserViewModel, {
  langSupports: observable,
  name: observable,
  type: observable,
  thumbImagePath: observable,
  thumbnailImagePath: observable,
  simpleDescription: observable,
  difficultyLevel: observable,
  mainCollegeId: observable,
  required: observable,
  learningTime: observable,
  additionalLearningTime: observable,
  paid: observable,

  passedStudentCount: observable,
  studentCount: observable,
  starCount: observable,
  badgeCount: observable,

  learningState: observable,

  phaseCount: observable,
  completePhaseCount: observable,
});

export default CardForUserViewModel;
