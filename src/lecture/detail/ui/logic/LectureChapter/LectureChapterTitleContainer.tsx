import React from 'react';
import LectureChapterTitleView from '../../view/LectureChapterView/LectureChapterTitleView';
import { useLearningContent } from '../../../store/LearningContentStore';

function LectureChapterTitleContainer() {
  const LearningContent = useLearningContent();

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
