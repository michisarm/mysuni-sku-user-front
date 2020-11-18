/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { setLectureTestStudentItem } from 'lecture/detail/store/LectureTestStore';
import {
  findCoursePlanContents,
  findIsJsonStudentByCube,
  findStudent,
  studentInfoView,
} from 'lecture/detail/api/lectureApi';
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import CoursePlanComplex from 'lecture/detail/model/CoursePlanComplex';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

function getCoursePlanComplexByParams(
  params: LectureRouterParams
): Promise<CoursePlanComplex> {
  const { contentId, lectureId } = params;
  return findCoursePlanContents(contentId!, lectureId!);
}

export async function getTestStudentItemMapFromCourse(
  params: LectureRouterParams
): Promise<void> {
  // void : return이 없는 경우 undefined
  const coursePlanComplex = await getCoursePlanComplexByParams(params);
  if (coursePlanComplex.courseLecture.usid !== null) {
    const studentInfo = await studentInfoView({
      courseLectureIds: [],
      lectureCardIds: coursePlanComplex.courseLecture.lectureCardUsids,
      preLectureCardIds: [],
      serviceId: coursePlanComplex.courseLecture.usid,
    });

    if (studentInfo.own !== null) {
      setLectureTestStudentItem({
        studentId: studentInfo.own.id,
        serviceType: studentInfo.own.serviceType,
        learningState: studentInfo.own.learningState,
        studentScore: studentInfo.own.studentScore,
        examId: studentInfo.own.studentScore.examId,
        paperId: studentInfo.own.studentScore.paperId,
      });
    }
  }
}
