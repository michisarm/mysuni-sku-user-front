/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React, {useEffect} from 'react';
import { useLectuerCubeOverview } from '../../service/useLectuerCubeOverview/useLectuerCubeOverview';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureWebpageView from '../view/LectureWebpageView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeFileContainer from './LectureCubeOverview/LectureCubeFileContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeWebPagePage() {
  useLectuerCubeOverview();
  const [lectureWebpage] = useLectureWebpage();
  useEffect(() => {
    console.log('pageview', lectureWebpage);
  },[]);

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      {lectureWebpage && <LectureWebpageView {...lectureWebpage} />}
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeWebPagePage;
