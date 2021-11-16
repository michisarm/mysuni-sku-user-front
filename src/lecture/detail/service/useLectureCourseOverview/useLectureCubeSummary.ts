/* eslint-disable consistent-return */

import { reactAlert } from '@nara.platform/accent';
import { useEffect, useState } from 'react';
import { addInMyLecture, removeInMyLecture } from '../../api/mytrainingApi';
import {
  getInMyLectureCdo,
  onLectureCubeSummary,
} from '../../store/LectureOverviewStore';
import { getLectureParams } from '../../store/LectureParamsStore';
import LectureCubeSummary from '../../viewModel/LectureOverview/LectureCubeSummary';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { findIsBookmark } from './useLectureCourseSummary';
import {
  addBookMark,
  deleteBookMark,
  reqeustBookmark,
} from '../../../../shared/service/requestBookmarks';

type Value = LectureCubeSummary | undefined;

export async function toggleCubeBookmark() {
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
export function useLectureCubeSummary(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCubeSummary-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCubeSummary((next) => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
