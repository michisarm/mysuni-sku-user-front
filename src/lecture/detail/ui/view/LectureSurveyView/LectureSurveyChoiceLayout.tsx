import React from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';

const LectureSurveyChoiceLayout: React.FC<LectureSurveyItem> = function LectureSurveyChoiceLayout({
  no,
  title,
  image,
  children,
}) {
  return (
    <div className="course-radio-survey">
      <p>
        <span>{no}</span>
        {title}
      </p>
      {image && <img src={image} />}
      {children}
    </div>
  );
};

export default LectureSurveyChoiceLayout;
