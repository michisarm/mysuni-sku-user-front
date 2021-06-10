import React, { Fragment } from 'react';
import { useLectureCohort } from '../../service/useLectureCohort/useLectureCohort';
import LectureCohortView from '../view/LectureCohortView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeCohortPage() {
  const [lectureCohort] = useLectureCohort();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      {lectureCohort && <LectureCohortView {...lectureCohort} />}
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeCohortPage;
