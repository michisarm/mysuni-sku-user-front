/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React, { useEffect } from 'react';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import LectureAudioView from '../view/LectureAudioView';
import LectureDetailLayout from '../view/LectureDetailLayout';
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
      <LectureAudioView />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeAudioPage;
