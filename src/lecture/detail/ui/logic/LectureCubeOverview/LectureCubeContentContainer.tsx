import React from 'react';
import { useLectureClassroom } from '../../../service/useLectureClassroom/useLectureClassroom';
import { useLectureComment } from '../../../service/useLectureComments';
import { useLectureDescription } from '../../../service/useLectureCourseOverview/useLectureDescription';
import { useLectureSubcategory } from '../../../service/useLectureCourseOverview/useLectureSubcategory';
import { useLectureTags } from '../../../service/useLectureCourseOverview/useLectureTags';
import { useLectureFile } from '../../../service/useLectureFile';
import LectureCubeContentView from '../../view/LectureOverview/LectureCubeContentView';

function LectureCubeContentContainer() {
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureFile] = useLectureFile();
  const [lectureTags] = useLectureTags();
  const [lectureComment] = useLectureComment();
  const [lectureClassroom] = useLectureClassroom();

  return (
    <LectureCubeContentView
      lectureDescription={lectureDescription}
      lectureSubcategory={lectureSubcategory}
      lectureTags={lectureTags}
      lectureFile={lectureFile}
      lectureComment={lectureComment}
      lectureClassroom={lectureClassroom}
    />
  );
}

export default LectureCubeContentContainer;
