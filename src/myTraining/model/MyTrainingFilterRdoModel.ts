import moment from 'moment';
import { Offset } from '@nara.platform/accent';
import { FilterCondition } from './FilterCondition';
import { MyLearningContentType } from '../ui/model/MyLearningContentType';
import { MyContentType } from '../ui/model/MyContentType';

class MyTrainingFilterRdoModel {
  myTrainingState: MyContentType = MyLearningContentType.InProgress;
  collegeIds: string[] = [];
  difficultyLevels: string[] = [];
  learningTimes: string[] = [];
  organizers: string[] = [];
  required: string = '';
  certifications: string[] = [];
  startDate: string = '';
  endDate: string = '';
  applying: boolean = false;
  column: string = '';
  direction: string = '';
  offset: Offset = { offset: 0, limit: 20 };

  constructor(myTrainingFilterRdo?: MyTrainingFilterRdoModel) {
    if (myTrainingFilterRdo) {
      Object.assign(this, myTrainingFilterRdo);
    }
  }

  static create(contentType: MyContentType) {
    return new MyTrainingFilterRdoModel({
      myTrainingState: contentType
    } as MyTrainingFilterRdoModel);
  }

  static createForInProgressStorage() {
    return new MyTrainingFilterRdoModel({
      myTrainingState: MyLearningContentType.InProgress,
      offset: { offset: 0, limit: 9999 },
    } as MyTrainingFilterRdoModel);
  }

  static createForCompletedStorage() {
    return new MyTrainingFilterRdoModel({
      myTrainingState: MyLearningContentType.Completed,
      offset: { offset: 0, limit: 9999 },
    } as MyTrainingFilterRdoModel);
  }

  static createWithConditions(
    collegeIds: string[],
    difficultyLevels: string[],
    learningTimes: string[],
    organizers: string[],
    required: string,
    certifications: string[],
    startDate: string,
    endDate: string,
    applying: boolean
  ) {
    return new MyTrainingFilterRdoModel({
      collegeIds,
      difficultyLevels,
      learningTimes,
      organizers,
      required,
      certifications,
      startDate,
      endDate,
      applying,
    } as MyTrainingFilterRdoModel);
  }

  changeContentType(contentType: MyContentType) {
    this.myTrainingState = contentType;
  }

  changeColumnDirection(column: string, direction: string) {
    this.column = column;
    this.direction = direction;
  }

  changeConditions(conditions: FilterCondition) {
    this.collegeIds = conditions.collegeIds;
    this.difficultyLevels = conditions.difficultyLevels;
    this.learningTimes = conditions.learningTimes;
    this.organizers = conditions.organizers;
    this.certifications = conditions.certifications;
    this.startDate = conditions.startDate
      ? moment(conditions.startDate).format('YYYYMMDD')
      : '';
    this.endDate = conditions.endDate
      ? moment(conditions.endDate).format('YYYYMMDD')
      : '';
    this.required = conditions.required === 'none' ? '' : conditions.required;
    this.applying = conditions.applying === 'true' ? true : false;

    /* 수강가능 신청만 보기만! 클릭했을 경우, startDate & endDate 를 오늘로 설정. */
    if (this.applying && !this.startDate && !this.endDate) {
      const nowDate = moment(new Date()).format('YYYYMMDD');
      this.startDate = nowDate;
      this.endDate = nowDate;
    }
  }

  changeOffset(offset: Offset) {
    this.offset = offset;
  }

  setDefaultOffset() {
    this.offset = { offset: 0, limit: 20 };
  }

  getFilterCount() {
    const requiredCount = this.required && 1 || 0;
    const learningScheduleCount = this.startDate && this.endDate && 1 || 0;
    const applyingCount = this.applying && 1 || 0;

    return this.collegeIds.length +
      this.difficultyLevels.length +
      this.learningTimes.length +
      this.organizers.length +
      this.certifications.length +
      requiredCount + learningScheduleCount + applyingCount;
  }
}

export default MyTrainingFilterRdoModel;
