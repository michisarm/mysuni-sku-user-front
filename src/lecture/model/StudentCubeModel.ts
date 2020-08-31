import StudentScoreModel from './StudentScoreModel';
import JoinRequestModel from './JoinRequestModel';
import StudentModel from './StudentModel';


class StudentCubeModel {
  //
  course_lecture_id: string = '';
  lectures: StudentModel[] = [];
  student: StudentModel = new StudentModel();
  count: number = 0;

  constructor(studentCube?: StudentCubeModel) {
    //
    if (studentCube && studentCube.lectures.length > 0) {
      Object.assign(this, { ...studentCube });
      //
      studentCube.lectures.map((cube: StudentModel) => {
        cube.studentScore = cube.studentScore && new StudentScoreModel(cube.studentScore) || cube.studentScore;
        cube.joinRequests = cube.joinRequests && cube.joinRequests.length
          && cube.joinRequests.map(request => new JoinRequestModel(request)) || cube.joinRequests;
      });
    }
  }
}

export default StudentCubeModel;
