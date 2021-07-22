import React from 'react';
import { Button } from 'semantic-ui-react';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
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
                  ? getPolyglotText('이수', 'Report-Report-이수')
                  : lectureReport.state == 'Progress'
                  ? getPolyglotText('검수중', 'Report-Report-검수중이수')
                  : getPolyglotText('과제 제출', 'Report-Report-과제제출')}
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReportHeader;
