/* eslint-disable consistent-return */
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
import { State } from '../../../viewModel/LectureState';
import {
  ItemMap,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
} from '../../../viewModel/LectureStructure';

async function getTestItem(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams,
  student?: Student
) {
  const routerParams = parseLectureParams(params, `${toPath(params)}/exam`);
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
        state = 'Progress';
        if (
          student !== undefined &&
          (student.learningState === 'Passed' ||
            student.learningState === 'TestPassed')
        ) {
          state = 'Completed';
        }
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
      can: false,
      order: 0,
    };
    return item;
  }
}

async function getSurveyItem(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams
) {
  const routerParams = parseLectureParams(params, `${toPath(params)}/survey`);
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
    if (answerSheet !== undefined) {
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
      can: false,
      order: 0,
    };
    return item;
  }
}

async function getReportItem(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams,
  student?: Student
): Promise<LectureStructureReportItem | void> {
  const routerParams = parseLectureParams(params, `${toPath(params)}/report`);
  if (
    coursePlanComplex.coursePlan.reportFileBox !== null &&
    coursePlanComplex.coursePlan.reportFileBox.reportName !== '' &&
    coursePlanComplex.coursePlan.reportFileBox.reportName !== null
  ) {
    let state: State = 'None';
    if (student !== undefined && student !== null) {
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
      can: false,
      order: 0,
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
  const testItem = await getTestItem(coursePlanComplex, params, student);
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
