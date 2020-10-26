import React from 'react';
import LectureContentView from '../../view/LectureOverview/LectureContentView';
import { useLectureDescription } from '../../../service/useLectureOverview/useLectureDescription';
import { useLectureSubcategory } from '../../../service/useLectureOverview/useLectureSubcategory';
import { useLectureTags } from '../../../service/useLectureOverview/useLectureTags';
import { useLectureInstructor } from '../../../service/useLectureOverview/useLectureInstructor';
import { useLecturePrecourse } from '../../../service/useLectureOverview/useLecturePrecourse';

function LectureContentContainer() {
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureTags] = useLectureTags();
  const [lectureInstructor] = useLectureInstructor();
  const [lecturePrecourse] = useLecturePrecourse();
  return (
    <LectureContentView
      lectureDescription={lectureDescription}
      lectureSubcategory={lectureSubcategory}
      lectureTags={lectureTags}
      lectureInstructor={lectureInstructor}
      lecturePrecourse={lecturePrecourse}
    />
  );
}

export default LectureContentContainer;
