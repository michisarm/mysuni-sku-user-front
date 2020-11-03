import { CommentList } from '@nara.drama/feedback';
import { BoardService, PostForm } from '@sku/personalcube';
import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useRef } from 'react';
import { Checkbox } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';

interface LectureTaskCreateViewProps {
  postId: string;
  boardId: string;
  // moreView: (offset: number) => void;
  handleOnClickList: () => void;
  handleCloseClick: () => void;
}

const LectureTaskCreateView: React.FC<LectureTaskCreateViewProps> = function LectureTestView({
  postId,
  boardId,
  handleOnClickList,
  handleCloseClick,
}) {
  // const { boardService, collegeService } = this.props;
  // const { board } = boardService as BoardService;
  const boardService = BoardService.instance;
  boardService.board.id = boardId;

  const textContainerRef = useRef<HTMLDivElement>(null);

  console.log('boardId', boardId);
  // const board = {
  //   id: boardId,
  // };
  const a = boardId;
  return (
    <Fragment>
      <ContentLayout className="content">
        <span>{boardId}</span>
        <PostForm
          boardId={a}
          // boardId={boardId}
          postId={postId && postId !== 'new' ? postId : ''}
          onCancel={handleCloseClick}
          onSaveCallback={handleOnClickList}
        />
      </ContentLayout>
    </Fragment>
  );
};

export default LectureTaskCreateView;
