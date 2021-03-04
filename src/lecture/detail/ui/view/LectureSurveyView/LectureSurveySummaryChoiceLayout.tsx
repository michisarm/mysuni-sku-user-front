import React from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { Image } from 'semantic-ui-react';

const LectureSurveySummaryChoiceLayout: React.FC<LectureSurveyItem> = function LectureSurveySummaryChoiceLayout({
  no,
  title,
  image,
  children,
  isRequired,
}) {
  return (
    <div className="course-radio-survey-new">
      <p>
        <span>{no}.</span>
        {isRequired === true && (
          <>
            <span>{title}</span>
            <span className="importantBtn">
              <Image
                style={{ display: 'inline-block' }}
                src={`${process.env.PUBLIC_URL}/images/all/survey-important.png`}
              />
            </span>
          </>
        )}
        {isRequired === false && (
          <>
            <span>{title}</span>
          </>
        )}
      </p>
      {children}
    </div>
  );
};

export default LectureSurveySummaryChoiceLayout;
