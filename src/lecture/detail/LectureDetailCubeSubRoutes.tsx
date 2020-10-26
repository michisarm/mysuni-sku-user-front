import React from 'react';
import { useLectureCubeType } from './service/useLectureCubeType/useLectureCubeType';
import { useLectureRouterParams } from './service/useLectureRouterParams';
import LectureCubeAudioPage from './ui/logic/LectureCubeAudioPage';
import LectureCubeClassroomPage from './ui/logic/LectureCubeClassroomPage';
import LectureCubeDocumentsPage from './ui/logic/LectureCubeDocumentsPage';
import LectureCubeElearningPage from './ui/logic/LectureCubeElearningPage';
import LectureCubeTaskPage from './ui/logic/LectureCubeTaskPage';
import LectureCubeVideoPage from './ui/logic/LectureCubeVideoPage';
import LectureCubeWebPagePage from './ui/logic/LectureCubeWebPagePage';
import LectureCourseOverviewPage from './ui/logic/LectureOverview/LectureCourseOverviewPage';

function LectureDetailCourseSubRoutes() {
  const params = useLectureRouterParams();
  const [cubeType] = useLectureCubeType(params.contentId);
  return (
    <>
      {cubeType !== undefined && cubeType.type === 'Video' && (
        <LectureCubeVideoPage />
      )}
      {cubeType !== undefined && cubeType.type === 'Audio' && (
        <LectureCubeAudioPage />
      )}
      {cubeType !== undefined && cubeType.type === 'WebPage' && (
        <LectureCubeWebPagePage />
      )}
      {cubeType !== undefined && cubeType.type === 'ELearning' && (
        <LectureCubeElearningPage />
      )}
      {cubeType !== undefined && cubeType.type === 'Community' && (
        <LectureCubeTaskPage />
      )}
      {cubeType !== undefined && cubeType.type === 'Documents' && (
        <LectureCubeDocumentsPage />
      )}
      {cubeType !== undefined && cubeType.type === 'ClassRoomLecture' && (
        <LectureCubeClassroomPage />
      )}
    </>
  );
}

export default LectureDetailCourseSubRoutes;
