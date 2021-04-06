import Student from '../../model/Student';
import CourseStudentView from './CourseStudentView';

export default interface LectureStudentView {
  courses: CourseStudentView[];
  preCourses: Student[];
  lectures: Student[];
  own: Student;
}
