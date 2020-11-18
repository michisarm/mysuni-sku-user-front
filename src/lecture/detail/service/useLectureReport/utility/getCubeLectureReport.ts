/* eslint-disable consistent-return */
import { findIsJsonStudentByCube, findStudent } from '../../../api/lectureApi';

import { getReportItem } from './getReportItemMapFromCube';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { findPersonalCube } from '../../../api/mPersonalCubeApi';

export async function getCubeLectureReport(
  params: LectureRouterParams
): Promise<void> {
  const { contentId, lectureId } = params;
  const {
    cubeIntro: { id: cubeIntroId },
  } = await findPersonalCube(contentId);
  const studentJoins = await findIsJsonStudentByCube(lectureId);
  if (!Array.isArray(studentJoins)) {
    return;
  }
  const sortedStudentJoins = studentJoins.sort(
    (a, b) => b.updateTime - a.updateTime
  );
  const studentId = sortedStudentJoins[0].studentId;
  const student = await findStudent(studentId);
  const next = await getReportItem(cubeIntroId, studentId, student);
  setLectureReport(next);
}
