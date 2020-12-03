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
import { useLectureCohort } from '../../service/useLectureCohort/useLectureCohort';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCohortView from '../view/LectureCohortView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { setLectureState } from 'lecture/detail/store/LectureStateStore';

function LectureCubeCohortPage() {
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

  const [lectureCohort] = useLectureCohort();
  const [lectureState] = useLectureState();

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      {lectureCohort && (
        <LectureCohortView
          {...lectureCohort}
          action={lectureState?.coreAction}
        />
      )}
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeCohortPage;
