import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback } from 'react';

import moment from 'moment';
import { Icon, Pagination } from 'semantic-ui-react';
import LectureTaskTopLineView from './LectureTaskTopLineView';
import { getLectureTaskOffset } from 'lecture/detail/store/LectureTaskStore';
import { NoSuchContentPanel } from 'shared';

interface LectureTaskPostViewProps {
  taskItem: LectureTask;
  moreView: (offset: number) => void;
  handleClickTaskRow: (param: object) => void;
  handelClickCreateTask: () => void;
  sortChange: (data: any) => void;
  pageChange: (data: any) => void;
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
  sortChange,
  pageChange,
  activePage,
  totalPage
}) {
  const onHandleClickTaskRow = useCallback(
    param => {
      handleClickTaskRow(param);
    },
    [taskItem]
  );

  return (
    <>
      <LectureTaskTopLineView
        totalCount={taskItem.totalCount}
        handelClickCreateTask={handelClickCreateTask}
        sortChange={sortChange}
      />
      <div className="community-list">
        { taskItem &&
            taskItem.items &&
              taskItem.items.length > 0 ? (
                taskItem.items.map((task, index) => (
                  <Fragment key={`post-${task.id}`}>
                    {renderPostRow(task, onHandleClickTaskRow)}
                  </Fragment>
                ))
        ) : (
          <NoSuchContentPanel message="등록된 게시글이 없습니다." />
        )}
      </div>
      <div className="lms-paging-holder">
        {taskItem && taskItem.totalCount ? (
          <Pagination
            activePage={activePage}
            totalPages={totalPage}
            onPageChange={(e, data) => pageChange(data)}
          />
        ) : (null)}
      </div>
    </>
  );
};

export default LectureTaskPostView;
