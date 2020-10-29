import LectureParams from 'lecture/detail/viewModel/LectureParams';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  const [testItem] = useLectureTest();
  const params = useParams<LectureParams>();

  return (
    <>
      {testItem !== undefined && (
        <LectureTestView testItem={testItem} params={params} />
      )}
    </>
  );
}

export default LectureTestContainer;
