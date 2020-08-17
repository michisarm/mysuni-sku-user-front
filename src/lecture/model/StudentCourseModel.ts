import { decorate, observable } from 'mobx';
import StudentScoreModel from './StudentScoreModel';
import JoinRequestModel from './JoinRequestModel';
import StudentCubeModel from './StudentCubeModel';
import StudentModel from './StudentModel';


class StudentCourseModel {
  //
  courses: StudentCubeModel[] = [];
  // count : number = 0;

  constructor(courses?: StudentCourseModel) {
    //
    if (courses) {
      Object.assign(this, { ...courses });
      //
      this.courses.map((course: StudentCubeModel) => {
        course.lectures.map((cube: StudentModel) => {
          cube.studentScore = cube.studentScore && new StudentScoreModel(cube.studentScore) || cube.studentScore;
          cube.joinRequests = cube.joinRequests && cube.joinRequests.length
            && cube.joinRequests.map(request => new JoinRequestModel(request)) || cube.joinRequests;
        });
      });
    }
  }
}

export default StudentCourseModel;
