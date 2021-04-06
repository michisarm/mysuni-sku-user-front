import React, { Fragment } from 'react';
import LectureCubeDocumentsContainer from './LectureCubeDocumentsContainer';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';

function LectureCubeDocumentsPage() {
  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      <LectureCubeDocumentsContainer />
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeDocumentsPage;
