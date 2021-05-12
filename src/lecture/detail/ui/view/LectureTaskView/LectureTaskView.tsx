import { LectureTask } from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useEffect } from 'react';

import { Segment, List, Icon } from 'semantic-ui-react';
import {
  getLectureTaskTab,
  useLectureTaskTab,
} from 'lecture/detail/store/LectureTaskStore';
import LectureTaskPostView from './LectureTaskPostView';
import LectureTaskMyPostView from './LectureTaskMyPostView';
// import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
// import LectureSubcategory from 'lecture/detail/viewModel/LectureOverview/LectureSubcategory';
// import LectureTags from 'lecture/detail/viewModel/LectureOverview/LectureTags';
// import LectureFile from 'lecture/detail/viewModel/LectureOverview/LectureFile';
// import LectureDescriptionView from '../LectureOverview/LectureDescriptionView';
// import LectureFileView from '../LectureOverview/LectureFileView';
// import LectureCubeInfoView from '../LectureOverview/LectureCubeInfoView';
// import LectureTagsView from '../LectureOverview/LectureTagsView';
// import LectureSubcategoryView from '../LectureOverview/LectureCubeSubcategoryView';
import { useLectureTask } from '../../../service/useLectureTask/useLectureTask';
import { useLocation, useHistory } from 'react-router-dom';

interface LectureTaskViewProps {
  taskItem?: LectureTask;
  // lectureDescription?: LectureDescription;
  // lectureSubcategory?: LectureSubcategory;
  // lectureTags?: LectureTags;
  // lectureFile?: LectureFile;
  moreView?: (offset: number) => void;
  handleClickTaskRow?: (param: object) => void;
  listHashLink?: (hash: string) => void;
  overviewHashLink?: (hash: string) => void;
  handelClickCreateTask?: () => void;
  sortChage: (data: any) => void;
  pageChage: (data: any) => void;
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
  // lectureDescription,
  // lectureSubcategory,
  // lectureTags,
  // lectureFile,
  moreView,
  handleClickTaskRow,
  listHashLink,
  overviewHashLink,
  handelClickCreateTask,
  sortChage,
  pageChage,
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
        {/* <div className="lms-sticky-menu">
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
        </div> */}
        
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
            sortChage={sortChage}
            pageChage={pageChage}
            activePage={activePage}
            totalPage={totalPage}
          />
        )}
        {/* {tabType === 'MyPosts' && taskItem && (
          <>
            <LectureTaskMyPostView
              key={`LectureTaskPostView-${tabType}`}
              taskItem={taskItem}
              moreView={moreView!}
              handleClickTaskRow={onHandleClickTaskRow}
              handelClickCreateTask={handelClickCreateTask!}
            />
          </>
        )} */}
        {/* {tabType === 'Overview' && (
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
        )} */}
      </Segment>
    </Fragment>
  );
};

export default LectureTaskView;
