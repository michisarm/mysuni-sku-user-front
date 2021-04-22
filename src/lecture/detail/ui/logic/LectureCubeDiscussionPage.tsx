import React, { Fragment, useEffect } from 'react';
import LectureCubeDiscussionContainer from './LectureCubeDiscussionContainer';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { useLectureParams } from '../../store/LectureParamsStore';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeDiscussionPage() {

  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      <LectureCubeDiscussionContainer />
    </Fragment>
  )
}

export default LectureCubeDiscussionPage;
