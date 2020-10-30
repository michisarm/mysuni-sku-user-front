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

import { modifyStudent } from '../../../api/lectureApi';
import { LectureReportCubeItemParams } from 'lecture/detail/viewModel/LectureReport';
import { getLectureReport } from '../../../store/LectureReportStore';

export async function setCubeLectureStudentReport(
  params: LectureReportCubeItemParams
): Promise<void> {
  await modifyStudent(
    getLectureReport()?.studentReport?.id || '',
    getLectureReport()?.studentReport?.homeworkFileBoxId || '',
    getLectureReport()?.studentReport?.homeworkContent || ''
  );
}
