import Student from './Student';

export default interface CourseStudentView {
  courseLectureId: string;
  student: Student;
  lectures: Student[];
}
