import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clearFindMyCardRelatedStudentsCache } from '../../api/cardApi';
import { clearFindCubeDetailCache } from '../../api/cubeApi';
import { useLectureClassroom } from '../../service/useLectureClassroom/useLectureClassroom';
import { requestLectureState } from '../../service/useLectureState/utility/requestLectureState';
import { requestCardLectureStructure } from '../../service/useLectureStructure/utility/requestCardLectureStructure';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import { useLectureState } from '../../store/LectureStateStore';
import { useLectureStructure } from '../../store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import LectureClassroomStateView from '../view/LectureStateView/LectureClassroomStateView';
import LectureDocumentsStateView from '../view/LectureStateView/LectureDocumentsStateView';
import LectureTaskStateView from '../view/LectureStateView/LectureTaskStateView';
import LectureVideoStateView from '../view/LectureStateView/LectureVideoStateView';
import LectureWebPageStateView from '../view/LectureStateView/LectureWebPageStateView';

function LectureStateContainer() {
  const lectureState = useLectureState();
  const [lectureClassroom] = useLectureClassroom(true);
  const [lectureWebpage] = useLectureWebpage();
  const lectureStructure = useLectureStructure();
  const params = useParams<LectureParams>();

  const receiveMessage = useCallback(
    async (event: MessageEvent) => {
      // console.log('lectureWebpageURL: ', lectureWebpage?.url);
      // console.log('eventOriginURL: ', event.origin);
      if (
        event.data === 'CubePassed' &&
        params.cubeId &&
        lectureState?.cubeType
      ) {
        clearFindMyCardRelatedStudentsCache();
        clearFindCubeDetailCache();
        setTimeout(() => {
          requestCardLectureStructure(params.cardId);
          requestLectureState(
            params.cardId,
            params.cubeId || '',
            lectureState.cubeType
          );
        }, 500);
      }
    },
    [lectureState?.cubeType, params.cardId, params.cubeId, lectureWebpage]
  );

  useEffect(() => {
    if (
      lectureWebpage?.urlType === 'embedded' &&
      lectureState?.cubeType === 'WebPage'
    ) {
      window.addEventListener('message', receiveMessage, false);
    }

    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, [lectureWebpage?.urlType, lectureState?.cubeType, receiveMessage]);

  if (lectureState === undefined) {
    return null;
  }

  const { cubeType } = lectureState;
  if (cubeType === 'WebPage' || cubeType === 'Experiential') {
    return <LectureWebPageStateView lectureState={lectureState} />;
  }

  if (
    cubeType === 'Documents' &&
    lectureWebpage !== undefined &&
    lectureStructure !== undefined
  ) {
    return (
      <LectureDocumentsStateView
        lectureStructure={lectureStructure}
        lectureState={lectureState}
        lectureWebpage={lectureWebpage}
      />
    );
  }

  if (cubeType === 'ClassRoomLecture' || cubeType === 'ELearning') {
    if (lectureClassroom !== undefined) {
      return (
        <LectureClassroomStateView
          lectureState={lectureState}
          lectureClassroom={lectureClassroom}
        />
      );
    }
  }

  if (cubeType === 'Task' || cubeType === 'Discussion') {
    return <LectureTaskStateView lectureState={lectureState} />;
  }

  if (cubeType === 'Video' || cubeType === 'Audio') {
    return <LectureVideoStateView lectureState={lectureState} />;
  }
  return null;
}

export default LectureStateContainer;
