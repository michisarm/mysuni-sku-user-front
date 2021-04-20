/* eslint-disable consistent-return */
import { setLectureConfirmProgress } from '../../../store/LectureConfirmProgressStore';
import { getLectureParams } from '../../../store/LectureParamsStore';
import {
  confirmProgressByStudentId,
  findMyCardRelatedStudentsCache,
} from '../../../api/cardApi';
import { requestCardLectureStructure } from '../../useLectureStructure/utility/requestCardLectureStructure';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import { clearfindAllCollegeCache } from '../../../../../college/present/apiclient/CollegeApi';

export async function confirmProgress(): Promise<void> {
  const params = getLectureParams();
  if (params?.cardId !== undefined && params?.cubeId !== undefined) {
    clearfindAllCollegeCache();
    const myCardRelatedStudents = await findMyCardRelatedStudentsCache(
      params?.cardId
    );
    const cubeStudents = myCardRelatedStudents?.cubeStudents;
    const student = findCubeStudent(params?.cubeId, cubeStudents);
    if (student === undefined) {
      return;
    }

    setLectureConfirmProgress(await confirmProgressByStudentId(student.id));
    requestCardLectureStructure(params.cardId);
  }
}
