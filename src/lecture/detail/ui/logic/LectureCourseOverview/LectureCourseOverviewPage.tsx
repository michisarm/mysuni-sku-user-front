import React from 'react';
import { useLectureCourseOverview } from '../../../service/useLectureCourseOverview/useLectureCourseOverview';
import LectureDetailLayout from '../../view/LectureDetailLayout';
import LectureCourseContentContainer from './LectureCourseContentContainer';
import LectureCourseSummaryContainer from './LectureCourseSummaryContainer';

/**
 * TODO
 * 강사정보 이미지
 * 뱃지
 * 관련과정
 */

function LectureCourseOverviewPage() {
  useLectureCourseOverview();
  return (
    <LectureDetailLayout>
      <LectureCourseSummaryContainer />
      <LectureCourseContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCourseOverviewPage;
