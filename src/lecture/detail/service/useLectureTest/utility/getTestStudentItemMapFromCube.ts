/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { setLectureTestStudentItem } from 'lecture/detail/store/LectureTestStore';
import {
  findIsJsonStudentByCube,
  findStudent,
} from 'lecture/detail/api/lectureApi';
import LectureParams from 'lecture/detail/viewModel/LectureParams';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

export async function getTestStudentItemMapFromCube(
  params: LectureParams
): Promise<void> {
  // void : return이 없는 경우 undefined

  const studentJoins = await findIsJsonStudentByCube(params.lectureCardId!);
  if (studentJoins.length > 0 && studentJoins[0].studentId !== null) {
    const student = await findStudent(studentJoins[0].studentId);
    const learningState = studentJoins[0].learningState;
    const studentInfo = {
      studentId: studentJoins[0].studentId,
      serviceType: student.serviceType,
      learningState,
    };
    setLectureTestStudentItem(studentInfo);
  }
}
