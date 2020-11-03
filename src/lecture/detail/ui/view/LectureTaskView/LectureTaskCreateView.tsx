import { CommentList } from '@nara.drama/feedback';
import { BoardService, PostForm } from '@sku/personalcube';
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

interface LectureTaskCreateViewProps {
  taskId: string;
  postId: string;
  boardId: string;
  // moreView: (offset: number) => void;
  handleOnClickList: (id: string) => void;
  handleCloseClick: () => void;
}

const LectureTaskCreateView: React.FC<LectureTaskCreateViewProps> = function LectureTestView({
  taskId,
  postId,
  boardId,
  handleOnClickList,
  handleCloseClick,
}) {
  return (
    <Fragment>
      <ContentLayout className="content">
        {boardId && (
          <PostForm
            boardId={boardId}
            postId={postId && postId !== 'new' ? postId : ''}
            onCancel={handleCloseClick}
            onSaveCallback={handleCloseClick}
          />
        )}
      </ContentLayout>
    </Fragment>
  );
};

export default LectureTaskCreateView;
