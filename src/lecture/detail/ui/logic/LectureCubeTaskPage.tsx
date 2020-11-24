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
import { isEmptyText } from '../../utility/isEmpty';
import {
  setLectureTaskDetail,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
} from '../../store/LectureTaskStore';
import {
  getActiveStructureItem,
  useLectureStructure,
} from '../../service/useLectureStructure/useLectureStructure';
import { setLectureState } from 'lecture/detail/store/LectureStateStore';

function LectureCubeTaskPage() {
  const params = useLectureRouterParams();
  const { contentId, lectureId } = params || { contentId: '', lectureId: '' };
  useEffect(() => {
    if (isEmptyText(contentId) || isEmptyText(lectureId)) {
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

  useEffect(() => {
    if (isEmptyText(contentId) || isEmptyText(lectureId)) {
      return;
    }
    return () => {
      setLectureTaskOffset(0);
      setLectureTaskViewType('list');
      setLectureTaskDetail();
      setLectureTaskTab('Overview');
    };
  }, [contentId, lectureId]);

  const [lectureStructure] = useLectureStructure();

  return (
    <LectureDetailLayout>
      {lectureStructure && getActiveStructureItem() && <LectureTaskContainer />}
    </LectureDetailLayout>
  );
}

export default LectureCubeTaskPage;
