import { CommentList } from '@nara.drama/feedback';
import { PostForm } from '@sku/personalcube';
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
  handleOnClickList,
  handleCloseClick,
}) {
  console.log('LectureTaskCreateView', taskId);
  const textContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      {/* <Segment className="full">
        <span>상세보기-{taskId}</span>
      </Segment> */}
      <ContentLayout
        className="content"
        // breadcrumb={[
        //   { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
        //   { text: `${college.name} Lecture`, path: routePaths.lectureCardOverviewPrev(college.collegeId, cubeId, lectureCardId) },
        //   { text: `${postId ? 'Edit Post' : 'New Post'}` },
        // ]}
      >
        <PostForm
          // boardId={(board && board.id) || ''}
          boardId="112222"
          postId={postId && postId !== 'new' ? postId : ''}
          onCancel={handleCloseClick}
          onSaveCallback={handleCloseClick}
        />
      </ContentLayout>
    </Fragment>
  );
};

export default LectureTaskCreateView;
