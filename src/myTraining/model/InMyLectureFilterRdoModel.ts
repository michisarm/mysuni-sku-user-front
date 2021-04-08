import moment from 'moment';
import { Offset } from '@nara.platform/accent';
import { FilterCondition } from './FilterCondition';

class InMyLectureFilterRdoModel {
  collegeIds: string[] = []; // 컬리지
  difficultyLevels: string[] = []; // 난이도
  learningTimes: string[] = [];
  organizers: string[] = []; // 교육기관
  required: string = ''; // 핵인싸 ('선택안함' 또한 false 로 간주함.)
  certifications: string[] = [];
  startDate: string = '';
  endDate: string = '';
  applying: boolean = false;
  offset: Offset = { offset: 0, limit: 20 };

  constructor(inMyLectureFilterRdo?: InMyLectureFilterRdoModel) {
    if (inMyLectureFilterRdo) {
      Object.assign(this, inMyLectureFilterRdo);
    }
  }

  static create() {
    return new InMyLectureFilterRdoModel();
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
    return new InMyLectureFilterRdoModel({
      collegeIds,
      difficultyLevels,
      learningTimes,
      organizers,
      required,
      certifications,
      startDate,
      endDate,
      applying
    } as InMyLectureFilterRdoModel);
  }

  changeConditions(conditions: FilterCondition) {
    this.collegeIds = conditions.collegeIds;
    this.difficultyLevels = conditions.difficultyLevels;
    this.learningTimes = conditions.learningTimes;
    this.organizers = conditions.organizers;
    this.required = conditions.required === 'none' ? '' : conditions.required;
    this.certifications = conditions.certifications;
    this.startDate = conditions.startDate ? moment(conditions.startDate).format('YYYYMMDD') : '';
    this.endDate = conditions.endDate ? moment(conditions.endDate).format('YYYYMMDD') : '';
    this.applying = conditions.applying === 'true' ? true : false;
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

export default InMyLectureFilterRdoModel;
