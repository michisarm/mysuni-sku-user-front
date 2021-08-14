import React from 'react';
import LectureChapterTitleView from '../../view/LectureChapterView/LectureChapterTitleView';
import { useLearningContent } from '../../../store/LearningContentStore';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

function LectureChapterTitleContainer() {
  const LearningContent = useLearningContent();

  return (
    <>
      {LearningContent && (
        <LectureChapterTitleView
          name={parsePolyglotString(LearningContent.name)}
          description={LearningContent.description}
        />
      )}
    </>
  );
}

export default LectureChapterTitleContainer;
