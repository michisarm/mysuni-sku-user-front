import React, { Fragment } from 'react';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import LectureWebpageView from '../view/LectureWebpageView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeWebPagePage() {
  const [lectureWebpage] = useLectureWebpage();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      {lectureWebpage && <LectureWebpageView {...lectureWebpage} />}
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeWebPagePage;
