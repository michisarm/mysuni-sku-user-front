import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';
import { CategoryModel, CourseOpenModel, DramaEntityObservableModel, IdName } from 'shared';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube';

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
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;
  description: string = '';


  constructor(lecture?: LectureModel) {
    //
    super();

    if (lecture) {
      Object.assign(this, { ...lecture });

      this.serviceType = LectureModel.getServiceType(lecture.serviceType);
      const cineroom = tenantInfo.getCineroom() as any;
      this.required = cineroom && lecture.requiredSubsidiaries.some((subsidiary) => subsidiary.name === cineroom.name);
      this.cubeTypeName = CubeTypeNameType[CubeType[lecture.cubeType]];
      // Todo: description
      this.description = 'Description';
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
