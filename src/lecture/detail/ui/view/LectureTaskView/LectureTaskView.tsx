import { LectureTask } from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback } from 'react';

import { Segment } from 'semantic-ui-react';
import {
  getLectureTaskTab,
  useLectureTaskTab,
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
import { useLectureTask } from '../../../service/useLectureTask/useLectureTask';
import { useLocation } from 'react-router-dom';

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

const LectureTaskView: React.FC<LectureTaskViewProps> = function LectureTaskView({
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
  const tabType = useLectureTaskTab();

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
        <div className="lms-sticky-menu">
          <div className="lms-fixed-inner">
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
                <LectureCubeInfoView lectureDescription={lectureDescription} />
              )}
              {lectureTags && <LectureTagsView lectureTags={lectureTags} />}
            </div>
          </>
        )}
      </Segment>
    </Fragment>
  );
};

export default LectureTaskView;
