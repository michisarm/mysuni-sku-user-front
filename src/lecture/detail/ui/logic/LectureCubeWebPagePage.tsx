/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React, { useEffect } from 'react';
import {
  setInMyLectureCdo,
  setLectureComment,
  setLectureCubeSummary,
  setLectureDescription,
  setLectureFile,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureReview,
  setLectureSubcategory,
  setLectureTags,
} from '../../store/LectureOverviewStore';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { useLectureState } from '../../service/useLectureState/useLectureState';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureWebpageView from '../view/LectureWebpageView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { setLectureState } from 'lecture/detail/store/LectureStateStore';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';

function LectureCubeWebPagePage() {
  const params = useLectureRouterParams();
  const { contentId, lectureId } = params || { contentId: '', lectureId: '' };
  useEffect(() => {
    if (params === undefined) {
      return;
    }
    getCubeLectureOverview(contentId, lectureId);
    return () => {
      setLectureCubeSummary();
      setLectureDescription();
      setLectureSubcategory();
      setLectureTags();
      setLectureInstructor();
      setLecturePrecourse();
      setLectureFile();
      setLectureComment();
      setLectureReview();
      setInMyLectureCdo();
      setLectureState();
    };
  }, [contentId, lectureId]);

  const [lectureWebpage] = useLectureWebpage();
  const [lectureState] = useLectureState();

  useCubeViewEvent();

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
