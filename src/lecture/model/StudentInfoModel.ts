import { computed, decorate, observable } from 'mobx';
import StudentModel from './StudentModel';
import StudentCubeModel from './StudentCubeModel';
import StudentCourseModel from './StudentCourseModel';
import {CoursePlanModel} from '../../course/model';


class StudentInfoModel {
  //
  student: StudentModel | null = null;
  lecture: StudentCubeModel | null = null;
  course: StudentCourseModel | null = null;
  preCourses: StudentModel | null = null;

  //UI
  round: number = 0;

  constructor(studentInfo?: any) {
    //
    if (studentInfo) {
      //Object.assign(this, { ...studentInfo });
      //
      if (studentInfo.own) {
        // const info: StudentModel = JSON.parse(JSON.stringify(studentInfo.own));
        // this.student = JSON.parse(JSON.stringify(studentInfo.own));

        this.student = new StudentModel(studentInfo.own);
      }
      else {
        this.student = new StudentModel();
      }
      if (studentInfo.lectures) {
        // this.lecture = JSON.parse(JSON.stringify(studentInfo.lectures));
        // this.cube!.count = this.cube ? this.cube.cubes.length : 0;

        if (studentInfo.lectures.length > 0) {
          this.lecture = new StudentCubeModel();
          studentInfo.lectures.map((lecture: StudentModel) => {
            this.lecture!.lectures = this.lecture!.lectures.concat(new StudentModel(lecture));
          });
        }
      }
      else {
        this.lecture = new StudentCubeModel();
      }
      if (studentInfo.courses) {
        if (studentInfo.courses.length > 0) {
          this.course = new StudentCourseModel();
          studentInfo.courses.map((course: StudentCubeModel) => {
            this.course!.courses = this.course!.courses.concat(new StudentCubeModel(course));
          });
        }
      }
      else {
        this.course = new StudentCourseModel();
      }
      if (studentInfo.preCourseList) {
        if(studentInfo.preCourseList.length > 0) {
          this.preCourses = studentInfo.preCourseList;
        }
      }
    }
  }

  @computed
  get numberOfTrials() {
    return this.student?.studentScore.numberOfTrials || 0;
  }
}

decorate(StudentInfoModel, {
  student: observable,
  lecture: observable,
  course: observable,
});

export default StudentInfoModel;
