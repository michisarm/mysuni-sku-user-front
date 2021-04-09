import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import LectureDetailCubeSubRoutes from './LectureDetailCubeSubRoutes';
import { setLectureParams } from './store/LectureParamsStore';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';
import LectureDiscussionPage from './ui/logic/LectureDiscussionPage';
import LectureParams from './viewModel/LectureParams';

function LectureDetailCourseSubRoutes() {
  const params = useParams<LectureParams>();
  const { viewType } = params;
  const { pathname } = useLocation();
  useEffect(() => {
    setLectureParams({ ...params, pathname });
  }, [params, pathname]);

  return (
    <>
      {viewType === 'chapter' && <LectureCourseOverviewPage />}
      {viewType === 'discussion' && <LectureDiscussionPage />}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
