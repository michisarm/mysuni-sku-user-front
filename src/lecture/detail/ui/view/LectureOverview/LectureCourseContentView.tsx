import React, { useCallback, useState } from 'react';
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
import LectureBadge from '../../../viewModel/LectureOverview/LectureBadge';
import LectureBadgeView from './LectureBadgeView';

interface LectureCourseContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureInstructor?: LectureInstructor;
  lecturePrecourse?: LecturePrecourse;
  lectureBadge?: LectureBadge;
}

function hashLink(hash: string) {
  const element = document.getElementById(hash);
  if (element !== null) {
    element.scrollIntoView();
  }
}

const LectureCourseContentView: React.FC<LectureCourseContentViewProps> = function LectureCourseContentView({
  lectureDescription,
  lectureSubcategory,
  lectureTags,
  lectureInstructor,
  lecturePrecourse,
  lectureBadge,
}) {
  const [activatedTab, setActivatedTab] = useState<string>('overview');

  const overviewHashClick = useCallback(() => {
    hashLink('lms-overview');
    setActivatedTab('overview');
  }, []);
  const instructorHashClick = useCallback(() => {
    hashLink('lms-instructor-Info');
    setActivatedTab('instructor');
  }, []);
  const badgeHashClick = useCallback(() => {
    hashLink('lms-related-badge');
    setActivatedTab('badge');
  }, []);
  const relatedHashClick = useCallback(() => {
    hashLink('lms-related-process');
    setActivatedTab('related');
  }, []);

  return (
    <>
      {lecturePrecourse && lecturePrecourse.courses.length > 0 && (
        <LecturePrecourseView lecturePrecourse={lecturePrecourse} />
      )}

      <div className="lms-inner-menu" id="lms-overview">
        <a
          onClick={overviewHashClick}
          className={activatedTab === 'overview' ? 'lms-act' : ''}
        >
          Overview
        </a>
        <a
          onClick={instructorHashClick}
          className={activatedTab === 'instructor' ? 'lms-act' : ''}
        >
          강사정보
        </a>
        <a
          onClick={badgeHashClick}
          className={activatedTab === 'badge' ? 'lms-act' : ''}
        >
          관련 Badge
        </a>
        <a
          onClick={relatedHashClick}
          className={activatedTab === 'related' ? 'lms-act' : ''}
        >
          관련과정
        </a>
        <a href="#lms-comment" className="lms-comment">
          Comment<span className="count">+12</span>
        </a>
      </div>
      {lectureDescription && (
        <LectureDescriptionView htmlContent={lectureDescription.description} />
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
      {lectureBadge && <LectureBadgeView lectureBadge={lectureBadge} />}
    </>
  );
};

export default LectureCourseContentView;
