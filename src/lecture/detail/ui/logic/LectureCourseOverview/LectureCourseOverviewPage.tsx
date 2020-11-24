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
  const [navigatorState, setNavigatorState] = useState<any>();

  const navigatorClose = (el: any) => {
    return setNavigatorState(el);
  };

  return (
    <LectureDetailLayout>
      {lectureStructure !== undefined && (
        <LectureCubeNavigatorView
          lectureStructure={lectureStructure}
          navigatorClose={navigatorClose}
        />
      )}
      <LectureCourseSummaryContainer />
      {navigatorState ? (
        <LectureCourseContentContainer navigatorState={navigatorState} />
      ) : (
        <LectureCourseContentContainer />
      )}
    </LectureDetailLayout>
  );
}

export default LectureCourseOverviewPage;
