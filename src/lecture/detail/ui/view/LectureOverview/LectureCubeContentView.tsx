import React, { useCallback, useState } from 'react';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import LectureDescriptionView from './LectureDescriptionView';
import LectureFileView from './LectureFileView';
import LectureSubcategoryView from './LectureCubeSubcategoryView';
import LectureTagsView from './LectureTagsView';
import LectureCubeInfoView from './LectureCubeInfoView';
import { LectureCubeCommentsContainer } from '../../logic/LectureCubeCommentsContainer';
import LectureComment from '../../../viewModel/LectureComment/LectureComment';

// http://ma.mysuni.sk.com/api/depot/depotFile/multiple?depotIds=%255B%252250%2522%255D

interface LectureCubeContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureFile?: LectureFile;
  lectureComment?: LectureComment;
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
}) {
  const [activatedTab, setActivatedTab] = useState<string>('overview');

  const overviewHashClick = useCallback(() => {
    setActivatedTab('overview');
  }, []);
  const commentHashClick = useCallback(() => {
    setActivatedTab('comment');
  }, []);
  return (
    <>
      <div className="lms-inner-menu" id="lms-overview">
        <a
          onClick={overviewHashClick}
          className={activatedTab === 'overview' ? 'lms-act' : ''}
        >
          Overview
        </a>
        <a
          onClick={commentHashClick}
          className={
            activatedTab === 'comment' ? 'lms-comment lms-act' : 'lms-comment'
          }
        >
          Comment
          <span className="count">
            {lectureComment !== undefined
              ? `+${lectureComment.commentsCount}`
              : ''}
          </span>
        </a>
      </div>
      {activatedTab === 'overview' && (
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
          </div>
        </>
      )}
      {activatedTab === 'comment' && <LectureCubeCommentsContainer />}
    </>
  );
};

export default LectureCubeContentView;
