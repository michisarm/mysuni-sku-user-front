import { reactAlert } from '@nara.platform/accent';
import { useLectureTestStudent } from 'lecture/detail/service/useLectureTest/useLectureTestStudent';

import React, { useEffect, useState } from 'react';
import {
  LectureTestAnswerItem,
  LectureTestItem,
} from '../../../viewModel/LectureTest';
import LectureParams from '../../../viewModel/LectureParams';
import LectureTestIntroView from './LectureTestIntroView';
import LectureTestResultView from './LectureTestResultView';
import LectureTestPaperView from './LectureTestPaperView';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { checkAnswerSheetAppliesCount } from '../../../service/useLectureTest/utility/getTestAnswerItemMapFromExam';
import { retryTestItemMap } from '../../../service/useLectureTest/utility/getTestItemMap';
import { getLectureTestAnswerItem } from '../../../store/LectureTestStore';

interface LectureTestViewProps {
  testItem: LectureTestItem;
  params: LectureParams;
  answerItem?: LectureTestAnswerItem;
}

const LectureTestView: React.FC<LectureTestViewProps> = function LectureTestView({
  testItem,
  params,
  answerItem,
}) {
  const [testStudentItem] = useLectureTestStudent();

  const [useTestIntroView, setUseTestIntroView] = useState<boolean>(true); // TEST 메인 화면
  const [useTestView, setUseTestView] = useState<boolean>(false); // TEST 화면
  const [useTestResultView, setUseTestResultView] = useState<boolean>(false); // TEST 결과 화면

  const openView = async (view: string) => {
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
    } else if (view === 'retry') {
      const checkApply = await checkAnswerSheetAppliesCount(
        params.cubeId || params.cardId
      );
      if (checkApply) {
        // 셔플시험지를 재조회하여 intro 노출
        retryTestItemMap(params);

        setUseTestIntroView(true);
        setUseTestView(false);
        setUseTestResultView(false);
      } else {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const week = new Array('일', '월', '화', '수', '목', '금', '토');
        const dateFormat =
          date.getMonth() +
          1 +
          '월 ' +
          date.getDate() +
          '일 ' +
          week[date.getDay()] +
          '요일';

        reactAlert({
          title: '알림',
          message:
            '일일 재응시 횟수가 ' +
            testItem.applyLimit +
            '회를 초과하여 Test 참여가 불가능합니다.<br/>' +
            dateFormat +
            '에 다시 도전해보세요!',
        });
      }
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
  /*
  useEffect(() => {
    const testStatus = lectureStructureItem?.student?.extraWork.testStatus;
    if (testStatus === 'PASS') {
      if (
        answerItem !== undefined &&
        lectureStructureItem?.student?.studentScore.examId ===
          answerItem.examId &&
        //!answerItem?.finished &&
        //!answerItem?.submitted &&
        answerItem.submitAnswers.length < 1
      ) {
        // 이수처리하여 답안이 없는경우
        reactAlert({
          title: '알림',
          message:
            'Card 학습을 이미 완료하셔서 테스트를 응시하실 필요 없습니다.',
        });
      }
    }
  }, [testStudentItem, answerItem, params, lectureStructureItem?.student]);
*/
  return (
    <>
      {useTestIntroView && testItem && (
        <LectureTestIntroView
          params={params}
          testItem={testItem}
          openView={openView}
          trials={answerItem?.trials || 0}
        />
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
