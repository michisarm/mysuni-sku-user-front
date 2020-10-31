import React from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';

function LectureVideoContainer() {
  useLectureMedia();

  return <LectureVideoView />;
}

export default LectureVideoContainer;
