import CourseStudentView from './CourseStudentView';
import Student from './Student';

export default interface LectureStudentView {
  courses: CourseStudentView[];
  preCourses: Student[];
  lectures: Student[];
}
