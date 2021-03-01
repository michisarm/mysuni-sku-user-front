import React from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { Image } from 'semantic-ui-react';

const LectureSurveyChoiceLayout: React.FC<LectureSurveyItem> = function LectureSurveyChoiceLayout({
  no,
  title,
  image,
  children,
  isRequired,
}) {
  console.log(title)
  return (
    <div className="course-radio-survey">
      <p>
        <span>{no}.</span>
        {isRequired === true && (
          <>
            <span>{ title }</span>
            <span className="importantBtn">
              <Image
                style={{
                  display: 'inline-block',
                  marginLeft: '7px',
                  verticalAlign: 'text-bottom',
                }}
                src={`${process.env.PUBLIC_URL}/images/all/survey-important.png`}
              />
            </span>
          </>
        )}
        {isRequired === true && (
          <>
            <span>{ title }</span>
          </>
        )}
      </p>
      {children}
    </div>
  );
};

export default LectureSurveyChoiceLayout;
