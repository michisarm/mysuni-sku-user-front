import React from 'react';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  const [testItem, answerItem] = useLectureTest();
  return (
    <>
      {testItem !== undefined && (
        <LectureTestView testItem={testItem} answerItem={answerItem} />
      )}
    </>
  );
}

export default LectureTestContainer;
