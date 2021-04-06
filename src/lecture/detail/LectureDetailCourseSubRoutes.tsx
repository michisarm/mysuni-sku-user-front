import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import LectureDetailCubeSubRoutes from './LectureDetailCubeSubRoutes';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';
import LectureParams from './viewModel/LectureParams';

function LectureDetailCourseSubRoutes() {
  const params = useParams<LectureParams>();
  return (
    <>
      {params.cubeId === undefined && <LectureCourseOverviewPage />}
      {params.cubeId !== undefined && <LectureDetailCubeSubRoutes />}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
