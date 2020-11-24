import React, { useEffect, useState } from 'react';
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
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureTaskContainer from './LectureTaskContainer';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { setLectureState } from '../../store/LectureStateStore';

function LectureCubeTaskPage() {
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
  return (
    <LectureDetailLayout>
      <LectureTaskContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeTaskPage;
