/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findAnswerSheet } from '../../../api/assistantApi';
import { findCoursePlan } from '../../../api/courseApi';
import { findCoursePlanContents } from '../../../api/lectureApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
} from '../../../api/surveyApi';
import LectureView from '../../../model/LectureView';
import Student from '../../../model/Student';
import { parseLectureParams } from '../../../utility/lectureRouterParamsHelper';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import { State } from '../../../viewModel/LectureState';
import {
  ItemMap,
  LectureStructureDiscussionItem,
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

async function getTestItem(lectureView: LectureView, params: LectureParams) {
  const routerParams = parseLectureParams(params, `${toPath(params)}/exam`);
  const { examination } = lectureView;
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

async function getSurveyItem(lectureView: LectureView, params: LectureParams) {
  const routerParams = parseLectureParams(params, `${toPath(params)}/survey`);
  const { surveyCase } = lectureView;
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
  lectureView: LectureView,
  params: LectureParams,
  student?: Student
): Promise<LectureStructureReportItem | void> {
  const routerParams = parseLectureParams(params, `${toPath(params)}/report`);
  const coursePlan = await findCoursePlan(lectureView.coursePlanId);
  if (coursePlan.reportFileBox.reportName !== '') {
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
      name: coursePlan.reportFileBox.reportName,
      params,
      routerParams,
      path: `${toPath(params)}/report`,
      state,
      type: 'REPORT',
    };
    return item;
  }
}

async function getDisscussionItem(
  lectureView: LectureView,
  params: LectureParams
): Promise<LectureStructureDiscussionItem | void> {
  const routerParams = parseLectureParams(
    params,
    `${toPath(params)}/discussion`
  );
  const coursePlanComplex = await findCoursePlanContents(
    lectureView.coursePlanId,
    lectureView.serviceId
  );
  if (
    coursePlanComplex !== null &&
    (coursePlanComplex as unknown) !== '' &&
    coursePlanComplex.coursePlanContents.courseSet.learningCardSet !==
    undefined &&
    coursePlanComplex.coursePlanContents.courseSet.learningCardSet !== null &&
    coursePlanComplex.coursePlanContents.courseSet.learningCardSet
      .discussions !== undefined &&
    coursePlanComplex.coursePlanContents.courseSet.learningCardSet
      .discussions !== null &&
    coursePlanComplex.coursePlanContents.courseSet.learningCardSet.discussions
      .length > 0
  ) {
    const state: State = 'None';
    const item: LectureStructureDiscussionItem = {
      id:
        coursePlanComplex.coursePlanContents.courseSet.learningCardSet
          .discussions[0].id,
      name:
        coursePlanComplex.coursePlanContents.courseSet.learningCardSet
          .discussions[0].name,
      time: coursePlanComplex.coursePlan.time,
      creator: coursePlanComplex.coursePlan.creator.name,
      creatorAudienceId: coursePlanComplex.coursePlan.patronKey.keyString,
      params,
      routerParams,
      path: `${toPath(params)}/discussion`,
      state,
      type: 'DISCUSSION',
    };
    return item;
  }
  if (
    coursePlanComplex !== null &&
    (coursePlanComplex as unknown) !== '' &&
    coursePlanComplex.coursePlanContents !== undefined &&
    coursePlanComplex.coursePlanContents !== null &&
    coursePlanComplex.coursePlanContents.courseSet.programSet !== undefined &&
    coursePlanComplex.coursePlanContents.courseSet.programSet !== null &&
    coursePlanComplex.coursePlanContents.courseSet.programSet.discussions !==
    undefined &&
    coursePlanComplex.coursePlanContents.courseSet.programSet.discussions !==
    null &&
    coursePlanComplex.coursePlanContents.courseSet.programSet.discussions
      .length > 0
  ) {
    const state: State = 'None';
    const item: LectureStructureDiscussionItem = {
      id:
        coursePlanComplex.coursePlanContents.courseSet.programSet.discussions[0]
          .id,
      name:
        coursePlanComplex.coursePlanContents.courseSet.programSet.discussions[0]
          .name,
      time: coursePlanComplex.coursePlan.time,
      creator: coursePlanComplex.coursePlan.creator.name,
      creatorAudienceId: coursePlanComplex.coursePlan.patronKey.keyString,
      params,
      routerParams,
      path: `${toPath(params)}/discussion`,
      state,
      type: 'DISCUSSION',
    };
    return item;
  }
}

export async function getItemMapFromLecture(
  lectureView: LectureView,
  params: LectureParams,
  student?: Student
): Promise<ItemMap> {
  const itemMap: ItemMap = {};
  const testItem = await getTestItem(lectureView, params);
  if (testItem !== undefined) {
    itemMap.test = testItem;
  }
  const surveyItem = await getSurveyItem(lectureView, params);
  if (surveyItem !== undefined) {
    itemMap.survey = surveyItem;
  }
  const reportItem = await getReportItem(lectureView, params, student);
  if (reportItem !== undefined) {
    itemMap.report = reportItem;
  }
  const discussionItem = await getDisscussionItem(lectureView, params);
  if (discussionItem !== undefined) {
    itemMap.discussion = discussionItem;
  }
  return itemMap;
}
