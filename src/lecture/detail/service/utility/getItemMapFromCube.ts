/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findAnswerSheet } from '../../api/assistantApi';
import { findExamination, findExamPaperForm } from '../../api/examApi';
import { findCubeIntro } from '../../api/mPersonalCubeApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
} from '../../api/surveyApi';
import Student from '../../model/Student';
import {
  ItemMap,
  LectureStructureCubeItemParams,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
  State,
} from '../../viewModel/LectureStructure';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

interface GetItemMapArg {
  cubeIntroId: string;
  examId: string;
  surveyId: string;
  surveyCaseId: string;
}

async function getTestItem(
  examId: string,
  params: LectureStructureCubeItemParams
) {
  if (examId !== '') {
    const { result } = await findExamination(examId);
    let state: State = 'None';

    if (result.paperId !== null) {
      const { examPaperForm } = await findExamPaperForm(result.paperId);
      console.log(examPaperForm); // undefined..
    }

    const denizenId = patronInfo.getDenizenId();
    if (denizenId !== undefined) {
      const findAnswerSheetData = await findAnswerSheet(
        result.paperId,
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
      id: result.id,
      name: result.examPaperTitle,
      questionCount: result.questionCount,
      params,
      state,
      type: 'EXAM',
    };
    return item;
  }
}

async function getSurveyItem(
  surveyId: string,
  surveyCaseId: string,
  params: LectureStructureCubeItemParams
) {
  if (surveyId !== '') {
    const { titles, questions } = await findSurveyForm(surveyId);
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
    if (answerSheet !== null) {
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
      state,
      type: 'SURVEY',
    };
    return item;
  }
}

async function getReportItem(
  cubeIntroId: string,
  params: LectureStructureCubeItemParams,
  student?: Student
): Promise<LectureStructureReportItem | void> {
  const cubeIntro = await findCubeIntro(cubeIntroId);
  if (cubeIntro.reportFileBox.reportName !== '') {
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
      name: cubeIntro.reportFileBox.reportName,
      params,
      state,
      type: 'REPORT',
    };
    return item;
  }
}

export async function getItemMapFromCube(
  arg: GetItemMapArg,
  params: LectureStructureCubeItemParams,
  student?: Student
): Promise<ItemMap> {
  const itemMap: ItemMap = {};
  const { cubeIntroId, examId, surveyId, surveyCaseId } = arg;
  const testItem = await getTestItem(examId, params);
  if (testItem !== undefined) {
    itemMap.test = testItem;
  }
  const surveyItem = await getSurveyItem(surveyId, surveyCaseId, params);
  if (surveyItem !== undefined) {
    itemMap.survey = surveyItem;
  }
  const reportItem = await getReportItem(cubeIntroId, params, student);
  if (reportItem !== undefined) {
    itemMap.report = reportItem;
  }
  return itemMap;
}
