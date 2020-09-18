import { Offset, DenizenKey, PatronType } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { MyLearningContentType } from 'myTraining/ui/model';

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

  contentType: MyLearningContentType = MyLearningContentType.InProgress; // 탭 전환될 때마다 전달되는 contentType

  /*
    MultiFilterBox 에서 선택되는 검색 조건들.
  */
  serviceType: string = ''; // CourseOnly / ViewAll
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
  static createWithContentType(contentType: MyLearningContentType) {
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

  changeContentType(contentType: MyLearningContentType) {
    this.contentType = contentType;
  }

  changeOffset(offset: Offset) {
    this.offset = offset;
  }

  changeServiceType(serviceType: string) {
    this.serviceType = serviceType;
  }

  getFilterCount() {
    const requiredCount = this.required && 1 || 0;

    return this.collegeIds.length + this.cubeTypes.length + this.difficultyLevels.length + this.organizers.length + requiredCount;
  }
}

export default MyTrainingFilterRdoModel;
