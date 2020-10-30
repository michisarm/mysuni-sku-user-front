import React from 'react';
import LectureDetailCubeSubRoutes from './LectureDetailCubeSubRoutes';
import { useLectureRouterParams } from './service/useLectureRouterParams';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';

function LectureDetailCourseSubRoutes() {
  const params = useLectureRouterParams();
  return (
    <>
      {params && params.contentType === 'coures' && (
        <LectureCourseOverviewPage />
      )}
      {params && params.contentType === 'cube' && (
        <LectureDetailCubeSubRoutes />
      )}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
