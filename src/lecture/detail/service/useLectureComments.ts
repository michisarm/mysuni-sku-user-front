/* eslint-disable consistent-return */

import { CommentService } from '@nara.drama/feedback';
import { autorun } from 'mobx';
import { useEffect, useRef, useState } from 'react';
import {
  getLectureComment,
  onLectureComment,
  setLectureComment,
} from '../store/LectureOverviewStore';
import LectureComment from '../viewModel/LectureComment/LectureComment';

type Value = LectureComment | undefined;

let subscriberIdRef = 0;
export function useLectureComment(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  // TODO 화면이 갱신되지 않아 주석처리
  // useEffect(() => {
  //   const commentService = CommentService.instance;
  //   return autorun(() => {
  //     const count = commentService.commentCount.count;
  //     const feedbackId = commentService.commentCount.feedbackId;
  //     const next = getLectureComment();
  //     if (next !== undefined && next.commentId === feedbackId) {
  //       setLectureComment({ ...next, commentsCount: count });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const next = `useLectureComment-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureComment(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
