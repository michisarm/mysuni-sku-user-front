import { decorate, observable } from 'mobx';
import { CategoryModel, DatePeriod, DramaEntityObservableModel } from 'shared';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube';
import LectureServiceType from './LectureServiceType';


class LectureViewModel extends DramaEntityObservableModel {
  //
  serviceId: string = '';
  serviceType: LectureServiceType = LectureServiceType.Program;
  coursePlanId: string = '';
  cubeId: string = '';

  name: string = '';
  cubeType: CubeType = CubeType.None;
  category: CategoryModel = new CategoryModel();
  creationDate: number = 0;
  learningPeriod: DatePeriod = new DatePeriod();
  lectureCardUsids: string[] = [];

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
    const serviceType = lectureView.serviceType as string;

    if (serviceType === 'COURSE') {
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
  lectureCardUsids: observable,
});

export default LectureViewModel;
