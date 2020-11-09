import React from 'react';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureDiscussionContainer from './LectureDiscussionContainer';

function LectureDiscussionPage() {
  return (
    <LectureDetailLayout>
      <LectureDiscussionContainer />
    </LectureDetailLayout>
  );
}

export default LectureDiscussionPage;
