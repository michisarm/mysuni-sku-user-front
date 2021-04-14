import React, { useState, useEffect } from 'react';
import LectureCourseListView from '../../view/LectureChapterView/LectureCourseListView';
import { useLectureCubeList } from '../../../service/useLectureChapter/useLectureCubeList';

function LectureCourseListContainer() {
  const cubeList = useLectureCubeList();

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
