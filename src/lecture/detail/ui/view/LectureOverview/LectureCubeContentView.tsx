import React, { useCallback, useEffect, useState } from 'react';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import LectureDescriptionView from './LectureDescriptionView';
import LectureFileView from './LectureFileView';
import LectureSubcategoryView from './LectureCubeSubcategoryView';
import LectureTagsView from './LectureTagsView';
import LectureCubeInfoView from './LectureCubeInfoView';
import LectureCommentContainer from '../../logic/LectureCommentContainer';
import LectureComment from '../../../viewModel/LectureComment/LectureComment';
import LectureClassroom from '../../../viewModel/LectureClassroom';
import LectureClassroomView from './LectureClassroomView';
import LectureClassroomInfoView from './LectureClassroomInfoView';
import './LectureCubeContentView.css';

interface LectureCubeContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureFile?: LectureFile;
  lectureComment?: LectureComment;
  lectureClassroom?: LectureClassroom;
}

function hashLink(hash: string) {
  const element = document.getElementById(hash);
  if (element !== null) {
    element.scrollIntoView();
  }
}

const LectureCubeContentView: React.FC<LectureCubeContentViewProps> = function LectureCubeContentView({
  lectureDescription,
  lectureSubcategory,
  lectureTags,
  lectureFile,
  lectureComment,
  lectureClassroom,
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
  const classroomHashClick = useCallback(() => {
    hashLink('lms-classroom');
    setActivatedTab('classroom');
  }, []);
  const commentHashClick = useCallback(() => {
    setActivatedTab('comment');
  }, []);

  // 스티키 적용 시 필요한 코드
  // useEffect(() => {
  //   if (activatedTab === 'comment') {
  //     setTimeout(() => {
  //       const element = document.getElementById('lms-overview');
  //       if (element !== null) {
  //         element.scrollIntoView();
  //       }
  //     }, 0);
  //   }
  // }, [activatedTab]);

  return (
    <>
      <div id="lms-overview-top" />
      <div
        className={`lms-sticky-menu ${fixed ? 'lms-fixed' : ''}`}
        id="lms-overview"
      >
        <div className="lms-fixed-inner">
          <a
            onClick={overviewHashClick}
            className={activatedTab === 'overview' ? 'lms-act' : ''}
          >
            Overview
          </a>
          {lectureClassroom && (
            <a
              onClick={classroomHashClick}
              className={activatedTab === 'classroom' ? 'lms-act' : ''}
            >
              차수정보
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
              {lectureComment !== undefined
                ? `+${lectureComment.commentsCount}`
                : ''}
            </span>
          </a>
        </div>
      </div>
      {(activatedTab === 'overview' || activatedTab === 'classroom') && (
        <>
          {lectureDescription && (
            <LectureDescriptionView
              htmlContent={lectureDescription.description}
            />
          )}
          <div className="badge-detail border-none">
            {lectureSubcategory && (
              <LectureSubcategoryView lectureSubcategory={lectureSubcategory} />
            )}
            {lectureFile && <LectureFileView lectureFile={lectureFile} />}
            {lectureDescription && (
              <LectureCubeInfoView lectureDescription={lectureDescription} />
            )}
            {lectureTags && <LectureTagsView lectureTags={lectureTags} />}
            {lectureClassroom && (
              <LectureClassroomInfoView lectureClassroom={lectureClassroom} />
            )}
          </div>
          {lectureClassroom && (
            <LectureClassroomView lectureClassroom={lectureClassroom} />
          )}
        </>
      )}
      {activatedTab === 'comment' && <LectureCommentContainer />}
    </>
  );
};

export default LectureCubeContentView;
