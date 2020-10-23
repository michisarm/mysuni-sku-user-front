import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
import React from 'react';
import LectureHtmlContentView from './LectureHtmlContentView';

interface LectureDescriptionViewProps {
  lectureDescription: LectureDescription;
}

const LectureDescriptionView: React.FC<LectureDescriptionViewProps> = function LectureDescriptionView({
  lectureDescription,
}) {
  return (
    <>
      <div className="lms-inner-menu">
        <a href="#lms-overview" className="lms-act">
          Overview
        </a>
        <a href="#lms-instructor-Info">강사정보</a>
        <a href="#lms-related-badge">관련 Badge</a>
        <a href="#lms-related-process" className="lms-act">
          관련과정
        </a>
        <a href="#lms-comment" className="lms-comment">
          Comment<span className="count">+12</span>
        </a>
      </div>
      <LectureHtmlContentView
        htmlContent={lectureDescription.description}
        rootId="lms-overview"
      />
    </>
  );
};

export default LectureDescriptionView;
