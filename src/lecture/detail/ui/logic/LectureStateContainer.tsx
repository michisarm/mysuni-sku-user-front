/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLectureClassroom } from '../../service/useLectureClassroom/useLectureClassroom';
import { requestLectureState } from '../../service/useLectureState/utility/requestLectureState';
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
      console.log(event);
      if (event.origin === 'http://localhost:3000') {
        if (
          event.data === 'CubePassed' &&
          params.cubeId &&
          lectureState?.cubeType
        ) {
          await requestLectureState(
            params.cardId,
            params.cubeId,
            lectureState?.cubeType
          );
        }
      }
    },
    [lectureState?.cubeType, params.cardId, params.cubeId]
  );

  useEffect(() => {
    // console.log(lectureWebpage, lectureState);
    if (
      lectureWebpage?.urlType === 'embedded' &&
      lectureState?.cubeType === 'WebPage'
    ) {
      window.addEventListener('message', receiveMessage, false);
    }

    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, [lectureWebpage?.urlType, lectureState?.cubeType]);

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
