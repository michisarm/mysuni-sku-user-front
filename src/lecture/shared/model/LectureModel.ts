import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';
import { CategoryModel, CourseOpenModel, DramaEntityObservableModel, IdName } from 'shared';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube';

import RoleBookModel from './RoleBookModel';
import LectureServiceType from './LectureServiceType';
import { CourseSetModel } from '../../../course/model/CourseSetModel';
import { CourseSetType } from '../../../course/model/CourseSetType';


class LectureModel extends DramaEntityObservableModel {
  //
  serviceId: string = '';
  serviceType: LectureServiceType = LectureServiceType.Card;
  coursePlanId: string = '';
  cubeId: string = '';
  reviewFeedbackId: string = '';
  commentFeedbackId: string = '';

  name: string = '';
  cubeType: CubeType = CubeType.None;
  category: CategoryModel = new CategoryModel();
  courseOpen: CourseOpenModel = new CourseOpenModel();
  description: string = '';
  learningTime: number = 0;
  stampCount: number = 0;
  time: number = 0;

  requiredSubsidiaries: IdName[] = [];
  courseSetJson: CourseSetModel = new CourseSetModel();
  roleBooks: RoleBookModel[] = [];

  // UI only
  required: boolean = false;
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;


  constructor(lecture?: LectureModel) {
    //
    super();

    if (lecture) {
      Object.assign(this, { ...lecture });

      this.serviceType = LectureModel.getServiceType(lecture);
      this.category = new CategoryModel(lecture.category);

      // Ui Model
      const cineroom = tenantInfo.getCineroom() as any;
      this.required = cineroom && lecture.requiredSubsidiaries
        && lecture.requiredSubsidiaries.some((subsidiary) => subsidiary.name === cineroom.name);

      this.cubeTypeName = LectureModel.getCubeTypeName(lecture.cubeType, this.serviceType);
    }
  }

  static getServiceType(lecture: LectureModel) {
    //
    // Todo: Program, Course 조건 API 수정되면 serviceType으로 변경해야 함.
    if (lecture.courseSetJson && lecture.courseSetJson.type === CourseSetType.Program) {
      return LectureServiceType.Program;
    }
    else if (lecture.courseSetJson) {
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

decorate(LectureModel, {
  serviceType: observable,
  serviceId: observable,
  requiredSubsidiaries: observable,
  courseOpen: observable,
  category: observable,
  name: observable,
  cubeType: observable,
  learningTime: observable,
  roleBooks: observable,
  reviewFeedbackId: observable,
  time: observable,
});

export default LectureModel;
