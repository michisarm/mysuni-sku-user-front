import React, { Fragment } from 'react';
import { useCourseViewEvent } from '../../../service/useActionLog/useCourseViewEvent';
import { useLectureCourseOverview } from '../../../service/useLectureCourseOverview/useLectureCourseOverview';
import { useLectureStructure } from '../../../service/useLectureStructure/useLectureStructure';
import LectureCubeNavigatorView from '../../view/LectureOverview/LectureCubeNavigatorView';
import LectureCourseContentContainer from './LectureCourseContentContainer';
import LectureCourseSummaryContainer from './LectureCourseSummaryContainer';

function LectureCourseOverviewPage() {
  useLectureCourseOverview();
  const [lectureStructure] = useLectureStructure();

  useCourseViewEvent();

  return (
    <Fragment>
      {lectureStructure !== undefined && (
        <LectureCubeNavigatorView lectureStructure={lectureStructure} />
      )}
      <LectureCourseSummaryContainer />
      <LectureCourseContentContainer />
    </Fragment>
  );
}

export default LectureCourseOverviewPage;
