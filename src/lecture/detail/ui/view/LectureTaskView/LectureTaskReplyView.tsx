import { ReplyForm } from '@sku/personalcube';

import React, { Fragment } from 'react';
import { ContentLayout } from 'shared';

interface LectureTaskReplyViewProps {
  postId: string;
  boardId: string;
  replyId?: string;
  handleOnClickList: () => void;
  handleCloseClick: () => void;
}

const LectureTaskReplyView: React.FC<LectureTaskReplyViewProps> = function LectureTeskView({
  postId,
  replyId,
  handleOnClickList,
  handleCloseClick,
}) {
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
