import React from 'react';
import LectureChapterTitleView from '../../view/LectureChapterView/LectureChapterTitleView';
import { getLearningContent } from '../../../store/LearningContentStore';

function LectureChapterTitleContainer() {
  const LearningContent = getLearningContent();

  return (
    <>
      {LearningContent && (
        <LectureChapterTitleView
          name={LearningContent.name}
          description={LearningContent.description}
        />
      )}
    </>
  );
}

export default LectureChapterTitleContainer;
