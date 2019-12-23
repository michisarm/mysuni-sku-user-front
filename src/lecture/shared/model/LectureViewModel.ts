
import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel, CategoryModel, DatePeriod } from 'shared';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube';
import LectureServiceType from './LectureServiceType';


class LectureViewModel extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Program;
  name: string = '';
  cubeType: CubeType = CubeType.None;
  category: CategoryModel = new CategoryModel();
  creationDate: number = 0;
  learningPeriod: DatePeriod = new DatePeriod();
  lectureCards: string[] = [];

  // UI only
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;

  constructor(lectureView?: LectureViewModel) {
    //
    super();

    if (lectureView) {
      Object.assign(this, lectureView);

      this.serviceType = LectureViewModel.getServiceType(lectureView);
      this.category = new CategoryModel(lectureView.category);
      this.cubeTypeName = LectureViewModel.getCubeTypeName(lectureView.cubeType, this.serviceType);
    }
  }

  static getServiceType(lectureView: LectureViewModel) {
    //
    // Todo: Program, Course 조건 API 수정되면 serviceType으로 변경해야 함.
    if (lectureView.lectureCards && lectureView.lectureCards.length > 0) {
      return LectureServiceType.Course;
    }
    else {
      return LectureServiceType.Card;
    }
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureServiceType) {
    //
    if (serviceType === LectureServiceType.Program) {
      return CubeTypeNameType.Program;
    }
    else if (serviceType === LectureServiceType.Course) {
      return CubeTypeNameType.Course;
    }
    else {
      return CubeTypeNameType[CubeType[cubeType]];
    }
  }
}

decorate(LectureViewModel, {
  serviceType: observable,
  name: observable,
  cubeType: observable,
  category: observable,
  creationDate: observable,
  learningPeriod: observable,
  lectureCards: observable,
});

export default LectureViewModel;
