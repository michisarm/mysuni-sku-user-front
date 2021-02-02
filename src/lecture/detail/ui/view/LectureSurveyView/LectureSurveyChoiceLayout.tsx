import React from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';


const LectureSurveyChoiceLayout: React.FC<LectureSurveyItem> = function LectureSurveyChoiceLayout({
  no,
  title,
  image,
  children,
  isRequired
})
 {
  const BUTTON_STYLE: React.CSSProperties = {
    'position': 'absolute',
    'left': '25px',
    'top': '50%',
    'marginTop': '-.625rem',
    'content': "필수",
    'width': '2.25rem',
    'height': '1.5rem',
    'display': 'inline-block',
    'lineHeight': '1.375rem',
    'textAlign': 'center',
    'border': '.0625rem solid #e1002a',
    'boxSizing': 'border-box',
    'color': '#e1002a',
    'fontSize': '.75rem',
    'fontWeight': 'bold',
    'letterSpacing': '-.01875rem',
    'borderRadius': '.25rem',
  } 
  return (
    <div className="course-radio-survey">
      <p>
        <span>{no}.</span>
        {isRequired === true && (
          <>
            <span style={BUTTON_STYLE}>필수</span>
            <span style={{margin: '0 0 0 35px'}}>{title}</span>
          </>
        )}
        {isRequired === false && (
          <>
            {title}
          </>
        )}
      </p>
      {image && <img src={image} />}
      {children}
    </div>
  );
};

export default LectureSurveyChoiceLayout;
