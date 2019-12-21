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
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  requiredSubsidiaries: IdName[] = [];
  courseOpen: CourseOpenModel = new CourseOpenModel();
  category: CategoryModel = new CategoryModel();
  name: string = '';
  cubeType: CubeType = CubeType.None;
  cubeId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  learningTime: number = 0;
  roleBooks: RoleBookModel[] = [];
  reviewFeedbackId: string = '';
  description: string = '';
  stampCount: number = 0;
  time: number = 0;

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

      if (this.serviceType === LectureServiceType.Program) {
        this.cubeTypeName = CubeTypeNameType.Course;
      }
      else {
        this.cubeTypeName = CubeTypeNameType[CubeType[lecture.cubeType]];
      }
    }
  }

  static getServiceType(lecture: LectureModel) {
    //
    if (lecture.courseSetJson && lecture.courseSetJson.type === CourseSetType.Program) {
      return LectureServiceType.Program;
    }
    else {
      return LectureServiceType.Card;
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
