import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import depot from '@nara.drama/depot';
import { getCourseLectureReport } from '../../../service/useLectureReport/utility/getCourseLectureReport';
import { getCubeLectureReport } from '../../../service/useLectureReport/utility/getCubeLectureReport';
import { useLectureRouterParams } from '../../../service/useLectureRouterParams';
import LectureParams from '../../../viewModel/LectureParams';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureDetailLayout from '../../view/LectureDetailLayout';

import LectureReportContainer from './LectureReportContainer';

function LectureReportPage() {
  const params = useLectureRouterParams();

  useEffect(() => {
    return () => {
      depot.UNSAFE_clearLocalFileList();
    };
  }, [params]);

  const getCubeReportItem = useCallback(
    (params: LectureRouterParams) => {
      if (params === undefined) {
        return;
      }
      getCubeLectureReport(params);
    },
    [params]
  );

  const getCourseReportItem = useCallback(
    (params: LectureRouterParams) => {
      if (params === undefined) {
        return;
      }
      getCourseLectureReport(params);
    },
    [params]
  );

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    if (params.contentType === 'cube') {
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

export default LectureReportPage;
