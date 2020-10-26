import React from 'react';
import LectureContentView from '../../view/LectureOverview/LectureContentView';
import { useLectureDescription } from '../../../service/useLectureOverview/useLectureDescription';
import { useLectureSubcategory } from '../../../service/useLectureOverview/useLectureSubcategory';
import { useLectureTags } from '../../../service/useLectureOverview/useLectureTags';
import { useLectureInstructor } from '../../../service/useLectureOverview/useLectureInstructor';
import { useLecturePrecourse } from '../../../service/useLectureOverview/useLecturePrecourse';
import { useLectureBadge } from '../../../service/useLectureOverview/useLectureBadge';

function LectureContentContainer() {
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureTags] = useLectureTags();
  const [lectureInstructor] = useLectureInstructor();
  const [lecturePrecourse] = useLecturePrecourse();
  const [lectureBadge] = useLectureBadge();
  return (
    <LectureContentView
      lectureDescription={lectureDescription}
      lectureSubcategory={lectureSubcategory}
      lectureTags={lectureTags}
      lectureInstructor={lectureInstructor}
      lecturePrecourse={lecturePrecourse}
      lectureBadge={lectureBadge}
    />
  );
}

export default LectureContentContainer;
