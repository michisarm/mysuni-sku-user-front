import React from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureAudioView from '../view/LectureAudioView';

function LectureAudioContainer() {
  useLectureMedia();

  const [, , checkStudent] = useLectureMedia();

  return <LectureAudioView checkStudent={checkStudent} />;
}

export default LectureAudioContainer;
