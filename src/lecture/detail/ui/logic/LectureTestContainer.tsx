import React, { useEffect } from 'react';
import { useLectureRequestTest } from '../../service/useLectureTest/useLectureRequestTest';
import { useLectureTest } from '../../service/useLectureTest/useLectureTest';
import { useLectureTestAnswer } from '../../service/useLectureTest/useLectureTestAnswer';
import { useLectureParams } from '../../store/LectureParamsStore';
import { setLectureTestAnswerItem } from '../../store/LectureTestStore';
import LectureTestView from '../view/LectureTestView/LectureTestView';

function LectureTestContainer() {
  const params = useLectureParams();
  useEffect(() => {
    setLectureTestAnswerItem(undefined); // 초기화
  }, [params?.cardId, params?.cubeId]);

  useLectureRequestTest();
  const [testItem] = useLectureTest();
  const [answerItem] = useLectureTestAnswer();

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
