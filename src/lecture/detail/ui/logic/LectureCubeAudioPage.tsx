/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React from 'react';
import { useLectuerCubeOverview } from '../../service/useLectuerCubeOverview/useLectuerCubeOverview';
import LectureAudioView from '../view/LectureAudioView';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeAudioPage() {
  useLectuerCubeOverview();
  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureAudioView />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeAudioPage;
