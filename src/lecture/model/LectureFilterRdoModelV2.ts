import moment from 'moment';
import { Offset, DenizenKey, PatronType } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { FilterCondition } from '../../myTraining/model/FilterCondition';
import { MyLearningContentType } from '../../myTraining/ui/model/MyLearningContentType';
import { MyContentType } from '../../myTraining/ui/model/MyContentType';
import { CardRdo } from '../detail/model/CardRdo';

class LectureFilterRdoModelV2 {

  // default :: offset = 0 / limit = 20
  offset: Offset = {
    offset: 0,
    limit: 20
  };

  // student 정보를 조회하는 것은 denizenType 의 keyString을 기본적으로 사용함.
  denizenKey: DenizenKey = {
    keyString: patronInfo.getDenizenId() || '',
    patronType: PatronType.Denizen,
  };

  contentType: MyContentType = MyLearningContentType.Required; // 탭 전환될 때마다 전달되는 contentType

  collegeIds: string[] = []; // 컬리지
  difficultyLevels: string[] = []; // 난이도
  learningTimes: string[] = [];
  organizers: string[] = []; // 교육기관
  required: string = ''; // 핵인싸 ('선택안함' 또한 false 로 간주함.)
  certifications: string[] = [];
  startDate: string = '';
  endDate: string = '';
  applying: boolean = false;

  // 기본생성자는 offset 및 denizenKey만 초기화 함.
  constructor(lectureFilterRdo?: LectureFilterRdoModelV2) {
    if (lectureFilterRdo) {
      Object.assign(this, lectureFilterRdo);
    }
  }

  // offset, denizenKey, contentType 만을 검색 조건으로 함.
  static create(contentType: MyContentType) {
    return new LectureFilterRdoModelV2({ contentType } as LectureFilterRdoModelV2);
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
    return new LectureFilterRdoModelV2({
      collegeIds,
      difficultyLevels,
      learningTimes,
      organizers,
      required,
      certifications,
      startDate,
      endDate,
      applying
    } as LectureFilterRdoModelV2);
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
    return {
      collegeIds: this.collegeIds.join(','),
      difficultyLevels: this.difficultyLevels.join(','),
      learningTimeRanges: this.learningTimes.join(','),
      required: true,
      limit: this.offset.limit,
      offset: this.offset.offset,
      searchable: true,
    };
  }
}

export default LectureFilterRdoModelV2;
