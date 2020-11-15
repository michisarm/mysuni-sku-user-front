import LectureParams from 'lecture/detail/viewModel/LectureParams';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  const [testItem] = useLectureTest();
  const params = useLectureRouterParams();

  return (
    <>
      {testItem !== undefined && params !== undefined && (
        <LectureTestView testItem={testItem} params={params} />
      )}
    </>
  );
}

export default LectureTestContainer;
