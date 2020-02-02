
import { decorate, observable } from 'mobx';
import { CategoryModel, IdName } from 'shared';
import { CubeType, PersonalCubeModel } from 'personalcube/personalcube';
import { CubeIntroModel } from 'personalcube/cubeintro';
import { CourseSetModel } from 'course/model/CourseSetModel';
import { LectureServiceType, LectureCardModel } from 'lecture/shared';


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


  static fromLecture(personalCube: PersonalCubeModel, cubeIntro: CubeIntroModel, lectureCard: LectureCardModel) {
    //
    return new InMyLectureCdoModel({
      serviceType: LectureServiceType.Card,
      serviceId: lectureCard.usid,
      category: personalCube.category,
      name: personalCube.name,
      description: cubeIntro.description.description,
      cubeType: personalCube.contents.type,
      learningTime: cubeIntro.learningTime,
      stampCount: 0,
      coursePlanId: '',
      requiredSubsidiaries: personalCube.requiredSubsidiaries,
      cubeId: personalCube.personalCubeId,
      courseSetJson: new CourseSetModel(),
      courseLectureUsids: [],
      lectureCardUsids: [],
      reviewId: lectureCard.reviewId,
      baseUrl: personalCube.iconBox.baseUrl,
      servicePatronKeyString: personalCube.patronKey.keyString,
    });
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
