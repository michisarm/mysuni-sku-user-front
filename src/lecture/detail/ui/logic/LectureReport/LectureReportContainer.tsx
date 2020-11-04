import React from 'react';
import { useLectureReport } from '../../../service/useLectureReport/useLectureReport';
import LectureReportView from '../../view/LectureReportView/LectureReportView';

function LectureReportContainer() {
  const lectureReport = useLectureReport()[0]!;
  const setLectureReport = useLectureReport()[1]!;
  const setCubeLectureReport = useLectureReport()[2]!;

  return <LectureReportView lectureReport={lectureReport} setLectureReport={setLectureReport} setCubeLectureReport={setCubeLectureReport}/>;
}

export default LectureReportContainer;
