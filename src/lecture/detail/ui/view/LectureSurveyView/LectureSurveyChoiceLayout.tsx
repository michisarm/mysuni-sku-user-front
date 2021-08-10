import React from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { Image } from 'semantic-ui-react';

const LectureSurveyChoiceLayout: React.FC<LectureSurveyItem> =
  function LectureSurveyChoiceLayout({
    no,
    title,
    image,
    children,
    isRequired,
  }) {
    return (
      <div className="course-radio-survey">
        <p>
          <span>{no}.</span>
          {isRequired === true && (
            <>
              <span>
                {title}
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

export default LectureSurveyChoiceLayout;
