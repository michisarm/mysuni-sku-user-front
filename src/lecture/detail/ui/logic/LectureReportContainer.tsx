import React from 'react';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import LectureReportView from '../view/LectureReportView/LectureReportView';

function LectureReportContainer() {
  const lectureStructure = useLectureTest()[0]!;

  return <LectureReportView lectureStructure={lectureStructure} />;
}

export default LectureReportContainer;
