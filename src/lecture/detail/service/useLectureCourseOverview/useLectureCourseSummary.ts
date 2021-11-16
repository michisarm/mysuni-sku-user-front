import { reactAlert } from '@nara.platform/accent';
/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { addInMyLecture, removeInMyLecture } from '../../api/mytrainingApi';
import {
  getInMyLectureCdo,
  getLectureCardSummary,
  onLectureCardSummary,
  setLectureCardSummary,
  setLectureCardSummaryLearningState,
} from '../../store/LectureOverviewStore';
import LectureCardSummary from '../../viewModel/LectureOverview/LectureCardSummary';
import { studentInfoView } from 'lecture/detail/api/lectureApi';
import LectureParams from '../../viewModel/LectureParams';
import { getLectureParams } from '../../store/LectureParamsStore';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  addBookMark,
  deleteBookMark,
  reqeustBookmark,
} from 'shared/service/requestBookmarks';

type Value = LectureCardSummary | undefined;

export function findIsBookmark(cardId?: string) {
  if (cardId === undefined) {
    return false;
  }
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  return bookmarks.find((id: string) => {
    if (id === cardId) {
      return true;
    }

    return false;
  });
}

export async function toggleCardBookmark() {
  const params = getLectureParams();
  if (params === undefined) {
    return;
  }
  const { cardId } = params;

  const isBookmark = findIsBookmark(cardId);

  if (isBookmark) {
    await deleteBookMark(cardId);
    await reqeustBookmark();
    reactAlert({
      title: getPolyglotText('알림', '신규학습-신규목록-알림'),
      message: getPolyglotText(
        '본 과정이 관심목록에서 제외되었습니다.',
        '신규학습-신규목록-관심제외'
      ),
    });
  }

  if (!isBookmark) {
    await addBookMark(cardId);
    await reqeustBookmark();
    reactAlert({
      title: getPolyglotText('알림', '신규학습-신규목록-알림'),
      message: getPolyglotText(
        '본 과정이 관심목록에 추가되었습니다.',
        '신규학습-신규목록-관심추가'
      ),
    });
  }
}

let subscriberIdRef = 0;
export function useLectureCardSummary(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCardSummary-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCardSummary((next) => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}

// course 학습완료표시 learningState 위한
export async function getCardLectureSummary(
  params: LectureParams
): Promise<void> {
  if (typeof params === 'undefined') return;

  const { cardId } = params;
  const lectureStudentView = await studentInfoView({
    courseLectureIds: [],
    lectureCardIds: [],
    preLectureCardIds: [],
    serviceId: cardId,
  });

  const student: any = lectureStudentView.own;
  setLectureCardSummaryLearningState(student);
}
