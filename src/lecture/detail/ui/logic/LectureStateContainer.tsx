import React from 'react';
import { useLectureState } from '../../service/useLectureState/useLectureState';
import LectureStateView from '../view/LectureStateView';

function LectureStateContainer() {
  const [lectureState] = useLectureState();
  return (
    <>{lectureState && <LectureStateView lectureState={lectureState} />}</>
  );
}

export default LectureStateContainer;
