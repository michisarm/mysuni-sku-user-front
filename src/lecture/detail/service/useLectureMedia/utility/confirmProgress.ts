/* eslint-disable consistent-return */
import { setLectureConfirmProgress } from '../../../store/LectureConfirmProgressStore';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { confirmProgressByStudentId, findByCubeId } from '../../../api/cardApi';

export async function confirmProgress(): Promise<void> {
  const params = getLectureParams();
  if (params?.cubeId !== undefined) {
    const student = await findByCubeId(params.cubeId);
    if (student === undefined) {
      return;
    }

    setLectureConfirmProgress(await confirmProgressByStudentId(student.id));
  }
}
