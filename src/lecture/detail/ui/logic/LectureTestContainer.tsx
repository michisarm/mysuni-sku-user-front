import LearningState from 'lecture/detail/model/LearningState';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import React, { useEffect, useState } from 'react';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  const { lectureId, contentType, contentId } = useLectureRouterParams();
  const [testItem] = useLectureTest();

  return (
    <>
      {testItem !== undefined && (
        <LectureTestView testItem={testItem} lectureId={lectureId} />
      )}
    </>
  );
}

export default LectureTestContainer;
