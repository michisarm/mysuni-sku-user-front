/* eslint-disable consistent-return */
import { getReportItem } from './getReportItemMapFromCourse';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';
import { studentInfoView } from '../../../api/lectureApi';
import LectureParams from '../../../viewModel/LectureParams';

export async function getCourseLectureReport(
  params: LectureParams
): Promise<void> {
  const { cardId, pathname } = params;
  const next = await getReportItem(cardId, pathname);
  setLectureReport(next);
}
