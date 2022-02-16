import CubeType from '../../../../model/CubeType';
import { findMyCardRelatedStudentsCache } from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import {
  setLectureDiscussionPrivateComment,
  setLectureState,
} from '../../../store/LectureStateStore';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import LectureState from '../../../viewModel/LectureState';
import {
  findMyDiscussionCounts,
  findMyTaskConditionCounts,
} from '../../../api/cubeApi';
import { findComment } from 'lecture/detail/api/feedbackApi';

export async function requestLectureState(
  cardId: string,
  cubeId: string,
  cubeType: CubeType
) {
  const myCardRelatedStudents = await findMyCardRelatedStudentsCache(cardId);
  const cubeStudents = myCardRelatedStudents?.cubeStudents;
  const cubeDetail = await findCubeDetailCache(cubeId);

  if (cubeDetail?.cubeContents.commentFeedbackId) {
    const feedbackInfo = await findComment(
      cubeDetail?.cubeContents.commentFeedbackId
    );
    setLectureDiscussionPrivateComment(feedbackInfo?.config.privateComment);
  }

  const cubeStudent = findCubeStudent(cubeId, cubeStudents);
  if (cubeType === 'Discussion' && cubeStudent) {
    const myDiscussionCounts = await findMyDiscussionCounts(cubeStudent.id);
    cubeStudent.commentCount = myDiscussionCounts?.commentCount || 0;
    cubeStudent.subCommentCount = myDiscussionCounts?.subCommentCount || 0;
  }

  if (cubeType === 'Task' && cubeStudent) {
    const myTaskCounts = await findMyTaskConditionCounts(cubeStudent.id);
    cubeStudent.postCount = myTaskCounts?.postCount || 0;
    cubeStudent.commentCount = myTaskCounts?.commentCount || 0;
    cubeStudent.subCommentCount = myTaskCounts?.subCommentCount || 0;
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
