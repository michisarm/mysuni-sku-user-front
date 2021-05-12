import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useState } from 'react';

import moment from 'moment';
import { Button, Icon, Pagination } from 'semantic-ui-react';
import LectureTaskTopLineView from './LectureTaskTopLineView';
import { getLectureTaskOffset } from 'lecture/detail/store/LectureTaskStore';

interface LectureTaskPostViewProps {
  taskItem: LectureTask;
  moreView: (offset: number) => void;
  handleClickTaskRow: (param: object) => void;
  handelClickCreateTask: () => void;
  sortChage: (data: any) => void;
  pageChage: (data: any) => void;
  activePage: number;
  totalPage: number;

}

function renderPostRow(task: LectureTaskItem, handleClickTaskRow: any) {
  let childElement = null;

  if (task.childItems) {
    childElement = task.childItems.map((child, index) => {
      return (
        <div className="depth2" key={`post-depth2-${index}`}>
          <a
            href="#detail"
            key={index}
            onClick={() => handleClickTaskRow({ id: child.id, type: 'child', boardId: task.boardId })}
          >
            <span className="title">
              <Icon className="reply16-b" />
              {child.title}
              {child.count !== 0 && <span>[{child.count}]</span>}
            </span>
            <span className="writer">{child.writer}</span>
            <span className="view">{child.readCount}</span>
            <span className="date">
              {task.time && moment(task.time).format('YYYY.MM.DD')}
            </span>
          </a>
        </div>
      );
    });
  }

  return (
    <>
      <div className="depth1">
        {task.delete === false && (
            <a
              href="#detail"
              onClick={() => handleClickTaskRow({ id: task.id, type: 'parent', boardId: task.boardId })}
            >
              <span className={`title ${task.pinned === 2 ? "important" : ''}`}>
                <span className={`ellipsis ${task.pinned === 1 ? "pincet-icon" : ''}`}>
                  {task.title}
                </span>
                <span className="rep-num">
                  {task.count !== 0 && ( `[${task.count}]` )}
                </span>
              </span>
              <span className="writer">{task.writer}</span>
              <span className="view">{task.readCount} 읽음</span>
              <span className="date">
                {task.time && moment(task.time).format('YYYY.MM.DD')}
              </span>
            </a>
        )}
        {task.delete === true && (
            <span className="del">
              <Icon className="listdel24" />
              <span className="blind">삭제됨</span>
              <span>삭제된 글입니다.</span>
            </span>
        )}
      </div>
      {childElement}
    </>
  );
}

const LectureTaskPostView: React.FC<LectureTaskPostViewProps> = function LectureTaskPostView({
  taskItem,
  moreView,
  handleClickTaskRow,
  handelClickCreateTask,
  sortChage,
  pageChage,
  activePage,
  totalPage
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
    <>
      <LectureTaskTopLineView
        totalCount={taskItem.totalCount}
        handelClickCreateTask={handelClickCreateTask}
        sortChage={sortChage}
      />
      <div className="community-list">
        {taskItem.items.map((task, index) => (
          <Fragment key={`post-${task.id}`}>
            {renderPostRow(task, onHandleClickTaskRow)}
          </Fragment>
        ))}
      </div>
      <div className="lms-paging-holder">
        {taskItem && taskItem.totalCount ? (
          <Pagination
            activePage={activePage}
            totalPages={totalPage}
            onPageChange={(e, data) => pageChage(data)}
          />
        ) : (null)}
      </div>
      {/* {taskItem.items.length < taskItem.totalCount && (
          <div className="more-comments" onClick={onHandleClickMoreView}>
            <Button icon className="left moreview">
              <Icon className="moreview" />
              list more
            </Button>
          </div>
        )} */}
    </>
  );
};

export default LectureTaskPostView;
