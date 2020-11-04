/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { findExamination, findExamPaperForm } from '../../../api/examApi';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import { setLectureTestItem } from 'lecture/detail/store/LectureTestStore';
import { findCoursePlanContents } from 'lecture/detail/api/lectureApi';
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
  const { coursePlanId, serviceId } = params;
  return findCoursePlanContents(coursePlanId!, serviceId!);
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
  // TODO
  // course는 Test가 복수개이기 때문에 examId를 course_plan_contents의 testId를 이용한 examination이 아니라 학습시작한 student의 student_score_json.examId의 examination를 사용해야한다.
  // student에서 examId가져오는 api 필요(student에 examId가 없으면 api 내에서 랜덤으로 course의 examId를 넣어줘야 함)
  const examId =
    coursePlanComplex &&
    coursePlanComplex.examination &&
    coursePlanComplex.examination.id;

  if (examId !== undefined) {
    const testItem = await getTestItem(examId);
    if (testItem !== undefined) {
      setLectureTestItem(testItem);
    }
    return testItem;
  }
  return undefined;
}
