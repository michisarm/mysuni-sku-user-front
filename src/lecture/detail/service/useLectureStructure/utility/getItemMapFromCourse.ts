/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findAnswerSheet } from '../../../api/assistantApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
} from '../../../api/surveyApi';
import CoursePlanComplex from '../../../model/CoursePlanComplex';
import Student from '../../../model/Student';
import { parseLectureParams } from '../../../utility/lectureRouterParamsHelper';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import {
  ItemMap,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
  State,
} from '../../../viewModel/LectureStructure';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

interface GetItemMapArg {}

async function getTestItem(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams
) {
  const routerParams = parseLectureParams(params);
  // TODO
  // course는 Test가 복수개이기 때문에 examId를 course_plan_contents의 testId를 이용한 examination이 아니라 학습시작한 student의 student_score_json.examId의 examination를 사용해야한다.
  // student에서 examId가져오는 api 필요(student에 examId가 없으면 api 내에서 랜덤으로 course의 examId를 넣어줘야 함)
  const { examination } = coursePlanComplex;
  if (examination !== null) {
    let state: State = 'None';

    const denizenId = patronInfo.getDenizenId();
    if (denizenId !== undefined) {
      const findAnswerSheetData = await findAnswerSheet(
        examination.id,
        denizenId
      );
      if (findAnswerSheetData.result !== null) {
        if (findAnswerSheetData.result.submitted === true) {
          state = 'Completed';
        }
        state = 'Progress';
      }
    }

    const item: LectureStructureTestItem = {
      id: examination.id,
      name: examination.examPaperTitle,
      questionCount: examination.questionCount,
      params,
      routerParams,
      path: `${toPath(params)}/exam`,
      state,
      type: 'EXAM',
    };
    return item;
  }
}

async function getSurveyItem(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams
) {
  const routerParams = parseLectureParams(params);
  const { surveyCase } = coursePlanComplex;
  if (surveyCase !== null) {
    const { surveyFormId } = surveyCase;
    const { titles, questions } = await findSurveyForm(surveyFormId);
    let state: State = 'None';
    let title = '';
    if (
      titles !== null &&
      titles.defaultLanguage !== null &&
      titles.langStringMap[titles.defaultLanguage] !== undefined
    ) {
      title = titles.langStringMap[titles.defaultLanguage];
    }
    const answerSheet = await findAnswerSheetBySurveyCaseId(surveyCase.id);
    if (answerSheet !== null) {
      const { progress } = answerSheet;
      if (progress === 'Complete') {
        state = 'Completed';
      } else {
        state = 'Progress';
      }
    }
    const item: LectureStructureSurveyItem = {
      id: surveyFormId,
      name: title,
      questionCount: questions.length,
      params,
      routerParams,
      path: `${toPath(params)}/survey`,
      state,
      type: 'SURVEY',
    };
    return item;
  }
}

async function getReportItem(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams,
  student?: Student
): Promise<LectureStructureReportItem | void> {
  const routerParams = parseLectureParams(params);
  if (
    coursePlanComplex.coursePlan.reportFileBox !== null &&
    coursePlanComplex.coursePlan.reportFileBox.reportName !== ''
  ) {
    let state: State = 'None';
    if (student !== undefined) {
      if (
        student.homeworkContent !== null ||
        student.homeworkFileBoxId !== null
      ) {
        state = 'Progress';
      }
    }
    const item: LectureStructureReportItem = {
      name: coursePlanComplex.coursePlan.reportFileBox.reportName,
      params,
      routerParams,
      path: `${toPath(params)}/report`,
      state,
      type: 'REPORT',
    };
    return item;
  }
}

export async function getItemMapFromCourse(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams,
  student?: Student
): Promise<ItemMap> {
  const itemMap: ItemMap = {};
  const testItem = await getTestItem(coursePlanComplex, params);
  if (testItem !== undefined) {
    itemMap.test = testItem;
  }
  const surveyItem = await getSurveyItem(coursePlanComplex, params);
  if (surveyItem !== undefined) {
    itemMap.survey = surveyItem;
  }
  const reportItem = await getReportItem(coursePlanComplex, params, student);
  if (reportItem !== undefined) {
    itemMap.report = reportItem;
  }
  return itemMap;
}
