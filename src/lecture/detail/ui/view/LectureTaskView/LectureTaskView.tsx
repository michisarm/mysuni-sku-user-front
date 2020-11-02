import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback } from 'react';

import moment from 'moment';
import { Button, Icon, Segment } from 'semantic-ui-react';
import LectureTaskTopLineView from './LectureTaskTopLineView';
import { getLectureTaskOffset } from 'lecture/detail/store/LectureTaskStore';

interface LectureTaskViewProps {
  taskItem: LectureTask;
  moreView: (offset: number) => void;
  handleClickTaskRow: (id: string) => void;
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
          onClick={() => handleClickTaskRow(child.id)}
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
        onClick={() => handleClickTaskRow(task.id)}
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
}) {
  const onHandleClickTaskRow = useCallback(
    taskId => {
      console.log('taskId', taskId);
      handleClickTaskRow(taskId);
    },
    [taskItem]
  );

  const onHandleClickMoreView = useCallback(() => {
    moreView(getLectureTaskOffset()!);
  }, []);

  return (
    <Fragment>
      <Segment className="full">
        <div className="support-list-wrap">
          <LectureTaskTopLineView totalCount={taskItem.totalCount} />

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
        </div>
      </Segment>
    </Fragment>
  );
};

export default LectureTaskView;
