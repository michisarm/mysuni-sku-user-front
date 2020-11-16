import React from 'react';
import { Button } from 'semantic-ui-react';
import { LectureReport } from 'lecture/detail/viewModel/LectureReport';
import { getLectureReport } from 'lecture/detail/store/LectureReportStore';

interface ReportHeaderProps {}

const ReportHeader: React.FC<ReportHeaderProps> = function ReportHeader({}) {
  return (
    <div className="survey-header">
      <div className="survey-header-left">
        {getLectureReport()?.reportFileBox?.reportName}
      </div>
      <div className="survey-header-right">
        { getLectureReport()?.state !== 'None' && (
          <Button className="ui button free submit p18">
          {
            getLectureReport()?.state == 'Completed'
            ? '이수'
            : getLectureReport()?.state == 'Progress'
            ? '검수중'
            : '과제 제출'
            }
          </Button>
          )
        }
      </div>
    </div>
  );
};

export default ReportHeader;
