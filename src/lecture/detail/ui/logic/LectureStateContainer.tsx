import React from 'react';
import { useLectureClassroom } from '../../service/useLectureClassroom/useLectureClassroom';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import { useLectureState } from '../../store/LectureStateStore';
import { useLectureStructure } from '../../store/LectureStructureStore';
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
