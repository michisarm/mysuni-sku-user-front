import React from 'react';
import LectureCubeAudioPage from './ui/logic/LectureCubeAudioPage';
import LectureCubeClassroomPage from './ui/logic/LectureCubeClassroomPage';
import LectureCubeDocumentsPage from './ui/logic/LectureCubeDocumentsPage';
import LectureCubeElearningPage from './ui/logic/LectureCubeElearningPage';
import LectureCubeTaskPage from './ui/logic/LectureCubeTaskPage';
import LectureCubeVideoPage from './ui/logic/LectureCubeVideoPage';
import LectureCubeWebPagePage from './ui/logic/LectureCubeWebPagePage';
import { useParams } from 'react-router';
import LectureParams from './viewModel/LectureParams';
import LectureCubeCohortPage from './ui/logic/LectureCubeCohortPage';
import LectureCubeDiscussionPage from './ui/logic/LectureCubeDiscussionPage';

function LectureDetailCubeSubRoutes() {
  const { cubeType } = useParams<LectureParams>();

  return (
    <>
      {cubeType === 'Video' && <LectureCubeVideoPage />}
      {cubeType === 'Audio' && <LectureCubeAudioPage />}
      {cubeType === 'WebPage' && <LectureCubeWebPagePage />}
      {cubeType === 'Experiential' && <LectureCubeWebPagePage />}
      {cubeType === 'ELearning' && <LectureCubeElearningPage />}
      {/* {cubeType === 'Task' && <LectureCubeTaskPage />} */}
      {cubeType === 'Documents' && <LectureCubeDocumentsPage />}
      {cubeType === 'ClassRoomLecture' && <LectureCubeClassroomPage />}
      {cubeType === 'Cohort' && <LectureCubeCohortPage />}
      {cubeType === 'Task' && <LectureCubeDiscussionPage />}
    </>
  );
}

export default LectureDetailCubeSubRoutes;
