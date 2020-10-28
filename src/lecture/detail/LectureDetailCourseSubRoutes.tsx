import React from 'react';
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
        <LectureDetailCourseSubRoutes />
      )}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
