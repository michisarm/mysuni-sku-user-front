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

// http://ma.mysuni.sk.com/api/depot/depotFile/multiple?depotIds=%255B%252250%2522%255D

interface LectureCubeContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureFile?: LectureFile;
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
}) {
  const [activatedTab, setActivatedTab] = useState<string>('overview');

  const overviewHashClick = useCallback(() => {
    hashLink('lms-overview');
    setActivatedTab('overview');
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
        <a href="#lms-comment" className="lms-comment">
          Comment<span className="count">+12</span>
        </a>
      </div>
      {lectureDescription && (
        <LectureDescriptionView htmlContent={lectureDescription.description} />
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
  );
};

export default LectureCubeContentView;
