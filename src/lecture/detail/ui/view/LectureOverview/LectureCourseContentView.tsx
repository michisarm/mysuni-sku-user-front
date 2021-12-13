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
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';
import LectureRelationsView from './LectureRelationsView';
import './LectureCubeContentView.css';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureFileView from './LectureFileView';
import { Action, Area } from 'tracker/model';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import LectureCourseFeedbackView from './LectureCourseFeedbackView';
import {
  useLectureCoureSatisfaction,
  initLectureCourseSatisfaction,
  useLectureCoureSFeedbackReview,
} from 'lecture/detail/store/LectureOverviewStore';

interface LectureCourseContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureFile?: LectureFile;
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

const LectureCourseContentView: React.FC<LectureCourseContentViewProps> =
  function LectureCourseContentView({
    lectureDescription,
    lectureSubcategory,
    lectureTags,
    lectureInstructor,
    lecturePrecourse,
    lectureBadge,
    lectureComment,
    lectureRelations,
    lectureFile,
  }) {
    const [activatedTab, setActivatedTab] = useState<string>('overview');
    const overviewHashClick = useCallback(() => {
      hashLink('lms-overview');
      setActivatedTab('overview');
    }, []);
    const reviewHashClick = useCallback(() => {
      hashLink('lms-review');
      setActivatedTab('review');
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
    const satisfaction =
      useLectureCoureSatisfaction() || initLectureCourseSatisfaction();
    const reviewAnswers = useLectureCoureSFeedbackReview();

    return (
      <>
        {lecturePrecourse && lecturePrecourse.prerequisiteCards.length > 0 && (
          <LecturePrecourseView lecturePrecourse={lecturePrecourse} />
        )}
        <div className="lms-sticky-menu">
          <div className="lms-fixed-inner" id="lms-overview">
            <a
              onClick={overviewHashClick}
              className={activatedTab === 'overview' ? 'lms-act' : ''}
              data-area={Area.CARD_TAB}
              data-action={Action.CLICK}
              data-action-name="CARD TAB 클릭::Overview"
            >
              <PolyglotText
                defaultString="Overview"
                id="Course-ContentsView-Overview"
              />
            </a>
            {satisfaction.surveyCaseId &&
              reviewAnswers !== undefined &&
              reviewAnswers?.length !== 0 && (
                <a
                  onClick={reviewHashClick}
                  className={activatedTab === 'review' ? 'lms-act' : ''}
                  data-area={Area.CARD_TAB}
                  data-action={Action.CLICK}
                  data-action-name="CARD TAB 클릭::Review"
                >
                  Review
                </a>
              )}
            {lectureInstructor &&
              Array.isArray(lectureInstructor.instructors) &&
              lectureInstructor.instructors.length > 0 && (
                <a
                  onClick={instructorHashClick}
                  className={activatedTab === 'instructor' ? 'lms-act' : ''}
                  data-area={Area.CARD_TAB}
                  data-action={Action.CLICK}
                  data-action-name="CARD TAB 클릭::강사정보"
                >
                  <PolyglotText
                    defaultString="강사정보"
                    id="Course-ContentsView-강사정보"
                  />
                </a>
              )}
            {lectureBadge &&
              Array.isArray(lectureBadge.badges) &&
              lectureBadge.badges.length > 0 && (
                <a
                  onClick={badgeHashClick}
                  className={activatedTab === 'badge' ? 'lms-act' : ''}
                  data-area={Area.CARD_TAB}
                  data-action={Action.CLICK}
                  data-action-name="CARD TAB 클릭::관련 Badge"
                >
                  <PolyglotText
                    defaultString="관련 Badge"
                    id="Course-ContentsView-관련 Badge"
                  />
                </a>
              )}
            {lectureRelations &&
              Array.isArray(lectureRelations.cards) &&
              lectureRelations.cards.length > 0 && (
                <a
                  onClick={relatedHashClick}
                  className={activatedTab === 'related' ? 'lms-act' : ''}
                  data-area={Area.CARD_TAB}
                  data-action={Action.CLICK}
                  data-action-name="CARD TAB 클릭::관련과정"
                >
                  <PolyglotText
                    defaultString="관련과정"
                    id="Course-ContentsView-관련과정"
                  />
                </a>
              )}
          </div>
        </div>

        {lectureDescription && (
          <LectureDescriptionView
            htmlContent={lectureDescription.description}
          />
        )}
        <div className="badge-detail" data-area={Area.CARD_TAG}>
          {lectureSubcategory && (
            <LectureSubcategoryView lectureSubcategory={lectureSubcategory} />
          )}
          {lectureFile && <LectureFileView lectureFile={lectureFile} />}
          {lectureTags && <LectureTagsView lectureTags={lectureTags} />}
        </div>
        {satisfaction.surveyCaseId &&
          reviewAnswers?.length !== 0 &&
          reviewAnswers !== undefined && <LectureCourseFeedbackView />}
        {lectureInstructor &&
          Array.isArray(lectureInstructor.instructors) &&
          lectureInstructor.instructors.length > 0 && (
            <div
              className="badge-detail"
              id="lms-instructor-Info"
              data-area={Area.CARD_EXPERT}
            >
              <div className="ov-paragraph">
                {lectureInstructor && (
                  <LectureInstructorView
                    lectureInstructor={lectureInstructor}
                  />
                )}
              </div>
            </div>
          )}
        {lectureBadge &&
          Array.isArray(lectureBadge.badges) &&
          lectureBadge.badges.length > 0 && (
            <LectureBadgeView lectureBadge={lectureBadge} />
          )}
        {lectureRelations &&
          Array.isArray(lectureRelations.cards) &&
          lectureRelations.cards.length > 0 && (
            <LectureRelationsView lectureRelations={lectureRelations} />
          )}
      </>
    );
  };

export default LectureCourseContentView;
