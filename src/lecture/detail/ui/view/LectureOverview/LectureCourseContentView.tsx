import React, { useCallback, useState, useRef, useEffect } from 'react';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import LectureDescriptionView from './LectureDescriptionView';
import LectureSubcategoryView from './LectureCourseSubcategoryView';
import LectureTagsView from './LectureTagsView';
import LectureInstructorView from './LectureInstructorView';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';
import LecturePrecourseView from './LecturePrecourseView';
import LectureBadge from '../../../viewModel/LectureOverview/LectureBadge';
import LectureBadgeView from './LectureBadgeView';
import LectureComment from '../../../viewModel/LectureComment/LectureComment';
import LectureCommentContainer from '../../logic/LectureCommentContainer';
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';
import LectureRelationsView from './LectureRelationsView';
import './LectureCubeContentView.css';

interface LectureCourseContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureInstructor?: LectureInstructor;
  lecturePrecourse?: LecturePrecourse;
  lectureBadge?: LectureBadge;
  lectureComment?: LectureComment;
  lectureRelations?: LectureRelations;
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
  lectureComment,
  lectureRelations,
}) {
  const [fixed, setFixed] = useState<boolean>(false);
  // useEffect(() => {
  //   const options = {};
  //   const observer = new IntersectionObserver(intersectionCallback, options);
  //   function intersectionCallback(entries: IntersectionObserverEntry[]) {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         setFixed(false);
  //       } else {
  //         setFixed(true);
  //       }
  //     });
  //   }
  //   const lmsOverviewTop = document.getElementById('lms-overview-top');
  //   if (lmsOverviewTop !== null) {
  //     observer.observe(lmsOverviewTop);
  //   }
  //   return () => observer.disconnect();
  // }, []);
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
  const commentHashClick = useCallback(() => {
    setActivatedTab('comment');
  }, []);

  return (
    <>
      {lecturePrecourse && lecturePrecourse.courses.length > 0 && (
        <LecturePrecourseView lecturePrecourse={lecturePrecourse} />
      )}
      <div id="lms-overview-top" />
      <div
        className={`lms-sticky-menu ${fixed ? 'lms-fixed' : ''}`}
        id="lms-overview"
      >
        <div className="lms-fixed-inner" id="lms-overview">
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
          <a
            onClick={commentHashClick}
            className={
              activatedTab === 'comment' ? 'lms-comment lms-act' : 'lms-comment'
            }
          >
            <i className="lms-comment-icon" />
            Comments
            <span className="count">
              {lectureComment !== undefined && lectureComment.commentsCount > 0
                ? `+${lectureComment.commentsCount}`
                : ''}
            </span>
          </a>
        </div>
      </div>
      {activatedTab !== 'comment' && (
        <>
          {lectureDescription && (
            <LectureDescriptionView
              htmlContent={lectureDescription.description}
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
          {lectureBadge && <LectureBadgeView lectureBadge={lectureBadge} />}
          {lectureRelations &&
            Array.isArray(lectureRelations.lectures) &&
            lectureRelations.lectures.length > 0 && (
              <LectureRelationsView lectureRelations={lectureRelations} />
            )}
        </>
      )}
      {activatedTab === 'comment' && <LectureCommentContainer />}
    </>
  );
};

export default LectureCourseContentView;
