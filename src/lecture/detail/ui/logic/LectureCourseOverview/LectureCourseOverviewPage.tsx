import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router';
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

  const history = useHistory();
  useEffect(() => {
    if (lectureStructure === undefined) {
      return;
    }
    if (
      lectureStructure.cubes.length === 1 &&
      lectureStructure.items.length === 1 &&
      lectureStructure.card.test === undefined &&
      lectureStructure.card.report === undefined &&
      lectureStructure.card.survey === undefined
    ) {
      history.replace(lectureStructure.cubes[0].path);
    }
  }, [lectureStructure]);

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
