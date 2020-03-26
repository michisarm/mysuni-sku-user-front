
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface SurveyProp {
  onSurvey?: () => void
}

export const Survey = ({ onSurvey }: SurveyProp) => {
  //
  if (!onSurvey) return null;
  return (
    <Button className="surv" onClick={onSurvey}>
      <span>설문하기</span>
      <Icon className="ar-survay" />
    </Button>
  );
};

interface ReportProps {
  onDownloadReport?: () => void
}

export const Report = ({ onDownloadReport }: ReportProps) => {
  //
  if (!onDownloadReport) return null;
  return (
    <Button className="surv" onClick={onDownloadReport}>
      <span>Report Download</span>
      <Icon className="download3" />
    </Button>
  );
};

