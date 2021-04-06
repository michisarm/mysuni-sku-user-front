import React, { Fragment, useEffect } from 'react';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureAudioContainer from './LectureAudioContainer';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeAudioPage() {
  // const params = useLectureParams();
  // useEffect(() => {
  //   if (params?.cubeId === undefined) {
  //     return;
  //   }
  //   getCubeLectureOverview(params?.cubeId);
  //   return () => {
  //     setLectureCubeSummary();
  //     setLectureDescription();
  //     setLectureSubcategory();
  //     setLectureTags();
  //     setLectureInstructor();
  //     setLecturePrecourse();
  //     setLectureFile();
  //     setLectureComment();
  //     setLectureReview();
  //     setInMyLectureCdo();
  //     setLectureState();
  //   };
  // }, [params?.cubeId]);

  useLectureMedia();
  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      <LectureAudioContainer />
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeAudioPage;
