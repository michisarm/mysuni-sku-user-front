import { decorate, observable } from 'mobx';
import { getCookie } from '@nara.platform/accent';
import { CategoryModel, DramaEntityObservableModel, IdName } from 'shared';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube';
import LectureServiceType from '../../lecture/shared/model/LectureServiceType';
import { CourseSetModel } from '../../course/model/CourseSetModel';


class InMyLectureModel extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  category: CategoryModel = new CategoryModel();
  name: string = '';
  description: string = '';
  cubeType: CubeType = CubeType.None;
  learningTime: number = 0;
  stampCount: number = 0;
  coursePlanId: string = '';

  requiredSubsidiaries: IdName[] = [];
  cubeId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];

  reviewId: string = '';
  time: number = 0;


  // UI only
  required: boolean = false;
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;


  constructor(inMyLecture?: InMyLectureModel) {
    //
    super();

    if (inMyLecture) {
      Object.assign(this, { ...inMyLecture });

      this.category = new CategoryModel(inMyLecture.category);

      // UI Model
      const companyCode = getCookie('companyCode');
      this.required = inMyLecture.requiredSubsidiaries
        && inMyLecture.requiredSubsidiaries.some((subsidiary) => subsidiary.id === companyCode);

      this.cubeTypeName = InMyLectureModel.getCubeTypeName(inMyLecture.cubeType, this.serviceType);
    }
  }

  static getServiceType(inMyLecture: InMyLectureModel) {
    //
    const serviceType = inMyLecture.serviceType as string;

    if (serviceType === 'PROGRAM') {
      return LectureServiceType.Program;
    }
    else if (serviceType === 'COURSE') {
      return LectureServiceType.Course;
    }
    else {
      return LectureServiceType.Card;
    }
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureServiceType) {
    //
    console.log(serviceType);
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

decorate(InMyLectureModel, {
  serviceType: observable,
  serviceId: observable,
  category: observable,
  name: observable,
  description: observable,
  cubeType: observable,
  learningTime: observable,
  stampCount: observable,
  coursePlanId: observable,
  requiredSubsidiaries: observable,
  cubeId: observable,
  courseSetJson: observable,
  courseLectureUsids: observable,
  lectureCardUsids: observable,
  time: observable,
  required: observable,
  cubeTypeName: observable,
  reviewId: observable,
});

export default InMyLectureModel;
