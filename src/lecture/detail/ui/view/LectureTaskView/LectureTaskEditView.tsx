import { PostForm, ReplyForm } from '@sku/personalcube';

import React, { Fragment } from 'react';
import { ContentLayout } from 'shared';

interface LectureTaskEditViewProps {
  postId: string;
  boardId: string;
  detailType?: string;
  handleOnClickList: () => void;
  handleCloseClick: () => void;
}

const LectureTaskEditView: React.FC<LectureTaskEditViewProps> = function LectureTeskView({
  postId,
  boardId,
  detailType,
  handleOnClickList,
  handleCloseClick,
}) {
  return (
    <Fragment>
      <ContentLayout className="content">
        {boardId && detailType === 'parent' && (
          <PostForm
            boardId={boardId}
            postId={postId && postId !== 'new' ? postId : ''}
            onCancel={handleCloseClick}
            onSaveCallback={handleCloseClick}
          />
        )}
        {boardId && detailType === 'child' && (
          <ReplyForm
            postId={boardId || ''}
            replyId={postId && postId !== 'new' ? postId : ''}
            onCancel={handleCloseClick}
            onSaveCallback={handleOnClickList}
          />
        )}
      </ContentLayout>
    </Fragment>
  );
};

export default LectureTaskEditView;
