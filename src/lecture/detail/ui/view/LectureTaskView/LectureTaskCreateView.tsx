import { PostForm } from '@sku/personalcube';
import React, { Fragment } from 'react';
import { ContentLayout } from 'shared';

interface LectureTaskCreateViewProps {
  postId: string;
  boardId: string;
  detailType?: string;
  // moreView: (offset: number) => void;
  handleOnClickList: () => void;
  handleCloseClick: () => void;
}

const LectureTaskCreateView: React.FC<LectureTaskCreateViewProps> = function LectureTeskView({
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
            onSaveCallback={handleOnClickList}
          />
        )}
      </ContentLayout>
    </Fragment>
  );
};

export default LectureTaskCreateView;
