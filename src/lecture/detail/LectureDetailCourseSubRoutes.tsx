import React from 'react';
import { useLectureCubeType } from './service/useLectureCubeType/useLectureCubeType';
import { useLectureRouterParams } from './service/useLectureRouterParams';
import LectureCourseOverviewPage from './ui/logic/LectureOverview/LectureCourseOverviewPage';

function LectureDetailCourseSubRoutes() {
  const params = useLectureRouterParams();
  const cubeType = useLectureCubeType(
    params.contentType === 'cube' ? params.contentId : undefined
  );
  return (
    <>
      {params.contentType === 'coures' && <LectureCourseOverviewPage />}
      {params.contentType === 'cube' && <LectureDetailCourseSubRoutes />}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
