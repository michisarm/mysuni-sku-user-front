import React from 'react';
import { checkStudent } from '../../service/useLectureMedia/utility/checkStudent';
import { useLectureState } from '../../store/LectureStateStore';
import LectureAudioView from '../view/LectureAudioView';

function LectureAudioContainer() {
  const lectureState = useLectureState();
  return (
    <>
      {lectureState !== undefined && (
        <LectureAudioView
          checkStudent={checkStudent}
          lectureState={lectureState}
        />
      )}
    </>
  );
}

export default LectureAudioContainer;
