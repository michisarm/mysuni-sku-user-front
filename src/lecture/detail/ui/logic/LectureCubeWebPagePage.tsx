import React, { Fragment } from 'react';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import LectureWebpageView from '../view/LectureWebpageView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';

function LectureCubeWebPagePage() {
  const [lectureWebpage] = useLectureWebpage();

  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      {lectureWebpage && <LectureWebpageView {...lectureWebpage} />}
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeWebPagePage;
