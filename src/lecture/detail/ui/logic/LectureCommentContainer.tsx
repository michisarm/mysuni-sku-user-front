import { CommentService, ReviewService } from '@nara.drama/feedback';
import { number } from '@storybook/addon-knobs';
import { autorun } from 'mobx';
import React, { useEffect, useRef } from 'react';
import { SkProfileService } from '../../../../profile/stores';
import LectureCommentsContainer from '../../../category/ui/logic/LectureCommentsContainer';
import { updateLectureReview } from '../../service/useLectuerCubeOverview/utility/updateLectureReview';
import { useLectureComment } from '../../service/useLectureComments';
import {
  setLectureComment,
  getInMyLectureCdo,
} from '../../store/LectureOverviewStore';

function LectureCommentContainer() {
  const [lectureComment] = useLectureComment();
  const {
    skProfile: {
      member: { company, department, email, name },
    },
  } = SkProfileService.instance;

  useEffect(() => {
    if (lectureComment === undefined) {
      return;
    }
    return autorun(() => {
      const commentsCount = CommentService.instance.commentCount.count;
      if (lectureComment.commentsCount !== commentsCount) {
        setLectureComment({ ...lectureComment, commentsCount });
      }
    });
  }, [lectureComment, CommentService.instance.commentCount]);
  const ratingRef = useRef<number>(ReviewService.instance.rating);
  useEffect(() => {
    return autorun(() => {
      if (ratingRef.current !== ReviewService.instance.rating) {
        updateLectureReview();
      }
    });
  }, [ReviewService.instance.rating]);

  const currentUrl = window.location.href;
  const url = currentUrl.split('/lecture');
  const lecture = getInMyLectureCdo();
  const creator = lecture?.servicePatronKeyString;

  return (
    <>
      {lectureComment && (
        <LectureCommentsContainer
          commentFeedbackId={lectureComment.commentId}
          reviewFeedbackId={lectureComment.reviewId}
          companyName={company}
          departmentName={department}
          email={email}
          name={name}
          url={url[1]}
          creator={creator}
        />
      )}
    </>
  );
}

export default LectureCommentContainer;
