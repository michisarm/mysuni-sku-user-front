import React, { useEffect } from 'react';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { getLectureSurvey } from '../../service/useLectureSurvey/utility/getLectureSurvey';
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
