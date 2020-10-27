import React from 'react';
import { useLectureTranscript } from '../../service/useLectureTranscript/useLectureTranscript';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';

function LectureVideoContainer() {
  const lectureTranscript = useLectureTranscript()[0]!;
  // const setLectureVideo = useLectureVideo()[1]!;
  // const setCubeLectureVideo = useLectureVideo()[2]!;

  return <LectureVideoView />;
}

export default LectureVideoContainer;
