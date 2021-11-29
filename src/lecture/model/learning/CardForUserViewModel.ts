import { decorate, observable } from 'mobx';
import CardType from 'lecture/shared/model/CardType';
import { DifficultyLevel } from 'personalcube/cubeintro/model';
import { DramaEntityObservableModel, LearningState } from 'shared/model';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { LangSupport } from '../LangSupport';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import { CompletedXlsxModel } from 'myTraining/model/CompletedXlsxModel';
import { MyStampXlsxModel } from 'myTraining/model/MyStampXlsxModel';
import { LearningType, LearningTypeName } from 'myTraining/model/LearningType';
import {
  convertTimeToDate,
  timeToHourMinutePaddingFormat,
} from 'shared/helper/dateTimeHelper';

class CardForUserViewModel extends DramaEntityObservableModel {
  //
  [key: string]: any;
  langSupports: LangSupport[] = [];
  name: PolyglotString = { ko: '', en: '', zh: '' };
  type: LearningType = LearningType.None;
  thumbImagePath: string = '';
  thumbnailImagePath: string = '';
  simpleDescription: PolyglotString = { ko: '', en: '', zh: '' };
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  mainCollegeId: string = '';
  required: boolean = false;
  learningTime: number = 0;
  additionalLearningTime: number = 0;
  paid: boolean = false;
  // 취소, 미이수, 최근 학습일
  modifiedTime: number = 0;
  // 학습 완료일
  passedTime: number = 0;
  // 스탬프 갯수
  stampCount: number = 0;

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
      Object.assign(this, { ...card });
    }
  }

  toXlsxForInProgress(
    index: number,
    collegeName?: string
  ): InProgressXlsxModel {
    return {
      No: String(index),
      College: collegeName || '-',
      과정명: parsePolyglotString(this.name) || '-',
      학습유형: this.type || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      최근학습일: convertTimeToDate(this.modifiedTime),
    };
  }

  toXlsxForCompleted(index: number, collegeName?: string): CompletedXlsxModel {
    return {
      No: String(index),
      College: collegeName || '-',
      과정명: parsePolyglotString(this.name) || '-',
      학습유형: this.type || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      학습완료일: convertTimeToDate(this.passedTime),
    };
  }

  toXlsxForMyStamp(index: number, collegeName?: string): MyStampXlsxModel {
    return {
      No: String(index),
      College: collegeName || '-',
      과정명: parsePolyglotString(this.name) || '-',
      스탬프: String(this.stampCount),
      획득일자: convertTimeToDate(this.passedTime),
    };
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
  modifiedTime: observable,

  passedStudentCount: observable,
  studentCount: observable,
  starCount: observable,
  badgeCount: observable,

  learningState: observable,

  phaseCount: observable,
  completePhaseCount: observable,
});

export default CardForUserViewModel;
