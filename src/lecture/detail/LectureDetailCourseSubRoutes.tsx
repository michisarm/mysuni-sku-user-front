import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import LectureDetailCubeSubRoutes from './LectureDetailCubeSubRoutes';
import { setLectureParams } from './store/LectureParamsStore';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';
import LectureDiscussionPage from './ui/logic/LectureDiscussionPage';
import LectureParams from './viewModel/LectureParams';

function LectureDetailCourseSubRoutes() {
  const params = useParams<LectureParams>();
  const { viewType } = params;
  useEffect(() => {
    setLectureParams({ ...params });
  }, [params]);

  return (
    <>
      {viewType === 'chapter' && <LectureCourseOverviewPage />}
      {viewType === 'discussion' && <LectureDiscussionPage />}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
