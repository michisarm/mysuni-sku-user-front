class LectureStudentRdoModel {
  //
  serviceId: string = '';
  lectureCardIds: string[] = [];
  courseLectureIds: string[] = [];
  preLectureCardIds: string[] = [];

  constructor(lectureStudentRdo?: LectureStudentRdoModel) {
    //
    if(lectureStudentRdo) {
      Object.assign(this, lectureStudentRdo);
    }
  }
}

export default LectureStudentRdoModel;