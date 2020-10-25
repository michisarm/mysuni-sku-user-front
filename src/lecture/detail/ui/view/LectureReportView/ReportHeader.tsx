import React from 'react';
import { Button } from 'semantic-ui-react';
import { LectureReport } from 'lecture/detail/viewModel/LectureReport';

interface ReportHeaderProps {lectureReport:LectureReport}

const ReportHeader: React.FC<ReportHeaderProps> = function ReportHeader({lectureReport}) {
  return (
    <div className="survey-header">
      <div className="survey-header-left">{lectureReport?.reportFileBox?.reportName}</div>
      <div className="survey-header-right">
        {/* TODO : state에 따른 텍스트 확인 필요 */}
        <Button className="ui button free submit p18">과제제출</Button>
      </div>
    </div>
  );
};

export default ReportHeader;
