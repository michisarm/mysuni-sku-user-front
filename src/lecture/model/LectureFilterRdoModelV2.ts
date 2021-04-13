import { includes } from 'lodash';
import moment from 'moment';
import { Offset } from '@nara.platform/accent';
import { FilterCondition } from '../../myTraining/model/FilterCondition';
import { MyLearningContentType } from '../../myTraining/ui/model/MyLearningContentType';
import { MyContentType } from '../../myTraining/ui/model/MyContentType';
import { CardRdo } from '../detail/model/CardRdo';

class LectureFilterRdoModelV2 {

  offset: Offset = {
    offset: 0,
    limit: 20
  };

  contentType: MyContentType = MyLearningContentType.Required;
  collegeIds: string[] = [];
  difficultyLevels: string[] = [];
  learningTimes: string[] = [];
  organizers: string[] = [];
  required: string = '';
  certifications: string[] = [];
  startDate: string = '';
  endDate: string = '';
  applying: boolean = false;

  constructor(lectureFilterRdo?: LectureFilterRdoModelV2) {
    if (lectureFilterRdo) {
      Object.assign(this, lectureFilterRdo);
    }
  }

  static create(contentType: MyContentType) {
    return new LectureFilterRdoModelV2({ contentType } as LectureFilterRdoModelV2);
  }

  changeContentType(contentType: MyContentType) {
    this.contentType = contentType;
  }

  setByConditions(conditions: FilterCondition) {
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

  toCardRdo(): CardRdo {
    const hasStamp = includes(this.certifications, 'stamp') || undefined;
    const hasBadge = includes(this.certifications, 'badge') || undefined;
    const startLearningDate = this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '';
    const endLearningDate = this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '';

    return {
      collegeIds: this.collegeIds.join(','),
      difficultyLevels: this.difficultyLevels.join(','),
      learningTimeRanges: this.learningTimes.join(','),
      required: true,
      hasStamp,
      hasBadge,
      limit: this.offset.limit,
      offset: this.offset.offset,
      searchable: true,
      startLearningDate,
      endLearningDate,
    };
  }
}

export default LectureFilterRdoModelV2;
