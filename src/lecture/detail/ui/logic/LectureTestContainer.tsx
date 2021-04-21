import React from 'react';
import { useLectureRequestTest } from '../../service/useLectureTest/useLectureRequestTest';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import { useLectureParams } from '../../store/LectureParamsStore';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  useLectureRequestTest();
  const [testItem] = useLectureTest();
  const params = useLectureParams();

  return (
    <>
      {testItem !== undefined && params !== undefined && (
        <LectureTestView testItem={testItem} params={params} />
      )}
    </>
  );
}

export default LectureTestContainer;
