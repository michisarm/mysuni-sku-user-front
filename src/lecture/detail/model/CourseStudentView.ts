import Student from '../../model/Student';

export default interface CourseStudentView {
  courseLectureId: string;
  student: Student;
  lectures: Student[];
}
