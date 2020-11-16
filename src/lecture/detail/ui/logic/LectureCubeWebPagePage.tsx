/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React, { useEffect } from 'react';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { useLectureState } from '../../service/useLectureState/useLectureState';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureWebpageView from '../view/LectureWebpageView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeWebPagePage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params === undefined) {
      return;
    }
    const { contentId, lectureId } = params;
    getCubeLectureOverview(contentId, lectureId);
  }, [params]);

  const [lectureWebpage] = useLectureWebpage();
  const [lectureState] = useLectureState();

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      {lectureWebpage && (
        <LectureWebpageView
          {...lectureWebpage}
          action={lectureState?.coreAction}
        />
      )}
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeWebPagePage;
