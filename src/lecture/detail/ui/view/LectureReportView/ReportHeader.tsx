import React, { Component } from 'react';
import { Icon, Dropdown, Button } from 'semantic-ui-react';

interface ReportHeaderProps {}

const ReportHeader: React.FC<ReportHeaderProps> = function ReportHeader({}) {
  return (
    <div className="survey-header">
      <div className="survey-header-left">팬데믹 현상에 대해 기술 하세요</div>
      <div className="survey-header-right">
        {/* <button class="ui button free submit p18">과제제출</button> */}
        <Button className="ui button free submit p18">과제제출</Button>
      </div>
    </div>
  );
};

export default ReportHeader;
