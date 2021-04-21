/* eslint-disable consistent-return */
import { setLectureTestStudentItem } from 'lecture/detail/store/LectureTestStore';
import LectureParams from '../../../viewModel/LectureParams';
import {
  findByCardId,
  findMyCardRelatedStudentsCache,
} from '../../../api/cardApi';
import { LectureTestStudentItem } from '../../../viewModel/LectureTest';
import Student from '../../../../model/Student';

export async function getTestStudentItemMapFromCourse(
  params: LectureParams
): Promise<void> {
  setLectureTestStudentItem();
  const student = await findByCardId(params.cardId);
  if (student === undefined) {
    return;
  }
  const lectureTestStudentItem: LectureTestStudentItem = {
    studentId: student.id,
    serviceType: 'Card',
    learningState: student.learningState,
    studentScore: student.studentScore,
    examId: student.studentScore.examId,
    paperId: student.studentScore.paperId,
  };
  setLectureTestStudentItem(lectureTestStudentItem);
}

export async function getTestStudentItemMapFromCube(
  params: LectureParams
): Promise<void> {
  setLectureTestStudentItem();
  if (params.cubeId === undefined) {
    return;
  }
  const students = await findMyCardRelatedStudentsCache(params.cardId);
  if (students === undefined) {
    return;
  }
  let student: Student | undefined;
  students.cubeStudents?.forEach(cubeStudent => {
    if (cubeStudent.lectureId === params.cubeId) {
      student = cubeStudent;
    }
  });
  if (student === undefined) {
    return;
  }
  const lectureTestStudentItem: LectureTestStudentItem = {
    studentId: student.id,
    serviceType: 'Cube',
    learningState: student.learningState,
    studentScore: student.studentScore,
    examId: student.studentScore.examId,
    paperId: student.studentScore.paperId,
  };
  setLectureTestStudentItem(lectureTestStudentItem);
}
