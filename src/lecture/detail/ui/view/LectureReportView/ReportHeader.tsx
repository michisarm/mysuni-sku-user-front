import React from 'react';
import { Button } from 'semantic-ui-react';
import { useLectureReport } from '../../../store/LectureReportStore';

interface ReportHeaderProps {}

const ReportHeader: React.FC<ReportHeaderProps> = function ReportHeader({}) {
  const lectureReport = useLectureReport();
  return (
    <>
      {lectureReport && (
        <div className="survey-header">
          <div className="survey-header-left">
            {lectureReport.reportFileBox?.reportName}
          </div>
          <div className="survey-header-right">
            {lectureReport.state !== 'None' && (
              <Button className="ui button free submit p18">
                {lectureReport.state == 'Completed'
                  ? '이수'
                  : lectureReport.state == 'Progress'
                  ? '검수중'
                  : '과제 제출'}
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReportHeader;
