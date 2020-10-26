import React from 'react';
import { useCourseLectureOverview } from '../../../service/useLectureOverview/useCourseLectureOverview';
import LectureDetailLayout from '../../view/LectureDetailLayout';
import LectureContentContainer from './LectureContentContainer';
import LectureSummaryContainer from './LectureCourseSummaryContainer';

/**
 * TODO
 * 강사정보 이미지
 * 뱃지
 * 관련과정
 */

function LectureCourseOverviewPage() {
  useCourseLectureOverview();
  return (
    <LectureDetailLayout>
      <LectureSummaryContainer />
      <LectureContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCourseOverviewPage;
