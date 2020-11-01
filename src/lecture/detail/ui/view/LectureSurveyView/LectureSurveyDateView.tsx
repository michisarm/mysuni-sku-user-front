import React from 'react';
import DatePicker from 'react-datepicker';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

const LectureSurveyDateView: React.FC<LectureSurveyItem> = function LectureSurveyDateView(
  props
) {
  return (
    <LectureSurveyChoiceLayout {...props}>
      <div className="ui h40 calendar" id="rangestart">
        <div className="ui input right icon">
          <DatePicker onChange={() => {}} selectsStart />
          <i className="calendar24 icon">
            <span className="blind">date</span>
          </i>
        </div>
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyDateView;
