import { decorate, observable } from 'mobx';
// import { tenantInfo } from '@nara.platform/dock';
import { CategoryModel, CourseOpenModel, DramaEntityObservableModel, IdName } from 'shared';
import { CubeType } from 'personalcube/personalcube';

import RoleBookModel from './RoleBookModel';
import LectureServiceType from './LectureServiceType';


class LectureModel extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  requiredSubsidiaries: IdName[] = [];
  courseOpen: CourseOpenModel = new CourseOpenModel();
  category: CategoryModel = new CategoryModel();
  name: string = '';
  cubeType: CubeType = CubeType.None;
  learningTime: number = 0;
  roleBooks: RoleBookModel[] = [];
  reviewFeedbackId: string = '';
  time: number = 0;

  required: boolean = false;
  description: string = '';


  constructor(lecture?: LectureModel) {
    //
    super();

    if (lecture) {
      Object.assign(this, { ...lecture });
      // Todo: required, description
      this.required = lecture.requiredSubsidiaries.length > 0;
      this.description = 'Description';
      this.serviceType = LectureModel.getServiceType(lecture.serviceType);
    }
  }

  static getServiceType(serviceType: LectureServiceType) {
    //
    switch (serviceType) {
      case LectureServiceType.Card:
        return LectureServiceType.Card;
    }
    return LectureServiceType.Card;
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
