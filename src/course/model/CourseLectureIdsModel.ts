import { decorate, observable } from 'mobx';

export class CourseLectureIdsModel {
  //
  serviceId: string = '';
  lectureCardIds: string[] = [];
  courseLectureIds: string[] = [];

}

decorate(CourseLectureIdsModel, {
  serviceId: observable,
  lectureCardIds: observable,
  courseLectureIds: observable,
});
