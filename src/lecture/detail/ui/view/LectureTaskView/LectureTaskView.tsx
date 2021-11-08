import { LectureTask } from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useEffect } from 'react';

import { Segment, List, Icon } from 'semantic-ui-react';
import { useLectureTaskTab } from 'lecture/detail/store/LectureTaskStore';
import LectureTaskPostView from './LectureTaskPostView';
import { useLocation, useHistory } from 'react-router-dom';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';

interface LectureTaskViewProps {
  taskItem?: LectureTask;
  moreView?: (offset: number) => void;
  handleClickTaskRow?: (param: object) => void;
  handelClickCreateTask?: () => void;
  sortChange: (data: any) => void;
  pageChange: (data: any) => void;
  activePage: number;
  totalPage: number;
  isStudent: boolean;
  cubeAutomaticCompletion: boolean;
  cubePostCount: number;
  cubeCommentCount: number;
  postCount: number;
  commentCount: number;
}

const LectureTaskView: React.FC<LectureTaskViewProps> =
  function LectureTaskView({
    taskItem,
    moreView,
    handleClickTaskRow,
    handelClickCreateTask,
    sortChange,
    pageChange,
    activePage,
    totalPage,
    isStudent,
    cubeAutomaticCompletion,
    cubePostCount,
    cubeCommentCount,
    postCount,
    commentCount,
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
      (param) => {
        handleClickTaskRow!(param);
      },
      [taskItem]
    );

    return (
      <Fragment>
        <Segment className="full">
          {isStudent && cubeAutomaticCompletion && (
            <div className="scrolling-area area2 ">
              <div className="ui segment full">
                <List as="ul" className="my-task-bar">
                  {cubePostCount > 0 && (
                    <List.Item as="li">
                      <Icon className="my-post" />
                      <PolyglotText
                        defaultString="My Post"
                        id="Collage-Task-myPost"
                      />{' '}
                      <em
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            '<strong>{postCount}건<strong>/{cubePostCount}건',
                            'Collage-Task-MyPost건수',
                            {
                              postCount: (postCount && postCount).toString(),
                              cubePostCount: (
                                cubePostCount && cubePostCount
                              ).toString(),
                            }
                          ),
                        }}
                      />
                    </List.Item>
                  )}
                  {cubeCommentCount > 0 && (
                    <List.Item as="li">
                      <Icon className="my-comment" />
                      <PolyglotText
                        defaultString="My reply"
                        id="Collage-Task-reply"
                      />{' '}
                      <em
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            '<strong>{commentCount}건</strong>/{cubeCommentCount}건',
                            'Collage-Task-Myreply건수',
                            {
                              commentCount: (
                                commentCount && commentCount
                              ).toString(),
                              cubeCommentCount: (
                                cubeCommentCount && cubeCommentCount
                              ).toString(),
                            }
                          ),
                        }}
                      />
                    </List.Item>
                  )}
                  {/* {cubeSubCommentCount > 0 && (
                      <List.Item as="li"><Icon className="my-comment-reply"/>My Comment Reply<em><strong>{subCommentCount}건</strong>/{cubeSubCommentCount}건</em></List.Item>
                    )} */}
                </List>
              </div>
            </div>
          )}
          {tabType === 'Posts' && taskItem && (
            <LectureTaskPostView
              key={`LectureTaskPostView-${tabType}`}
              taskItem={taskItem}
              moreView={moreView!}
              handleClickTaskRow={(param) => onHandleClickTaskRow(param)}
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
