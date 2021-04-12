import React from 'react';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import { useLectureParams } from '../../store/LectureParamsStore';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  const [testItem] = useLectureTest();
  const params = useLectureParams();
  console.log('testItem', testItem);
  return (
    <>
      {testItem !== undefined && params !== undefined && (
        <LectureTestView testItem={testItem} params={params} />
      )}
    </>
  );
}

export default LectureTestContainer;
