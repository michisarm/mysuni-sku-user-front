import React, { useCallback, useEffect } from 'react';
import depot from '@nara.drama/depot';
import { getCourseLectureReport } from '../../../service/useLectureReport/utility/getCourseLectureReport';
import { getCubeLectureReport } from '../../../service/useLectureReport/utility/getCubeLectureReport';

import LectureReportContainer from './LectureReportContainer';
import { useLectureParams } from '../../../store/LectureParamsStore';
import { useLectureStructure } from '../../../store/LectureStructureStore';

function LectureReportPage() {
  const params = useLectureParams();
  const lectureStructure = useLectureStructure();

  useEffect(() => {
    return () => {
      depot.UNSAFE_clearLocalFileList();
    };
  }, [params]);

  const getCubeReportItem = useCallback(() => {
    if (params === undefined) {
      return;
    }
    getCubeLectureReport(params);
  }, [params]);

  const getCourseReportItem = useCallback(() => {
    if (params === undefined) {
      return;
    }
    getCourseLectureReport(params);
  }, [params]);

  useEffect(() => {
    if (params === undefined || lectureStructure === undefined) {
      return;
    }
    if (params.cubeId !== undefined) {
      getCubeReportItem();
    } else {
      getCourseReportItem();
    }
  }, [params, lectureStructure]);

  return <LectureReportContainer />;
}

export default LectureReportPage;
