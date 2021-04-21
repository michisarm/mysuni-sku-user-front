import CubeType from '../../../../model/CubeType';
import { findMyCardRelatedStudentsCache } from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { setLectureState } from '../../../store/LectureStateStore';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import LectureState from '../../../viewModel/LectureState';
import { findMyDiscussionCounts } from '../../../api/cubeApi';

export async function requestLectureState(
  cardId: string,
  cubeId: string,
  cubeType: CubeType
) {
  const myCardRelatedStudents = await findMyCardRelatedStudentsCache(cardId);
  const cubeStudents = myCardRelatedStudents?.cubeStudents;
  const cubeDetail = await findCubeDetailCache(cubeId);

  const cubeStudent = findCubeStudent(cubeId, cubeStudents);
  if(cubeType === 'Discussion' && cubeStudent){
    const myDiscussionCounts = await findMyDiscussionCounts(cubeStudent.id);
    cubeStudent.commentCount = myDiscussionCounts?.commentCount || 0;
    cubeStudent.subCommentCount = myDiscussionCounts?.subCommentCount || 0;
  }

  if (cubeDetail !== undefined) {
    const lectureState: LectureState = {
      cubeType,
      student: cubeStudent,
      cubeDetail,
    };
    setLectureState(lectureState);
  }
}
