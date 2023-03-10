import { CommentService, ReviewService } from '@nara.drama/feedback';
import { autorun } from 'mobx';
import React, { useEffect, useRef } from 'react';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { SkProfileService } from '../../../../profile/stores';
import LectureCommentsContainer from '../../../category/ui/logic/LectureCommentsContainer';
import { updateLectureReview } from '../../service/useLectuerCubeOverview/utility/updateLectureReview';
import { useLectureComment } from '../../service/useLectureComments';
import { useLectureCubeSummary } from '../../service/useLectureCourseOverview/useLectureCubeSummary';
import { setLectureComment } from '../../store/LectureOverviewStore';

function LectureCommentContainer() {
  const [lectureComment] = useLectureComment();
  const [lectureSummary] = useLectureCubeSummary();
  const {
    skProfile: {
      companyName,
      departmentName,
      name,
      email,
      // member: { company, department, email, name },
    },
  } = SkProfileService.instance;
  return (
    <>
      {lectureComment && lectureSummary && (
        <LectureCommentsContainer
          commentFeedbackId={lectureComment.commentId}
          companyName={parsePolyglotString(companyName)}
          departmentName={parsePolyglotString(departmentName)}
          email={email}
          name={JSON.stringify(name)}
          hasPinRole={lectureSummary.hasPinRole}
        />
      )}
    </>
  );
}

export default LectureCommentContainer;
