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
  requestBookmark,
} from '../../../../shared/service/requestBookmarks';

type Value = LectureCubeSummary | undefined;

export async function toggleCubeBookmark(
  onChangeIsBookmark: (isBookmark: boolean) => void
) {
  const params = getLectureParams();
  if (params === undefined) {
    return;
  }
  const { cardId } = params;

  const isBookmark = findIsBookmark(cardId);

  if (isBookmark) {
    deleteBookMark(cardId).then((bookmarks) => {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      onChangeIsBookmark(!isBookmark);
    });
  }

  if (!isBookmark) {
    addBookMark(cardId).then((bookmarks) => {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      onChangeIsBookmark(!isBookmark);
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
