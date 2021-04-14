import React from 'react';
import LectureCourseListView from '../../view/LectureChapterView/LectureCourseListView';
import { useLearningContentCube } from '../../../store/LearningContentCubeStore';

function LectureCourseListContainer() {
  const cubeList = useLearningContentCube();

  return (
    <>
      {cubeList && (
        <LectureCourseListView
          courseCount={cubeList.length}
          learningContents={cubeList}
        />
      )}
    </>
  );
}

export default LectureCourseListContainer;
