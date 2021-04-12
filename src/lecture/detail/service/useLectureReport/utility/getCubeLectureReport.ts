/* eslint-disable consistent-return */
import { getReportItem } from './getReportItemMapFromCube';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';
import LectureParams from '../../../viewModel/LectureParams';
import { findByCubeId } from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';

export async function getCubeLectureReport(
  params: LectureParams
): Promise<void> {
  const { cubeId, pathname } = params;
  if (cubeId !== undefined) {
    const cubeDetail = await findCubeDetailCache(cubeId);

    if (cubeDetail !== undefined && pathname !== undefined) {
      const { cubeContents } = cubeDetail;
      //const student = await findByCubeId(cubeId);
      const next = await getReportItem(cubeContents, pathname);
      setLectureReport(next);
    }
  }
}
