import React from 'react';
import { useLectureRequestTest } from '../../service/useLectureTest/useLectureRequestTest';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import { useLectureTestAnswer } from '../../service/useLectureTest/useLectureTestAnswer';
import { useLectureParams } from '../../store/LectureParamsStore';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  useLectureRequestTest();
  const [testItem] = useLectureTest();
  const [answerItem] = useLectureTestAnswer();
  const params = useLectureParams();

  return (
    <>
      {testItem !== undefined && params !== undefined && (
        <LectureTestView
          testItem={testItem}
          params={params}
          answerItem={answerItem}
        />
      )}
    </>
  );
}

export default LectureTestContainer;
