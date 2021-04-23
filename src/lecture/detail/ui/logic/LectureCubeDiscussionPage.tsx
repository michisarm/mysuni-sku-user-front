import React, { Fragment } from 'react';
import LectureCubeDiscussionView from '../view/LectureCubeDiscussionView';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { useLectureState } from '../../store/LectureStateStore';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeDiscussionPage() {
  const lectureState = useLectureState();
  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      {lectureState !== undefined && (
        <LectureCubeDiscussionView 
          lectureState={lectureState}
        />
      )}
    </Fragment>
  )
}

export default LectureCubeDiscussionPage;
