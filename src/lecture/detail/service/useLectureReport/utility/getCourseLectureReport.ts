/* eslint-disable consistent-return */
import { getReportItem } from './getReportItemMapFromCourse';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';
import { studentInfoView } from '../../../api/lectureApi';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';

export async function getCourseLectureReport(
  params: LectureRouterParams
): Promise<void> {
  const { contentId, lectureId } = params;

  const lectureStudentView = await studentInfoView({
    courseLectureIds: [],
    lectureCardIds: [],
    preLectureCardIds: [],
    serviceId: lectureId,
  });

  const student = lectureStudentView.own;
  const next = await getReportItem(contentId, student);
  setLectureReport(next);
}
