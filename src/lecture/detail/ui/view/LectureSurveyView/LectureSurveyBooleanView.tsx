import React from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

const LectureSurveyBooleanView: React.FC<LectureSurveyItem> = function LectureSurveyBooleanView(
  props
) {
  return (
    <LectureSurveyChoiceLayout {...props}>
      <div className="preview">
        <div
          className="lms-toggle init"
          style={{ position: 'relative', top: '0' }}
        >
          {/*처음 로딩시 className="lms-switch init"*/}
          {/*클릭이후  className="lms-switch"*/}
          <label htmlFor="sld2" className="lms-switch init">
            <input type="checkbox" id="sld2" />
            <span className="slider" />
            <span className="lms-radio-text" />
          </label>
        </div>
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyBooleanView;
