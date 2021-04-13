import moment from 'moment';
import { Offset } from '@nara.platform/accent';
import { FilterCondition } from './FilterCondition';

class InMyLectureFilterRdoModel {
  learningTypes: string[] = [];
  collegeIds: string[] = [];
  difficultyLevels: string[] = [];
  learningTimes: string[] = [];
  organizers: string[] = [];
  required: string = '';
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

  setByConditions(conditions: FilterCondition) {
    this.learningTypes = conditions.learningTypes;
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

  setOffset(offset: Offset) {
    this.offset = offset;
  }

  setDefaultOffset() {
    this.offset = { offset: 0, limit: 20 };
  }
}

export default InMyLectureFilterRdoModel;
