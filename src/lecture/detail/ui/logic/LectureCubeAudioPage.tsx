/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureAudioContainer from './LectureAudioContainer';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeAudioPage() {
  useLectureMedia();

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureAudioContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeAudioPage;
