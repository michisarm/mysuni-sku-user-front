import React from 'react';
import { useLectureReport } from '../../../service/useLectureReport/useLectureReport';
import LectureReportView from '../../view/LectureReportView/LectureReportView';

function LectureReportContainer() {
  const [
    lectureReport,
    setLectureReport,
    setCubeLectureReport,
  ] = useLectureReport();

  return (
    <>
      {lectureReport && (
        <LectureReportView
          lectureReport={lectureReport}
          setLectureReport={setLectureReport}
          setCubeLectureReport={setCubeLectureReport}
        />
      )}
    </>
  );
}

export default LectureReportContainer;
