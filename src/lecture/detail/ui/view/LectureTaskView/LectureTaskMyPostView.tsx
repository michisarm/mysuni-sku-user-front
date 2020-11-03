import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useState } from 'react';

import moment from 'moment';
import { Button, Icon, Segment } from 'semantic-ui-react';
import LectureTaskTopLineView from './LectureTaskTopLineView';
import { getLectureTaskOffset } from 'lecture/detail/store/LectureTaskStore';

interface LectureTaskMyPostViewProps {
  taskItem: LectureTask;
  moreView: (offset: number) => void;
  handleClickTaskRow: (id: string) => void;
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
        onClick={() => handleClickTaskRow({ id: task.id, type: 'parent' })}
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

const LectureTaskMyPostView: React.FC<LectureTaskMyPostViewProps> = function LectureTestView({
  taskItem,
  moreView,
  handleClickTaskRow,
  handelClickCreateTask,
}) {
  const [activatedTab, setActivatedTab] = useState<string>('myPost');

  const onHandleClickTaskRow = useCallback(
    param => {
      console.log('taskId', param);
      handleClickTaskRow(param);
    },
    [taskItem]
  );

  const onHandleClickMoreView = useCallback(() => {
    moreView(getLectureTaskOffset()!);
  }, []);

  return (
    <Fragment>
      <LectureTaskTopLineView
        totalCount={taskItem.totalCount}
        handelClickCreateTask={handelClickCreateTask}
      />

      {activatedTab === 'myPost' && (
        <>
          <div className="su-list qna">
            {taskItem.items.map((task, index) => {
              return renderPostRow(task, onHandleClickTaskRow);
            })}
          </div>
          {taskItem.items.length < taskItem.totalCount && (
            <div
              className="more-comments"
              onClick={() => onHandleClickMoreView()}
            >
              <Button icon className="left moreview">
                <Icon className="moreview" />
                list more
              </Button>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default LectureTaskMyPostView;
