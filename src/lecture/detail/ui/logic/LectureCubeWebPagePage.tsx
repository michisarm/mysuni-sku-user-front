/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React from 'react';
import { useLectuerCubeOverview } from '../../service/useLectuerCubeOverview/useLectuerCubeOverview';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeFileContainer from './LectureCubeOverview/LectureCubeFileContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeWebPagePage() {
  useLectuerCubeOverview();
  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeWebPagePage;
