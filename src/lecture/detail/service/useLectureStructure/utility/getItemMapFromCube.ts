/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findAnswerSheet } from '../../../api/assistantApi';
import { findExamination } from '../../../api/examApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
} from '../../../api/surveyApi';
import CubeIntro from '../../../model/CubeIntro';
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

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

function isEmpty(text: string) {
  return text !== null && text !== ""
}

interface GetItemMapArg {
  cubeIntro: CubeIntro;
  examId: string;
  surveyId: string;
  surveyCaseId: string;
}

async function getTestItem(
  examId: string,
  params: LectureParams,
  student?: Student
) {
  const routerParams = parseLectureParams(params, `${toPath(params)}/exam`);

  if (examId !== '') {
    const { result } = await findExamination(examId);
    let state: State = 'None';

    const denizenId = patronInfo.getDenizenId();
    if (denizenId !== undefined) {
      const findAnswerSheetData = await findAnswerSheet(examId, denizenId);
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
      id: result.id,
      name: result.examPaperTitle,
      questionCount: result.questionCount,
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
  surveyId: string,
  surveyCaseId: string,
  params: LectureParams
) {
  const routerParams = parseLectureParams(params, `${toPath(params)}/survey`);
  if (surveyId !== '') {
    const { titles, questions } = await findSurveyForm(surveyId);
    if (titles !== undefined && questions !== undefined) {
      let state: State = 'None';
      let title = '';
      if (
        titles !== null &&
        titles.defaultLanguage !== null &&
        titles.langStringMap[titles.defaultLanguage] !== undefined
      ) {
        title = titles.langStringMap[titles.defaultLanguage];
      }
      const answerSheet = await findAnswerSheetBySurveyCaseId(surveyCaseId);
      if (answerSheet !== undefined) {
        const { progress } = answerSheet;
        if (progress === 'Complete') {
          state = 'Completed';
        } else {
          state = 'Progress';
        }
      }
      const item: LectureStructureSurveyItem = {
        id: surveyId,
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
}

async function getReportItem(
  cubeIntro: CubeIntro,
  params: LectureParams,
  student?: Student
): Promise<LectureStructureReportItem | void> {
  const routerParams = parseLectureParams(params, `${toPath(params)}/report`);
  if (
    cubeIntro.reportFileBox !== null &&
    (!isEmpty(cubeIntro.reportFileBox.reportName) ||
      !isEmpty(cubeIntro.reportFileBox.reportQuestion) ||
      !isEmpty(cubeIntro.reportFileBox.fileBoxId))
  ) {
    let state: State = 'None';
    if (student !== undefined) {
      if (
        student.homeworkContent !== null ||
        student.homeworkFileBoxId !== null
      ) {
        state = 'Progress';
      }
      if (student.learningState === 'Passed') {
        state = 'Completed'
      }
    }
    const item: LectureStructureReportItem = {
      name: cubeIntro.reportFileBox.reportName,
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

export async function getItemMapFromCube(
  arg: GetItemMapArg,
  params: LectureParams,
  student?: Student
): Promise<ItemMap> {
  const itemMap: ItemMap = {};
  const { cubeIntro, examId, surveyId, surveyCaseId } = arg;
  const testItem = await getTestItem(examId, params, student);
  if (testItem !== undefined) {
    itemMap.test = testItem;
  }
  const surveyItem = await getSurveyItem(surveyId, surveyCaseId, params);
  if (surveyItem !== undefined) {
    itemMap.survey = surveyItem;
  }
  const reportItem = await getReportItem(cubeIntro, params, student);
  if (reportItem !== undefined) {
    itemMap.report = reportItem;
  }
  return itemMap;
}
