import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { useLectureTestStudent } from 'lecture/detail/service/useLectureTest/useLectureTestStudent';
import { useLectureTestAnswer } from 'lecture/detail/service/useLectureTest/useLectureTestAnswer';

import React, { useEffect, useState } from 'react';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import LectureParams from '../../../viewModel/LectureParams';
import LectureTestIntroView from './LectureTestIntroView';
import LectureTestResultView from './LectureTestResultView';
import LectureTestPaperView from './LectureTestPaperView';

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

  useEffect(() => {
    if (testStudentItem !== undefined) {
      if (
        testStudentItem.learningState === 'Failed' ||
        testStudentItem.learningState === 'Missed' ||
        testStudentItem.learningState === 'TestWaiting' ||
        testStudentItem.learningState === 'Passed' ||
        testStudentItem.learningState === 'TestPassed'
      ) {
        openView('result');
      } else {
        openView('intro');
      }
    } else {
      openView('intro');
    }
  }, [params, testStudentItem]);

  useEffect(() => {
    if (
      testStudentItem !== undefined &&
      testStudentItem.learningState !== undefined &&
      (testStudentItem.learningState === 'Passed' ||
        testStudentItem.learningState === 'TestPassed')
    ) {
      if (
        answerItem !== undefined &&
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
  }, [testStudentItem, answerItem, params]);

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
