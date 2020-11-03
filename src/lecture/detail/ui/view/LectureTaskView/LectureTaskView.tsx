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
import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
import LectureSubcategory from 'lecture/detail/viewModel/LectureOverview/LectureSubcategory';
import LectureTags from 'lecture/detail/viewModel/LectureOverview/LectureTags';
import LectureFile from 'lecture/detail/viewModel/LectureOverview/LectureFile';
import LectureDescriptionView from '../LectureOverview/LectureDescriptionView';
import LectureFileView from '../LectureOverview/LectureFileView';
import LectureCubeInfoView from '../LectureOverview/LectureCubeInfoView';
import LectureTagsView from '../LectureOverview/LectureTagsView';
import LectureSubcategoryView from '../LectureOverview/LectureCubeSubcategoryView';

interface LectureTaskViewProps {
  taskItem?: LectureTask;
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureFile?: LectureFile;
  moreView?: (offset: number) => void;
  handleClickTaskRow?: (param: object) => void;
  listHashLink?: (hash: string) => void;
  overviewHashLink?: (hash: string) => void;
  handelClickCreateTask?: () => void;
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
  lectureDescription,
  lectureSubcategory,
  lectureTags,
  lectureFile,
  moreView,
  handleClickTaskRow,
  listHashLink,
  overviewHashLink,
  handelClickCreateTask,
}) {
  const tabType = getLectureTaskTab();
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
        <div className="support-list-wrap">
          <div className="lms-inner-menu">
            <a
              onClick={postsHashClick}
              className={tabType === 'Posts' ? 'lms-act' : ''}
            >
              Posts
            </a>
            <a
              onClick={myPostsHashClick}
              className={tabType === 'MyPosts' ? 'lms-act' : ''}
            >
              My Posts
            </a>
            <a
              onClick={overViewHashClick}
              className={tabType === 'Overview' ? 'lms-act' : ''}
            >
              Overview
            </a>
          </div>
          {tabType === 'Posts' && taskItem && (
            <LectureTaskPostView
              taskItem={taskItem}
              moreView={moreView!}
              handleClickTaskRow={param => onHandleClickTaskRow(param)}
              handelClickCreateTask={handelClickCreateTask!}
            />
          )}
          {tabType === 'MyPosts' && taskItem && (
            <>
              <LectureTaskMyPostView
                taskItem={taskItem}
                moreView={moreView!}
                handleClickTaskRow={onHandleClickTaskRow}
                handelClickCreateTask={handelClickCreateTask!}
              />
            </>
          )}
          {tabType === 'Overview' && (
            <>
              {lectureDescription && (
                <LectureDescriptionView
                  htmlContent={lectureDescription.description}
                />
              )}
              <div className="badge-detail border-none">
                {lectureSubcategory && (
                  <LectureSubcategoryView
                    lectureSubcategory={lectureSubcategory}
                  />
                )}
                {lectureFile && <LectureFileView lectureFile={lectureFile} />}
                {lectureDescription && (
                  <LectureCubeInfoView
                    lectureDescription={lectureDescription}
                  />
                )}
                {lectureTags && <LectureTagsView lectureTags={lectureTags} />}
              </div>
            </>
          )}
        </div>
      </Segment>
    </Fragment>
  );
};

export default LectureTaskView;
