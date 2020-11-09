import React from 'react';
import { SkProfileService } from '../../../../profile/stores';
import LectureCommentsContainer from '../../../category/ui/logic/LectureCommentsContainer';
import { useLectureComment } from '../../service/useLectureComments';

function LectureCommentContainer() {
  const [lectureComment] = useLectureComment();
  const {
    skProfile: {
      member: { company, department, email, name },
    },
  } = SkProfileService.instance;
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
        />
      )}
    </>
  );
}

export default LectureCommentContainer;