import React, { useEffect, useState } from 'react';
import { useLectureCubeType } from './service/useLectureCubeType/useLectureCubeType';
import { useLectureRouterParams } from './service/useLectureRouterParams';
import LectureCubeAudioPage from './ui/logic/LectureCubeAudioPage';
import LectureCubeClassroomPage from './ui/logic/LectureCubeClassroomPage';
import LectureCubeDocumentsPage from './ui/logic/LectureCubeDocumentsPage';
import LectureCubeElearningPage from './ui/logic/LectureCubeElearningPage';
import LectureCubeTaskPage from './ui/logic/LectureCubeTaskPage';
import LectureCubeVideoPage from './ui/logic/LectureCubeVideoPage';
import LectureCubeWebPagePage from './ui/logic/LectureCubeWebPagePage';
import LectureCubeCohortPage from './ui/logic/LectureCubeCohortPage';
import CubeType from './model/CubeType';

function LectureDetailCubeSubRoutes() {
  const params = useLectureRouterParams();
  const [cubeType] = useLectureCubeType(params && params.contentId);
  const [type, setType] = useState<CubeType>();
  useEffect(() => {
    if (cubeType?.type !== undefined) {
      const next = cubeType.type;
      setType(next);
    }
  }, [cubeType?.type]);

  return (
    <>
      {type === 'Video' && <LectureCubeVideoPage />}
      {type === 'Audio' && <LectureCubeAudioPage />}
      {type === 'WebPage' && <LectureCubeWebPagePage />}
      {type === 'Cohort' && <LectureCubeCohortPage />}
      {type === 'Experiential' && <LectureCubeWebPagePage />}
      {type === 'ELearning' && <LectureCubeElearningPage />}
      {type === 'Task' && <LectureCubeTaskPage />}
      {type === 'Documents' && <LectureCubeDocumentsPage />}
      {type === 'ClassRoomLecture' && <LectureCubeClassroomPage />}
    </>
  );
}

export default LectureDetailCubeSubRoutes;
