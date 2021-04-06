import React, { Fragment } from 'react';
import { useCourseViewEvent } from '../../../service/useActionLog/useCourseViewEvent';
import { useRequestLectureCardOverview } from '../../../service/useLectureCourseOverview/useRequestLectureCourseOverview';
import { useLectureStructure } from '../../../store/LectureStructureStore';
import LectureCubeNavigatorView from '../../view/LectureOverview/LectureCubeNavigatorView';
import LectureCourseContentContainer from './LectureCourseContentContainer';
import LectureCourseSummaryContainer from './LectureCourseSummaryContainer';

function LectureCourseOverviewPage() {
  useRequestLectureCardOverview();
  const lectureStructure = useLectureStructure();

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
