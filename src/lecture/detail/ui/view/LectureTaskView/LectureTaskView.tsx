import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useState } from 'react';

import moment from 'moment';
import { Button, Icon, Segment } from 'semantic-ui-react';
import LectureTaskTopLineView from './LectureTaskTopLineView';
import {
  getLectureTaskOffset,
  getLectureTaskTab,
} from 'lecture/detail/store/LectureTaskStore';
import LectureTaskPostView from './LectureTaskPostView';
import LectureTaskMyPostView from './LectureTaskMyPostView';
import { useEffect } from 'react';

interface LectureTaskViewProps {
  taskItem: LectureTask;
  moreView: (offset: number) => void;
  handleClickTaskRow: (param: object) => void;
  hashLink: (hash: string) => void;
  handelClickCreateTask: () => void;
}

function renderPostRow(task: LectureTaskItem, handleClickTaskRow: any) {
  let childElement = null;

  if (task.childItems) {
    childElement = task.childItems.map((child, index) => {
      return (
        <a
          target="_blank"
          className="row reply"
          key={index}
          onClick={() => handleClickTaskRow({ id: child.id, type: 'child' })}
        >
          <span className="cell title">
            <Icon className="reply16-b" />
            <span className="blind">reply</span>
            <span className="ellipsis">
              {child.title}[{child.count}]
            </span>
          </span>
          <span className="cell category">{child.writer}</span>
          <span className="cell status">{child.readCount}</span>
          <span className="cell date">
            {task.time && moment(task.time).format('YYYY.MM.DD')}
          </span>
        </a>
      );
    });
  }

  return (
    <>
      <a
        target="_blank"
        className="row"
        onClick={() => handleClickTaskRow({ id: task.id, type: 'child' })}
      >
        <span className="cell title">
          <span className="inner">
            <span className="ellipsis">
              {task.title}[{task.count}]
            </span>
          </span>
        </span>
        <span className="cell category">{task.writer}</span>
        <span className="cell status">{task.readCount}</span>
        <span className="cell date">
          {task.time && moment(task.time).format('YYYY.MM.DD')}
        </span>
      </a>
      {childElement}
    </>
  );
}

const LectureTaskView: React.FC<LectureTaskViewProps> = function LectureTestView({
  taskItem,
  moreView,
  handleClickTaskRow,
  hashLink,
  handelClickCreateTask,
}) {
  const [activatedTab, setActivatedTab] = useState<string>('Posts');

  const onHandleClickTaskRow = useCallback(
    param => {
      handleClickTaskRow(param);
    },
    [taskItem]
  );

  const onHandleClickMoreView = useCallback(() => {
    moreView(getLectureTaskOffset()!);
  }, []);

  const postsHashClick = useCallback(() => {
    hashLink('Posts');
    setActivatedTab('Posts');
  }, []);

  const myPostsHashClick = useCallback(() => {
    hashLink('MyPosts');
    setActivatedTab('MyPosts');
  }, []);

  const overViewHashClick = useCallback(() => {
    hashLink('lms-related-badge');
    setActivatedTab('Overview');
  }, []);

  return (
    <Fragment>
      <Segment className="full">
        <div className="support-list-wrap">
          <div className="lms-inner-menu">
            <a
              onClick={postsHashClick}
              className={activatedTab === 'Posts' ? 'lms-act' : ''}
            >
              Posts
            </a>
            <a
              onClick={myPostsHashClick}
              className={activatedTab === 'MyPosts' ? 'lms-act' : ''}
            >
              My Posts
            </a>
            <a
              onClick={overViewHashClick}
              className={activatedTab === 'Overview' ? 'lms-act' : ''}
            >
              Overview
            </a>
          </div>
          {activatedTab === 'Posts' && (
            <LectureTaskPostView
              taskItem={taskItem}
              moreView={moreView}
              handleClickTaskRow={param => onHandleClickTaskRow(param)}
              handelClickCreateTask={handelClickCreateTask}
            />
          )}
          {activatedTab === 'MyPosts' && (
            <>
              <span>마이포스트</span>
              <LectureTaskMyPostView
                taskItem={taskItem}
                moreView={moreView}
                handleClickTaskRow={onHandleClickTaskRow}
                handelClickCreateTask={handelClickCreateTask}
              />
            </>
          )}
          {activatedTab === 'Overview' && (
            <>
              <span>Overview</span>
            </>
          )}
        </div>
      </Segment>
    </Fragment>
  );
};

export default LectureTaskView;
