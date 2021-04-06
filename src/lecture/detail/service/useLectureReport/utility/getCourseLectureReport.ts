/* eslint-disable consistent-return */
import { getReportItem } from './getReportItemMapFromCourse';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';
import { studentInfoView } from '../../../api/lectureApi';
import LectureParams from '../../../viewModel/LectureParams';

export async function getCourseLectureReport(
  params: LectureParams
): Promise<void> {
  const { cardId } = params;

  const lectureStudentView = await studentInfoView({
    courseLectureIds: [],
    lectureCardIds: [],
    preLectureCardIds: [],
    serviceId: cardId,
  });

  const student = lectureStudentView.own;
  const next = await getReportItem(cardId, student);
  setLectureReport(next);
}
