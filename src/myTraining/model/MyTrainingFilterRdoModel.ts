import { Offset, DenizenKey, PatronType } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { MyContentType, ViewType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import { MyLearningContentType } from 'myTraining/ui/model';
import { FilterCondition } from 'myTraining/ui/view/filterbox/MultiFilterBox';

class MyTrainingFilterRdoModel {

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

  contentType: MyContentType = MyLearningContentType.InProgress; // 탭 전환될 때마다 전달되는 contentType

  /*
    MultiFilterBox 에서 선택되는 검색 조건들.
  */
  serviceType: string = ''; // Course || Card
  viewType: ViewType = '';  // 코스만보기 || 전체보기
  collegeIds: string[] = []; // 컬리지
  cubeTypes: string[] = []; // 교육유형
  difficultyLevels: string[] = []; // 난이도
  organizers: string[] = []; // 교육기관
  required: string = ''; // 핵인싸 ('선택안함' 또한 false 로 간주함.)

  // 기본생성자는 offset 및 denizenKey만 초기화 함.
  constructor(myTrainingFilterRdo?: MyTrainingFilterRdoModel) {
    if (myTrainingFilterRdo) {
      Object.assign(this, myTrainingFilterRdo);
    }
  }

  // offset, denizenKey, contentType 만을 검색 조건으로 함.
  static create(contentType: MyContentType, serviceType?: string) {
    if (serviceType) {
      return new MyTrainingFilterRdoModel({ contentType, serviceType } as MyTrainingFilterRdoModel);
    }
    return new MyTrainingFilterRdoModel({ contentType } as MyTrainingFilterRdoModel);
  }

  static createWithConditions(
    collegeIds: string[],
    cubeTypes: string[],
    difficultyLevels: string[],
    organizers: string[],
    required: string,
    serviceType: string
  ) {
    return new MyTrainingFilterRdoModel({
      collegeIds,
      cubeTypes,
      difficultyLevels,
      organizers,
      required,
      serviceType
    } as MyTrainingFilterRdoModel);
  }

  changeContentType(contentType: MyContentType) {
    this.contentType = contentType;
  }

  changeServiceType(serviceType: string) {
    this.serviceType = serviceType;
  }

  changeViewType(viewType: ViewType) {
    this.viewType = viewType;
  }

  changeConditions(conditions: FilterCondition) {
    this.setCubeTypeAndServiceType(conditions);
    this.collegeIds = conditions.collegeIds;
    this.difficultyLevels = conditions.difficultyLevels;
    this.organizers = conditions.organizers;
    this.required = conditions.required === 'none' ? '' : conditions.required;
  }

  changeOffset(offset: Offset) {
    this.offset = offset;
  }

  setDefaultOffset() {
    this.offset = { offset: 0, limit: 20 };
  }

  setCubeTypeAndServiceType(conditions: FilterCondition) {
    /*
      learningTypes 에 'Course' 가 포함될 경우,
      cubeTypes 에는 'Course'를 제외하며 ServiceType 에 'Course'를 바인딩함.
    */
    if (conditions.learningTypes.includes('Course')) {
      this.cubeTypes = conditions.learningTypes.filter(learningType => learningType !== 'Course');
      this.serviceType = 'Course';
    } else {
      this.cubeTypes = conditions.learningTypes;
      this.serviceType = conditions.serviceType;
    }
  }

  getFilterCount() {
    const requiredCount = this.required && 1 || 0;
    const serviceTypeCount = this.serviceType && 1 || 0;

    return this.collegeIds.length + this.cubeTypes.length + this.difficultyLevels.length + this.organizers.length + requiredCount + serviceTypeCount;
  }
}

export default MyTrainingFilterRdoModel;