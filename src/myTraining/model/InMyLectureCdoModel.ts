import { decorate, observable } from 'mobx';
import { CategoryModel, IdName } from 'shared';
import { CubeType } from 'personalcube/personalcube';
import LectureServiceType from '../../lecture/shared/model/LectureServiceType';
import { CourseSetModel } from '../../course/model/CourseSetModel';



class InMyLectureCdoModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  category: CategoryModel = new CategoryModel();
  name: string = '';
  description: string = '';
  cubeType: CubeType | null = CubeType.None;
  learningTime: number = 0;
  stampCount: number = 0;
  coursePlanId: string = '';

  requiredSubsidiaries: IdName[] = [];
  cubeId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];

  reviewId: string = '';
  baseUrl: string = '';
  servicePatronKeyString: string = '';


  constructor(inMyLecture?: InMyLectureCdoModel) {
    //
    if (inMyLecture) {
      Object.assign(this, { ...inMyLecture });
    }
  }

}

decorate(InMyLectureCdoModel, {
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
  reviewId: observable,
  baseUrl: observable,
  servicePatronKeyString: observable,
});

export default InMyLectureCdoModel;
