import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseLectureReport } from '../../../service/useLectureReport/utility/getCourseLectureReport';
import { getCubeLectureReport } from '../../../service/useLectureReport/utility/getCubeLectureReport';
import LectureParams from '../../../viewModel/LectureParams';
import LectureDetailLayout from '../../view/LectureDetailLayout';

import LectureReportContainer from './LectureReportContainer';

function LectureTestPage() {
  const params = useParams<LectureParams>();

  const getCubeReportItem = useCallback((params: LectureParams) => {
    getCubeLectureReport(params);
  }, []);

  const getCourseReportItem = useCallback(
    (params: any) => {
      if (params === undefined) {
        return;
      }
      getCourseLectureReport(params);
    },
    [params]
  );

  useEffect(() => {
    if (params.cubeId !== undefined) {
      getCubeReportItem(params);
    } else {
      getCourseReportItem(params);
    }
  }, [params]);

  return (
    <LectureDetailLayout>
      <LectureReportContainer />
    </LectureDetailLayout>
  );
}

export default LectureTestPage;
