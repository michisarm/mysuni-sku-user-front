
import { decorate, observable } from 'mobx';
import { CategoryModel, IdName } from 'shared/model';
import { CubeType, PersonalCubeModel } from 'personalcube/personalcube/model';
import { CubeIntroModel } from 'personalcube/cubeintro/model';
import { CourseSetModel } from 'course/model';
import { LectureServiceType, LectureCardModel, LectureModel } from 'lecture/model';


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


  static fromLectureCard(personalCube: PersonalCubeModel, cubeIntro: CubeIntroModel, lectureCard: LectureCardModel) {
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

  static fromLecture(lecture: LectureModel) {
    //
    return new InMyLectureCdoModel({
      serviceId: lecture.serviceId,
      serviceType: lecture.serviceType,
      category: lecture.category,
      name: lecture.name,
      description: lecture.description,
      cubeType: lecture.cubeType,
      learningTime: lecture.learningTime,
      stampCount: lecture.stampCount,
      coursePlanId: lecture.coursePlanId,

      requiredSubsidiaries: lecture.requiredSubsidiaries,
      cubeId: lecture.cubeId,
      courseSetJson: lecture.courseSetJson,
      courseLectureUsids: lecture.courseLectureUsids,
      lectureCardUsids: lecture.lectureCardUsids,

      reviewId: lecture.reviewId,
      baseUrl: lecture.baseUrl,
      servicePatronKeyString: lecture.patronKey.keyString,
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
