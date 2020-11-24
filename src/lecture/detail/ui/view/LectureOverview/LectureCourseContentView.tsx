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
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureFileView from './LectureFileView';

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
  navigatorState?: any;
}

function hashLink(hash: string) {
  const element = document.getElementById(hash);
  if (element !== null) {
    console.log('el', element, 'hash', hash);

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
  navigatorState,
  lectureFile,
}) {
  const [scrollValue, setScrollValue] = useState<any>();

  const [nowScroll, setNowScroll] = useState<any>(0);
  const [activeTab, setActiveTab] = useState<any>();

  const [overView, setOverView] = useState<any>();
  const [teacher, setTeacher] = useState<any>();
  const [aboutBadge, setAboutBadge] = useState<any>();
  const [aboutCourse, setAboutCourse] = useState<any>();

  const [overViewArea, setOverViewArea] = useState<number>(0);
  const [teacherArea, setTeacherArea] = useState<number>(0);
  const [aboutBadgeArea, setAboutBadgeArea] = useState<number>(0);
  const [aboutCourseArea, setAboutCourseArea] = useState<number>(0);

  const [height, setHeight] = useState<number>(0);

  // 실시간 스크롤 감시
  useEffect(() => {
    const onScroll = () => setNowScroll(window.pageYOffset);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 탭 스크롤 추출
  const tabScrollRef = useCallback(
    node => {
      if (lecturePrecourse === undefined || lectureDescription === undefined) {
        return;
      }
      if (node !== null) {
        setScrollValue(
          window.pageYOffset + node.getBoundingClientRect().top - 100
        );
      }
    },
    [lecturePrecourse, lectureDescription, navigatorState]
  );

  const overViewRef = useCallback(
    node => {
      if (
        lectureSubcategory === undefined ||
        lectureDescription === undefined
      ) {
        return;
      }
      if (node !== null) {
        setOverView(
          window.pageYOffset + node.getBoundingClientRect().top - 100
        );
        setOverViewArea(
          window.pageYOffset + node.getBoundingClientRect().bottom
        );
      }
    },
    [lectureSubcategory, lectureDescription, height, navigatorState]
  );

  const teacherRef = useCallback(
    node => {
      if (
        lectureSubcategory === undefined ||
        lectureTags === undefined ||
        lectureDescription === undefined
      ) {
        return;
      }
      if (node !== null || undefined) {
        setTeacher(window.pageYOffset + node.getBoundingClientRect().top - 100);
        setTeacherArea(
          window.pageYOffset + node.getBoundingClientRect().y + 100
        );
      }
    },
    [
      lectureSubcategory,
      lectureTags,
      lectureDescription,
      height,
      navigatorState,
    ]
  );

  const aboutBadgeRef = useCallback(
    node => {
      if (
        lectureSubcategory === undefined ||
        lectureDescription === undefined
      ) {
        return;
      }
      if (node !== null) {
        setAboutBadge(
          window.pageYOffset + node.getBoundingClientRect().top - 100
        );
        setAboutBadgeArea(
          window.pageYOffset + node.getBoundingClientRect().bottom
        );
      }
    },
    [lectureSubcategory, lectureDescription, height, navigatorState]
  );

  const aboutCourseRef = useCallback(
    node => {
      if (
        lectureSubcategory === undefined ||
        lectureDescription === undefined
      ) {
        return;
      }
      if (node !== null) {
        setAboutCourse(
          window.pageYOffset + node.getBoundingClientRect().top - 100
        );
        setAboutCourseArea(
          window.pageYOffset + node.getBoundingClientRect().bottom
        );
      }
    },
    [lectureSubcategory, lectureDescription, height, navigatorState]
  );

  console.log(
    '현재 스크롤',
    nowScroll,
    '탭 위치',
    scrollValue,
    '오버뷰',
    overView,
    '오버뷰 바텀',
    overViewArea,
    '강사',
    teacher,
    '강사 바텀',
    teacherArea,
    '관련뱃지',
    aboutBadge
  );
  // console.log('overview bottom', overViewArea, overView);

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
    hashLink('lms-comment');
    setActivatedTab('comment');
  }, []);

  const getHeightFunc = useCallback(node => {
    if (node !== null) {
      if (node.clientHeight) {
        setHeight(node.clientHeight);
      }
    }
  }, []);

  return (
    <>
      {lecturePrecourse && lecturePrecourse.courses.length > 0 && (
        <LecturePrecourseView lecturePrecourse={lecturePrecourse} />
      )}
      <div
        className={
          nowScroll >= scrollValue
            ? 'lms-sticky-menu lms-fixed'
            : 'lms-sticky-menu'
        }
        ref={tabScrollRef}
      >
        <div className="lms-fixed-inner">
          <a
            onClick={overviewHashClick}
            className={
              nowScroll >= overView && nowScroll < overViewArea
                ? nowScroll < overView
                  ? ''
                  : 'lms-act'
                : ''
            }
          >
            Overview
          </a>
          {lectureInstructor &&
            Array.isArray(lectureInstructor.instructors) &&
            lectureInstructor.instructors.length > 0 && (
              <a
                onClick={instructorHashClick}
                className={
                  nowScroll >= teacher && nowScroll < teacherArea
                    ? nowScroll < teacher
                      ? ''
                      : 'lms-act'
                    : ''
                }
              >
                강사정보
              </a>
            )}
          {lectureBadge &&
            Array.isArray(lectureBadge.badges) &&
            lectureBadge.badges.length > 0 && (
              <a
                onClick={badgeHashClick}
                className={
                  nowScroll >= aboutBadge && nowScroll < aboutBadgeArea
                    ? nowScroll < aboutBadge
                      ? ''
                      : 'lms-act'
                    : ''
                }
              >
                관련 Badge
              </a>
            )}
          {lectureRelations &&
            Array.isArray(lectureRelations.lectures) &&
            lectureRelations.lectures.length > 0 && (
              <a
                onClick={relatedHashClick}
                className={
                  nowScroll >= aboutCourse && nowScroll < aboutCourseArea
                    ? nowScroll < aboutCourse
                      ? ''
                      : 'lms-act'
                    : ''
                }
              >
                관련과정
              </a>
            )}
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
            <div id="lms-overview" ref={overViewRef}>
              <LectureDescriptionView
                htmlContent={lectureDescription.description}
                getHeightFunc={getHeightFunc}
              />
            </div>
          )}
          <div className="badge-detail">
            {lectureSubcategory && (
              <LectureSubcategoryView lectureSubcategory={lectureSubcategory} />
            )}
            {lectureFile && <LectureFileView lectureFile={lectureFile} />}
            {lectureTags && <LectureTagsView lectureTags={lectureTags} />}
          </div>
          {lectureInstructor &&
            Array.isArray(lectureInstructor.instructors) &&
            lectureInstructor.instructors.length > 0 && (
              <div
                className="badge-detail"
                ref={teacherRef}
                id="lms-instructor-Info"
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
              <div id="lms-related-badge" ref={aboutBadgeRef}>
                <LectureBadgeView lectureBadge={lectureBadge} />
              </div>
            )}
          {lectureRelations &&
            Array.isArray(lectureRelations.lectures) &&
            lectureRelations.lectures.length > 0 && (
              <div id="lms-related-process" ref={aboutCourseRef}>
                <LectureRelationsView lectureRelations={lectureRelations} />
              </div>
            )}
        </>
      )}
      {activatedTab === 'comment' && <LectureCommentContainer />}
    </>
  );
};

export default LectureCourseContentView;
