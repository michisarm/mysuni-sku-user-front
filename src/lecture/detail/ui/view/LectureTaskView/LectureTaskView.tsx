import { LectureTask } from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useEffect } from 'react';

import { Segment, List, Icon } from 'semantic-ui-react';
import {
  getLectureTaskTab,
  useLectureTaskTab,
} from 'lecture/detail/store/LectureTaskStore';
import LectureTaskPostView from './LectureTaskPostView';
import LectureTaskMyPostView from './LectureTaskMyPostView';
import { useLectureTask } from '../../../service/useLectureTask/useLectureTask';
import { useLocation, useHistory } from 'react-router-dom';

interface LectureTaskViewProps {
  taskItem?: LectureTask;
  moreView?: (offset: number) => void;
  handleClickTaskRow?: (param: object) => void;
  listHashLink?: (hash: string) => void;
  overviewHashLink?: (hash: string) => void;
  handelClickCreateTask?: () => void;
  sortChange: (data: any) => void;
  pageChange: (data: any) => void;
  activePage: number;
  totalPage: number;
  cubePostCount: number;
  cubeCommentCount: number;
  cubeSubCommentCount: number;
  postCount: number;
  commentCount: number;
  subCommentCount: number;
}

const LectureTaskView: React.FC<LectureTaskViewProps> = function LectureTaskView({
  taskItem,
  moreView,
  handleClickTaskRow,
  listHashLink,
  overviewHashLink,
  handelClickCreateTask,
  sortChange,
  pageChange,
  activePage,
  totalPage,
  cubePostCount,
  cubeCommentCount,
  cubeSubCommentCount,
  postCount,
  commentCount,
  subCommentCount,
}) {
  const tabType = useLectureTaskTab();
  const { hash, pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (hash) {
      history.replace(pathname);
    }
  }, []);

  const onHandleClickTaskRow = useCallback(
    param => {
      handleClickTaskRow!(param);
    },
    [taskItem]
  );

  const postsHashClick = useCallback(() => {
    listHashLink!('Posts');
  }, []);

  const myPostsHashClick = useCallback(() => {
    listHashLink!('MyPosts');
  }, []);

  const overViewHashClick = useCallback(() => {
    overviewHashLink!('Overview');
  }, []);

  return (
    <Fragment>
      <Segment className="full">
        <div className="scrolling-area area2 ">
            <div className="ui segment full">
              <List as="ul" className="my-task-bar">
                <List.Item as="li"><Icon className="my-post"/> My Post<em><strong>{postCount}건</strong>/{cubePostCount}건</em></List.Item>
                <List.Item as="li"><Icon className="my-comment"/> My Comment<em><strong>{commentCount}건</strong>/{cubeCommentCount}건</em></List.Item>
                <List.Item as="li"><Icon className="my-comment-reply"/>My Comment Reply<em><strong>{subCommentCount}건</strong>/{cubeSubCommentCount}건</em></List.Item>
              </List>
            </div>
        </div>
        {tabType === 'Posts' && taskItem && (
          <LectureTaskPostView
            key={`LectureTaskPostView-${tabType}`}
            taskItem={taskItem}
            moreView={moreView!}
            handleClickTaskRow={param => onHandleClickTaskRow(param)}
            handelClickCreateTask={handelClickCreateTask!}
            sortChange={sortChange}
            pageChange={pageChange}
            activePage={activePage}
            totalPage={totalPage}
          />
        )}
      </Segment>
    </Fragment>
  );
};

export default LectureTaskView;
