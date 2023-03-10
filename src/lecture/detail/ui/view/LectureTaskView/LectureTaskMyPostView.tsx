import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useState } from 'react';

import moment from 'moment';
import { Button, Icon, Segment } from 'semantic-ui-react';
import LectureTaskTopLineView from './LectureTaskTopLineView';
import { getLectureTaskOffset } from 'lecture/detail/store/LectureTaskStore';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

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
        <div className="depth2">
          <a
            href="#detail"
            key={index}
            onClick={() => handleClickTaskRow({ id: child.id, type: 'child' })}
          >
            <span className="title">
              <Icon className="reply16-b" />
              {child.title}
              {child.count !== 0 && <span>[{child.count}]</span>}
            </span>
            <span className="writer">{child.writer}</span>
            <span className="view">{child.readCount}</span>
            <span className="date">
              {task.registeredTime && moment(task.registeredTime).format('YYYY.MM.DD')}
            </span>
          </a>
        </div>
      );
    });
  }

  return (
    <>
      {task.delete === false && (
        <div className="depth1">
          <a
            href="#detail"
            onClick={() => handleClickTaskRow({ id: task.id, type: 'parent' })}
          >
            {task.count !== 0 && (
              <span className="title">
                {task.title}[{task.count}]
              </span>
            )}
            {task.count === 0 && <span className="title">{task.title}</span>}
            <span className="writer">{task.writer}</span>
            <span className="view">{task.readCount}
              {' '}<PolyglotText defaultString="??????" id="Collage-TaskMyPostView-ReadCount" />
            </span>
            <span className="date">
              {task.registeredTime && moment(task.registeredTime).format('YYYY.MM.DD')}
            </span>
          </a>
        </div>
      )}
      {task.delete === true && (
        <div className="depth1">
          <span className="del">
            <Icon className="listdel24" />
            <span className="blind">
              <PolyglotText defaultString="?????????" id="Collage-TaskMyPostView-?????????" />
            </span>
            <span>
              <PolyglotText defaultString="????????? ????????????." id="Collage-TaskMyPostView-????????????" />
            </span>
          </span>
        </div>
      )}
      {childElement}
    </>
  );
}

const LectureTaskMyPostView: React.FC<LectureTaskMyPostViewProps> = function LectureTaskMyPostView({
  taskItem,
  moreView,
  handleClickTaskRow,
  handelClickCreateTask,
}) {
  const onHandleClickTaskRow = useCallback(
    param => {
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
      <>
        <div className="community-list">
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
              <PolyglotText defaultString="list more" id="Collage-TaskMyPostView-list more" />
            </Button>
          </div>
        )}
      </>
    </Fragment>
  );
};

export default LectureTaskMyPostView;
