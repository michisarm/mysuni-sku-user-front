import React from 'react';
import LectureChapterTitleContainer from './LectureChapterTitleContainer';
import LectureCourseListContainer from './LectureCourseListContainer';
import { useRequestChapter } from '../../../service/useLectureChapter/useRequestChapter';

function LectureChapterPage() {
  useRequestChapter();

  return (
    <>
      <LectureChapterTitleContainer />
      <LectureCourseListContainer />
    </>
  );
}

export default LectureChapterPage;
