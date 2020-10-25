import React from 'react';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import LectureDescriptionView from './LectureDescriptionView';
import LectureSubcategoryView from './LectureSubcategoryView';
import LectureTagsView from './LectureTagsView';
import LectureInstructorView from './LectureInstructorView';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';
import LecturePrecourseView from './LecturePrecourseView';

interface LectureContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureInstructor?: LectureInstructor;
  lecturePrecourse?: LecturePrecourse;
}

const LectureContentView: React.FC<LectureContentViewProps> = function LectureContentView({
  lectureDescription,
  lectureSubcategory,
  lectureTags,
  lectureInstructor,
  lecturePrecourse,
}) {
  return (
    <>
      {lecturePrecourse && lecturePrecourse.courses.length > 0 && (
        <LecturePrecourseView lecturePrecourse={lecturePrecourse} />
      )}
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
      {lectureDescription && (
        <LectureDescriptionView
          htmlContent={lectureDescription.description}
          rootId="lms-overview"
        />
      )}
      <div className="badge-detail">
        {lectureSubcategory && (
          <LectureSubcategoryView lectureSubcategory={lectureSubcategory} />
        )}
        {lectureTags && <LectureTagsView lectureTags={lectureTags} />}
      </div>
      <div className="badge-detail" id="lms-instructor-Info">
        <div className="ov-paragraph">
          {lectureInstructor && (
            <LectureInstructorView lectureInstructor={lectureInstructor} />
          )}
        </div>
      </div>
    </>
  );
};

export default LectureContentView;
