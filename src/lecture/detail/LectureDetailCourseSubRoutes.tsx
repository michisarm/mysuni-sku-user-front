import React from 'react';
import { useLectureRouterParams } from './service/useLectureRouterParams';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';

function LectureDetailCourseSubRoutes() {
  const params = useLectureRouterParams();
  return (
    <>
      {params.contentType === 'coures' && <LectureCourseOverviewPage />}
      {params.contentType === 'cube' && <LectureDetailCourseSubRoutes />}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
