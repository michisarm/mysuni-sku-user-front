import React, { useState } from 'react';
import { useLectureCourseOverview } from '../../../service/useLectureCourseOverview/useLectureCourseOverview';
import { useLectureStructure } from '../../../service/useLectureStructure/useLectureStructure';
import LectureDetailLayout from '../../view/LectureDetailLayout';
import LectureCubeNavigatorView from '../../view/LectureOverview/LectureCubeNavigatorView';
import LectureCourseContentContainer from './LectureCourseContentContainer';
import LectureCourseSummaryContainer from './LectureCourseSummaryContainer';

function LectureCourseOverviewPage() {
  useLectureCourseOverview();
  const [lectureStructure] = useLectureStructure();
  const [navigatorState, setNavigatorState] = useState<any>()

  return (
    <LectureDetailLayout>
       {lectureStructure !== undefined && <LectureCubeNavigatorView lectureStructure={lectureStructure}/>}
      <LectureCourseSummaryContainer />
      <LectureCourseContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCourseOverviewPage;
