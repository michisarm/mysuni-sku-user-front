/* eslint-disable consistent-return */

/**
 * 
 export interface LectureStructureCubeItem extends Item {
  id: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  url: LectureStructureCubeItemUrl;
  learningState?: LearningState;
  state?: State;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
}
 */

import {  modifyStudent } from '../../../api/lectureApi';
import {  LectureReportCubeItemParams } from 'lecture/detail/viewModel/LectureReport';

export async function setCubeLectureStudentReport(
  params: LectureReportCubeItemParams
): Promise<void> {
  await modifyStudent(params.id||'',params.homeworkFileBoxId||'',params.homeworkContent||'');
}