import { reactAlert } from '@nara.platform/accent';
import { useLectureTestStudent } from 'lecture/detail/service/useLectureTest/useLectureTestStudent';
import { useLectureTestAnswer } from 'lecture/detail/service/useLectureTest/useLectureTestAnswer';

import React, { useEffect, useState } from 'react';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import LectureParams from '../../../viewModel/LectureParams';
import LectureTestIntroView from './LectureTestIntroView';
import LectureTestResultView from './LectureTestResultView';
import LectureTestPaperView from './LectureTestPaperView';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';

interface LectureTestViewProps {
  testItem: LectureTestItem;
  params: LectureParams;
}

const LectureTestView: React.FC<LectureTestViewProps> = function LectureTestView({
  testItem,
  params,
}) {
  const [testStudentItem] = useLectureTestStudent();
  const [answerItem] = useLectureTestAnswer();

  const [useTestIntroView, setUseTestIntroView] = useState<boolean>(true); // TEST 메인 화면
  const [useTestView, setUseTestView] = useState<boolean>(false); // TEST 화면
  const [useTestResultView, setUseTestResultView] = useState<boolean>(false); // TEST 결과 화면

  const openView = (view: string) => {
    if (view === 'intro') {
      setUseTestIntroView(true);
      setUseTestView(false);
      setUseTestResultView(false);
    } else if (view === 'test') {
      setUseTestIntroView(false);
      setUseTestView(true);
      setUseTestResultView(false);
    } else if (view === 'result') {
      setUseTestIntroView(false);
      setUseTestView(false);
      setUseTestResultView(true);
    } else {
      setUseTestIntroView(true);
      setUseTestView(false);
      setUseTestResultView(false);
    }
  };

  const lectureStructureItem = getActiveStructureItem(params.pathname);

  useEffect(() => {
    const testStatus = lectureStructureItem?.student?.extraWork.testStatus;
    if (
      testStatus === 'SUBMIT' ||
      testStatus === 'PASS' ||
      testStatus === 'FAIL'
    ) {
      openView('result');
    } else {
      openView('intro');
    }
  }, [params, testStudentItem, lectureStructureItem]);

  useEffect(() => {
    const testStatus = lectureStructureItem?.student?.extraWork.testStatus;
    if (testStatus === 'PASS') {
      if (
        answerItem !== undefined &&
        lectureStructureItem?.student?.studentScore.examId ===
          answerItem.examId &&
        !answerItem?.finished &&
        !answerItem?.submitted &&
        answerItem.submitAnswers.length < 1
      ) {
        // 이수처리하여 답안이 없는경우
        reactAlert({
          title: '알림',
          message:
            'Course 학습을 이미 완료하셔서 테스트를 응시하실 필요 없습니다.',
        });
      }
    }
  }, [testStudentItem, answerItem, params, lectureStructureItem?.student]);

  return (
    <>
      {useTestIntroView && testItem && (
        <LectureTestIntroView testItem={testItem} openView={openView} />
      )}
      {useTestResultView && testItem && testStudentItem && (
        <LectureTestResultView
          params={params}
          testItem={testItem}
          answerItem={answerItem}
          testStudentItem={testStudentItem}
          openView={openView}
        />
      )}
      {useTestView && testStudentItem && (
        <LectureTestPaperView
          params={params}
          testItem={testItem}
          answerItem={answerItem}
          testStudentItem={testStudentItem}
          openView={openView}
        />
      )}
    </>
  );
};

export default LectureTestView;
