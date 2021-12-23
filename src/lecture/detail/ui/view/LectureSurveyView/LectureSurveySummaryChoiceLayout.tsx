import React from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { Image } from 'semantic-ui-react';
import { SkProfileService } from 'profile/stores';

const LectureSurveySummaryChoiceLayout: React.FC<LectureSurveyItem> =
  function LectureSurveySummaryChoiceLayout({
    no,
    title,
    children,
    isRequired,
  }) {
    let iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important.png`;
    if (SkProfileService.instance.skProfile.language === 'English') {
      iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important-2.png`;
    }
    if (SkProfileService.instance.skProfile.language === 'Chinese') {
      iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important-3.png`;
    }
    return (
      <div className="course-radio-survey-new">
        <p>
          <span>{no}.</span>
          {isRequired === true && (
            <>
              <span>
                {title}
                <span className="importantBtn">
                  <Image
                    style={{ display: 'inline-block' }}
                    src={iconRequired}
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

export default LectureSurveySummaryChoiceLayout;
