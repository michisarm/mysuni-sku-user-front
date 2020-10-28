import React from 'react';
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

  return (
    <LectureCubeContentView
      lectureDescription={lectureDescription}
      lectureSubcategory={lectureSubcategory}
      lectureTags={lectureTags}
      lectureFile={lectureFile}
    />
  );
}

export default LectureCubeContentContainer;
