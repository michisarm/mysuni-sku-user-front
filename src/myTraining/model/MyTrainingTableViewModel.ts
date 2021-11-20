import { observable, decorate } from 'mobx';
import {
  timeToHourMinutePaddingFormat,
  convertTimeToDate,
} from 'shared/helper/dateTimeHelper';
import { CategoryModel, LearningState } from 'shared/model';
import { DifficultyLevel } from './DifficultyLevel';
import { CompletedXlsxModel } from './CompletedXlsxModel';
import { InProgressXlsxModel } from './InProgressXlsxModel';
import { MyStampXlsxModel } from './MyStampXlsxModel';
import { LearningType, LearningTypeName } from './LearningType';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import moment from 'moment';

class MyTrainingTableViewModel {
  [key: string]: any;
  id: string = '';
  serviceId: string = '';
  serviceType: string = '';
  // category: CategoryModel = new CategoryModel();
  category: { categoryId: string; collegeId: string } = {
    categoryId: '',
    collegeId: '',
  };

  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  learningState?: LearningState;
  cubeType: LearningType = LearningType.None;
  name: PolyglotString = { ko: '', en: '', zh: '' };
  cubeName: PolyglotString = { ko: '', en: '', zh: '' };
  learningTime: number = 0;
  additionalLearningTime: number = 0; //카드추가학습시간
  startDate: number = 0; // 학습시작일
  learningStartDate: number = 0; // 학습시작일
  sortableLearningStartDate: number = 0; // 학습시작일
  endDate: number = 0; // 학습완료일
  createDate: number = 0; // 등록일
  time: number = 0; // 최근학습일 || 취소 미이수일
  modifiedTime: number = 0; // time이 modifiedTime으로 변경됨
  stampCount: number = 0;
  passedLearningCount: number = 0;
  totalLearningCount: number = 0;
  type: LearningType = LearningType.None;
  collegeId: string = '';
  useNote?: boolean = false; // 노트 작성 여부 Home > Learning > 학습중 List 에서 아이콘 표현
  round: number = 0;

  constructor(myTrainingTableView?: MyTrainingTableViewModel) {
    if (myTrainingTableView) {
      const useNote = myTrainingTableView.useNote;
      const sortableLearningStartDate = moment(
        myTrainingTableView.learningStartDate,
        'YYYY-MM-DD'
      ).valueOf();
      Object.assign(this, {
        ...myTrainingTableView,
        useNote,
        sortableLearningStartDate,
      });
    }
  }

  toXlsxForInProgress(
    index: number,
    collegeName?: string
  ): InProgressXlsxModel {
    const learningType = LearningTypeName[this.cubeType];

    return {
      No: String(index),
      College: collegeName || '-',
      과정명: parsePolyglotString(this.name) || '-',
      학습유형: learningType || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      최근학습일: convertTimeToDate(this.modifiedTime),
    };
  }

  toXlsxForCompleted(index: number, collegeName?: string): CompletedXlsxModel {
    const learningType = LearningTypeName[this.cubeType];

    return {
      No: String(index),
      College: collegeName || '-',
      과정명: parsePolyglotString(this.name) || '-',
      학습유형: learningType || '-',
      Level: this.difficultyLevel || '-',
      학습시간: timeToHourMinutePaddingFormat(this.learningTime),
      학습완료일: convertTimeToDate(this.endDate),
    };
  }

  toXlsxForMyStamp(index: number, collegeName?: string): MyStampXlsxModel {
    return {
      No: String(index),
      College: collegeName || '-',
      과정명: parsePolyglotString(this.name) || '-',
      스탬프: String(this.stampCount),
      획득일자: convertTimeToDate(this.endDate),
    };
  }
}

export default MyTrainingTableViewModel;

decorate(MyTrainingTableViewModel, {
  category: observable,
  difficultyLevel: observable,
  name: observable,
  cubeType: observable,
  learningState: observable,
  learningTime: observable,
  startDate: observable,
  time: observable,
  modifiedTime: observable,
  endDate: observable,
  createDate: observable,
  stampCount: observable,
  learningStartDate: observable,
  type: observable,
  collegeId: observable,
});
