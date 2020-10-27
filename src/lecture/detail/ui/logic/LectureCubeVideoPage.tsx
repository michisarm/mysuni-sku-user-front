import React from 'react';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureVideoContainer from './LectureVideoContainer';


function LectureCubeVideoPage() {
  return (
    <LectureDetailLayout>
      <LectureVideoContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeVideoPage;
