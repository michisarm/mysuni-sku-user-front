import React from 'react';
import { checkStudent } from '../../service/useLectureMedia/utility/checkStudent';
import LectureAudioView from '../view/LectureAudioView';

function LectureAudioContainer() {
  return <LectureAudioView checkStudent={checkStudent} />;
}

export default LectureAudioContainer;
