/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { findExamination, findExamPaperForm } from '../../../api/examApi';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import { setLectureTestItem } from 'lecture/detail/store/LectureTestStore';
import {
  findCoursePlanContents,
  setCourseStudentExamId,
  studentInfoView,
} from 'lecture/detail/api/lectureApi';
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import CoursePlanComplex from 'lecture/detail/model/CoursePlanComplex';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

function getCoursePlanComplexByParams(
  params: LectureParams
): Promise<CoursePlanComplex> {
  const { coursePlanId, serviceId, contentId, lectureId } = params;
  if (contentId !== undefined && contentId !== null) {
    // Program의 Course(Course in Course)
    return findCoursePlanContents(contentId!, lectureId!);
  } else {
    return findCoursePlanContents(coursePlanId!, serviceId!); // Course
  }
}

async function getTestItem(examId: string) {
  if (examId !== '') {
    let examination = null;
    {
      const { result } = await findExamination(examId);
      examination = result;
    }

    let examPaperForm = null;
    let examTotalPoint = 0;
    {
      const { result } = await findExamPaperForm(examination.paperId);
      examPaperForm = result;
      examPaperForm.questions.map((result, index) => {
        examTotalPoint += result.allocatedPoint;
      });
    }

    const item: LectureTestItem = {
      id: examination.id,
      name: examination.examPaperTitle,
      questionCount: examination.questionCount,
      questions: examPaperForm.questions,
      successPoint: examination.successPoint,
      totalPoint: examTotalPoint,
    };
    return item;
  }
}

export async function getTestItemMapFromCourse(
  params: LectureParams
): Promise<LectureTestItem | undefined> {
  // void : return이 없는 경우 undefined
  const coursePlanComplex = await getCoursePlanComplexByParams(params);

  let courseLectureIds: string[] = [];
  let lectureCardIds: string[] = [];
  let serviceId = '';
  if (coursePlanComplex.coursePlanContents.courseSet.type === 'Card') {
    lectureCardIds = coursePlanComplex.courseLecture.lectureCardUsids;
    serviceId = coursePlanComplex.courseLecture.usid;
  } else if (
    coursePlanComplex.coursePlanContents.courseSet.type === 'Program'
  ) {
    courseLectureIds = coursePlanComplex.programLecture.courseLectureUsids;
    lectureCardIds = coursePlanComplex.programLecture.lectureCardUsids;
    serviceId = coursePlanComplex.programLecture.usid;
  }

  const studentInfo = await studentInfoView({
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds: [],
    serviceId,
  });

  let examId =
    studentInfo &&
    studentInfo.own &&
    studentInfo.own.studentScore &&
    studentInfo.own.studentScore.examId;

  if (examId === undefined || examId === null || examId === '') {
    // 랜덤 지정된 Test
    await setCourseStudentExamId(
      coursePlanComplex.coursePlan.coursePlanId!,
      studentInfo.own.id
    ).then(response => {
      examId = response.testId;
    });
  }

  if (examId !== undefined) {
    const testItem = await getTestItem(examId);
    if (testItem !== undefined) {
      setLectureTestItem(testItem);
    }
    return testItem;
  }

  return undefined;
}
