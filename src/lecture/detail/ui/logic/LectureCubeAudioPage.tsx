/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import { getCubeLectureOverview } from 'lecture/detail/service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import React, { useEffect } from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureAudioContainer from './LectureAudioContainer';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeAudioPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params === undefined) {
      return;
    }
    const { contentId, lectureId } = params;
    getCubeLectureOverview(contentId, lectureId);
  }, [params]);
  
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
