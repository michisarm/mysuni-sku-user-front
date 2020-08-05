import { decorate, observable } from 'mobx';

export class CourseLectureIdsModel {
  //
  serviceId: string = '';
  lectureCardIds: string[] = [];
  courseLectureIds: string[] = [];
  preLectureCardIds: string[] = [];

}

decorate(CourseLectureIdsModel, {
  serviceId: observable,
  lectureCardIds: observable,
  courseLectureIds: observable,
  preLectureCardIds: observable,
});
