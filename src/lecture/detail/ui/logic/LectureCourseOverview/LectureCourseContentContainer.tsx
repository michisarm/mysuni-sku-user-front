import React from 'react';
import { useLectureComment } from '../../../service/useLectureComments';
import { useLectureBadge } from '../../../service/useLectureCourseOverview/useLectureBadge';
import { useLectureDescription } from '../../../service/useLectureCourseOverview/useLectureDescription';
import { useLectureInstructor } from '../../../service/useLectureCourseOverview/useLectureInstructor';
import { useLecturePrecourse } from '../../../service/useLectureCourseOverview/useLecturePrecourse';
import { useLectureRelations } from '../../../service/useLectureCourseOverview/useLectureRelations';
import { useLectureSubcategory } from '../../../service/useLectureCourseOverview/useLectureSubcategory';
import { useLectureTags } from '../../../service/useLectureCourseOverview/useLectureTags';
import LectureCourseContentView from '../../view/LectureOverview/LectureCourseContentView';

function LectureCourseContentContainer() {
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureTags] = useLectureTags();
  const [lectureInstructor] = useLectureInstructor();
  const [lecturePrecourse] = useLecturePrecourse();
  const [lectureBadge] = useLectureBadge();
  const [lectureComment] = useLectureComment();
  const [lectureRelations] = useLectureRelations();
  return (
    <LectureCourseContentView
      lectureDescription={lectureDescription}
      lectureSubcategory={lectureSubcategory}
      lectureTags={lectureTags}
      lectureInstructor={lectureInstructor}
      lecturePrecourse={lecturePrecourse}
      lectureBadge={lectureBadge}
      lectureComment={lectureComment}
      lectureRelations={lectureRelations}
    />
  );
}

export default LectureCourseContentContainer;
