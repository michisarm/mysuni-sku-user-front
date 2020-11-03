import { CommentList } from '@nara.drama/feedback';
import { BoardService, PostForm, ReplyForm } from '@sku/personalcube';
import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';

interface LectureTaskReplyViewProps {
  postId: string;
  boardId: string;
  replyId?: string;
  // moreView: (offset: number) => void;
  handleOnClickList: () => void;
  handleCloseClick: () => void;
}

const LectureTaskReplyView: React.FC<LectureTaskReplyViewProps> = function LectureTestView({
  postId,
  boardId,
  replyId,
  handleOnClickList,
  handleCloseClick,
}) {
  console.log('postId', postId);
  console.log('boardId', boardId);
  return (
    <Fragment>
      <ContentLayout className="content">
        <ReplyForm
          postId={postId || ''}
          replyId={replyId && replyId !== 'new' ? replyId : ''}
          onCancel={handleCloseClick}
          onSaveCallback={handleOnClickList}
        />
      </ContentLayout>
    </Fragment>
  );
};

export default LectureTaskReplyView;
