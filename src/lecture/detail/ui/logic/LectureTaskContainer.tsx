import { useLectureTask } from 'lecture/detail/service/useLectureTask/useLectureTask';
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import LectureTaskView from '../view/LectureTaskView/LectureTaskView';
import {
  getLectureTaskDetail,
  setLectureTaskDetail,
  setLectureTaskOffset,
  setLectureTaskViewType,
  setLectureTaskOrder,
  getLectureTaskViewType,
} from '../../store/LectureTaskStore';
import { ContentLayout } from 'shared';
import LectureTaskDetailView from '../view/LectureTaskView/LectureTaskDetailView';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useLectureTaskDetail } from 'lecture/detail/service/useLectureTask/useLectureTaskDetail';
import LectureTaskCreateView from '../view/LectureTaskView/LectureTaskCreateView';
import { deleteCubeLectureTaskPost } from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import { useLectureDescription } from 'lecture/detail/service/useLectureCourseOverview/useLectureDescription';
import { useLectureTaskViewType } from 'lecture/detail/service/useLectureTask/useLectureTaskViewType';
import {
  getLectureTaskCreateItem,
  setLectureTaskCreateItem,
} from 'lecture/detail/store/LectureTaskCreateStore';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { updateLectureTask } from 'lecture/detail/service/useLectureTask/utility/updateLectureTask';
import { createLectureTask } from 'lecture/detail/service/useLectureTask/utility/createLectureTask';
import { useHistory, useLocation } from 'react-router-dom';
import { getTaskDetailCube } from '../../service/useLectureTask/utility/getTaskDetailCube';
import { getActiveStructureItem } from '../../utility/lectureStructureHelper';
import { LectureStructureCubeItem } from '../../viewModel/LectureStructure';
import { getLectureParams } from '../../store/LectureParamsStore';
import { useLectureState } from '../../store/LectureStateStore';
import { refresh } from '../../../../../src/lecture/detail/service/useLectureState/utility/cubeStateActions';
import { submitRegisterStudent } from '../../../../lecture/detail/service/useLectureState/utility/cubeStateActions';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { getCubeLectureTask } from '../../service/useLectureTask/utility/getCubeLectureTask';

function LectureTaskContainer() {
  const { hash } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (hash === '#create') {
      setLectureTaskViewType('create');
      setCreate(true);
      return;
    } else if (hash === '#edit') {
      setLectureTaskViewType('edit');
      return;
    } else if (hash === '#detail') {
      setLectureTaskViewType('detail');
      return;
    }
    if (getLectureTaskViewType() !== 'list') {
      setLectureTaskViewType('list');
      getCubeLectureTask();
    }
  }, [hash]);

  const lectureState = useLectureState();
  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const [lectureDescription] = useLectureDescription();
  const [viewType] = useLectureTaskViewType();
  const [detailTaskId, setDetailTaskId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [create, setCreate] = useState<boolean>();
  const [detailType, setDetailType] = useState<string>('');
  const [isReply, setIsReply] = useState<boolean>(false);
  const [activePage, _setActivePage] = useState<number>(() => {
    let page = 1;
    const search = window.location.search.replace('?', '');
    if (search.length > 0) {
      const searches = search.split('&');
      searches.forEach((c) => {
        const [key, value] = c.split('=');
        if (key === 'page' && !isNaN(parseInt(value)) && parseInt(value) > 1) {
          page = parseInt(value);
        }
      });
    }
    return page;
  });
  const [totalPage, setTotalPage] = useState<number>(1);
  // 이수정보 관련
  const [cubeAutomaticCompletion, setCubeAutomaticCompletion] =
    useState<boolean>(false);
  const [cubePostCount, setCubePostCount] = useState<number>(0);
  const [cubeCommentCount, setCubeCommentCount] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isStudent, setIsStudent] = useState<boolean>(false);

  const setActivePage = useCallback(
    (page: number) => {
      if (activePage === page) {
        return;
      }
      const params = getLectureParams();
      if (params === undefined) {
        return;
      }
      history.push({
        pathname: `/lecture/card/${params.cardId}/cube/${params.cubeId}/${params.viewType}/${params.cubeType}/?page=${page}`,
      });
      _setActivePage(page);
    },
    [history, activePage]
  );

  useEffect(() => {
    if (taskItem) {
      let totalpage = Math.ceil(taskItem!.totalCount / 10);
      if (taskItem!.totalCount % 10 < 0) {
        totalpage++;
      }
      setTotalPage(totalpage);
    }
  }, [taskItem]);

  useEffect(() => {
    if (lectureState) {
      // 이수조건(댓글 수, 대댓글 수, 자동이수여부), 관련 Url Data
      if (
        lectureState.cubeDetail &&
        lectureState.cubeDetail.cubeMaterial &&
        lectureState.cubeDetail.cubeMaterial.board
      ) {
        setCubePostCount(
          lectureState.cubeDetail.cubeMaterial.board.completionCondition
            ?.postCount || 0
        );
        setCubeCommentCount(
          lectureState.cubeDetail.cubeMaterial.board.completionCondition
            ?.commentCount || 0
        );
        setCubeAutomaticCompletion(
          lectureState.cubeDetail.cubeMaterial.board?.automaticCompletion ||
            false
        );

        // 댓글, 대댓글 Count Data
        if (lectureState.student) {
          setIsStudent(true);
          setPostCount(lectureState.student.postCount || 0);
          setCommentCount(lectureState.student.commentCount || 0);
        }
      }
    }
  }, [lectureState]);

  const pageChange = (data: any) => {
    const nextOffset = (data.activePage - 1) * 10;
    setLectureTaskOffset(nextOffset);
    setActivePage(data.activePage);
  };

  const sortChange = (data: any) => {
    setLectureTaskOrder(data);
    setActivePage(1);
    console.log('sortChange');
    setLectureTaskOffset(0);
  };

  const moreView = useCallback((offset: number) => {
    const nextOffset = offset + 10;
    setLectureTaskOffset(nextOffset);
  }, []);

  const moveToDetail = useCallback((param: any) => {
    //게시글 부모인지 자식인지
    setIsReply(param.type === 'child');
    getTaskDetailCube(param);
    setDetailTaskId(param.id);
    setDetailType(param.type);
    setBoardId(param.boardId);
  }, []);

  const onClickList = useCallback(() => {
    // history.goBack();
    // 리스트로 돌아가기
    const params = getLectureParams();
    if (params === undefined) {
      return;
    }
    refresh(1).then(() => {
      history.goBack();
    });
  }, [history]);

  const onClickModify = useCallback(() => {
    setCreate(true);
    history.push('#edit');
    // history.goBack();
  }, [history]);

  const onClickReplies = useCallback(() => {
    history.push('#create');
    setIsReply(true);
  }, [history]);

  const onClickDelete = useCallback(
    (boardId: string, taskId: string, type: string) => {
      reactConfirm({
        title: getPolyglotText('알림', 'Collage-Task-알림1'),
        message: getPolyglotText(
          '글을 삭제하시겠습니까?',
          'Collage-Task-삭제알림'
        ),
        onOk: () => {
          deletePost(boardId, taskId, type).then(() => {
            refresh(1).then(() => {
              history.goBack();
            });
          });
        },
      });
    },
    [history]
  );

  const handelClickCreateTask = useCallback(() => {
    setCreate(true);
  }, []);

  const onHandleChange = useCallback(
    (value: string, name: string, viewType: string) => {
      if (viewType === 'create') {
        if (getLectureTaskCreateItem() === undefined) {
          return;
        }
        const taskCreateItem = getLectureTaskCreateItem();
        if (taskCreateItem === undefined) {
          return;
        }
        const nextTaskCreateItem = { ...taskCreateItem, [name]: value };
        setLectureTaskCreateItem(nextTaskCreateItem);
      } else if (viewType === 'edit') {
        if (getLectureTaskDetail() === undefined) {
          return;
        }
        const taskEditItem = getLectureTaskDetail();
        if (taskEditItem === undefined) {
          return;
        }
        const nextTaskEditItem = { ...taskEditItem, [name]: value };
        setLectureTaskDetail(nextTaskEditItem);
      }
    },
    []
  );

  const replaceEnterWithBr = (target?: string) => {
    let setHtml = '';
    if (target) {
      setHtml = target.split('\n').join('<br />');
    }
    return setHtml;
  };

  const handleSubmitClick = useCallback(
    (viewType, detailTaskId, isReply) => {
      reactConfirm({
        title: getPolyglotText('알림', 'Collage-Task-알림2'),
        message: getPolyglotText('저장하시겠습니까?', 'Collage-Task-저장알림'),
        onOk: () => {
          if (viewType === 'create') {
            createLectureTask(isReply, detailTaskId).then(() => {
              setLectureTaskCreateItem({
                id: detailTaskId!,
                fileBoxId: '',
                title: '',
                writer: {
                  employeeId: '',
                  email: '',
                  name: null,
                  companyCode: '',
                  companyName: null,
                },
                name: '',
                contents: '',
                time: 0,
                readCount: 0,
                commentFeedbackId: '',
                notice: false,
                pinned: 0, // postpinned -> number = 0
                writerPatronKeyString: '',
              });
              refresh(1).then(() => {
                history.goBack();
                reactAlert({
                  title: getPolyglotText('안내', 'Collage-Task-안내1'),
                  message: getPolyglotText(
                    '글이 등록되었습니다.',
                    'Collage-Task-등록안내'
                  ),
                });
              });
            });
          } else {
            updateLectureTask(detailTaskId, isReply).then(() => {
              history.goBack();
            });
          }
        },
      });
    },
    [history]
  );

  useEffect(() => {
    const params = getLectureParams();
    if (params === undefined) {
      return;
    }
    const structureItem = getActiveStructureItem(params.pathname);
    if (structureItem !== undefined) {
      const { cubeId } = structureItem as LectureStructureCubeItem;
      if (cubeId !== undefined) {
        setBoardId(cubeId);
      }
    }
  }, [create]);

  async function deletePost(boardId: string, taskId: string, type: string) {
    await deleteCubeLectureTaskPost(boardId, taskId, type).then(() => {
      reactAlert({
        title: getPolyglotText('안내', 'Collage-Task-안내2'),
        message: getPolyglotText(
          '글이 삭제되었습니다.',
          'Collage-Task-삭제안내'
        ),
      });
    });
  }

  // 코멘드 등록 시 학습처리 CommentList -> Props
  const onRegisterStudent = useCallback(async () => {
    if (lectureState && lectureState.student === undefined) {
      await submitRegisterStudent();
    }
  }, [lectureState]);

  const onRefresh = () => {
    setTimeout(() => {
      refresh(1);
    }, 1000);
  };

  return (
    <>
      <div id="Posts" />
      {viewType === 'list' && (
        <div className="contents">
          <LectureCubeSummaryContainer />

          <div className="discuss-wrap">
            <div className="task-condition">
              <strong className="task-condition">
                <PolyglotText
                  defaultString="이수 조건"
                  id="Collage-Task-이수조건"
                />
              </strong>
              {cubeAutomaticCompletion &&
                cubePostCount > 0 &&
                cubeCommentCount > 0 && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        `아래 공지된 <strong>과제를 수행하여 게시판에 {cubePostCount}건 등록</strong>해 주시고, 타 학습자가 등록한 게시글 중 관심이 가는 내용에 대해 <strong>댓글 {cubeCommentCount}건</strong> 작성해주시면 자동으로 이수 처리가 됩니다.`,
                        'Collage-Task-이수조건SubTitle1',
                        {
                          cubePostCount: cubePostCount.toString(),
                          cubeCommentCount: cubeCommentCount.toString(),
                        }
                      ),
                    }}
                  />
                )}
              {cubeAutomaticCompletion &&
                cubePostCount > 0 &&
                cubeCommentCount === 0 && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        `다음의 <strong>아래 공지된 수행하여 게시판에 {cubePostCount}건 등록</strong>해주시면 자동으로 이수 처리가 됩니다.`,
                        'Collage-Task-이수조건SubTitle2',
                        {
                          cubePostCount: cubePostCount.toString(),
                        }
                      ),
                    }}
                  />
                )}
              {cubeAutomaticCompletion &&
                cubePostCount === 0 &&
                cubeCommentCount > 0 && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        `타 학습자가 등록한 게시글 중 관심이 가는 내용에 대해 <strong>댓글 {cubeCommentCount}건</strong> 작성해주시면 자동으로 이수 처리가 됩니다.`,
                        'Collage-Task-이수조건SubTitle3',
                        {
                          cubeCommentCount: cubeCommentCount.toString(),
                        }
                      ),
                    }}
                  />
                )}
              {!cubeAutomaticCompletion && (
                <span>
                  <PolyglotText
                    defaultString="본 과정은 담당자가 이수 조건 충족 여부를 확인 후 이수 처리해 드립니다."
                    id="Collage-Task-이수조건SubTitle4"
                  />
                </span>
              )}
              {lectureDescription && lectureDescription.completionTerms && (
                <Fragment>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: replaceEnterWithBr(
                        lectureDescription.completionTerms
                      ),
                    }}
                  />
                </Fragment>
              )}
            </div>
          </div>

          <ContentLayout className="community-cont">
            <LectureTaskView
              handelClickCreateTask={handelClickCreateTask}
              taskItem={taskItem}
              moreView={moreView}
              handleClickTaskRow={moveToDetail}
              sortChange={sortChange}
              pageChange={pageChange}
              activePage={activePage}
              totalPage={totalPage}
              isStudent={isStudent}
              cubeAutomaticCompletion={cubeAutomaticCompletion}
              cubePostCount={cubePostCount}
              cubeCommentCount={cubeCommentCount}
              postCount={postCount}
              commentCount={commentCount}
            />
          </ContentLayout>
        </div>
      )}
      {viewType === 'detail' && (
        <>
          <LectureTaskDetailView
            boardId={boardId}
            lectureState={lectureState}
            taskId={detailTaskId}
            taskDetail={taskDetail!}
            detailType={detailType}
            handleOnClickList={onClickList}
            handleOnClickModify={onClickModify}
            handleOnClickReplies={onClickReplies}
            handleOnClickDelete={onClickDelete}
            onRegisterStudent={onRegisterStudent}
            onRefresh={onRefresh}
          />
        </>
      )}
      {viewType === 'create' && (
        <>
          <LectureTaskCreateView
            isReply={isReply}
            viewType="create"
            boardId={boardId}
            lectureState={lectureState}
            taskEdit={taskDetail!}
            handleSubmitClick={(viewType) =>
              handleSubmitClick(viewType, detailTaskId, isReply)
            }
            changeProps={(value: string, name: string, viewType: string) =>
              onHandleChange(value, name, viewType)
            }
          />
        </>
      )}
      {viewType === 'edit' && (
        <>
          <LectureTaskCreateView
            isReply={isReply}
            viewType="edit"
            detailTaskId={detailTaskId}
            boardId={boardId}
            lectureState={lectureState}
            handleSubmitClick={(viewType) =>
              handleSubmitClick(viewType, detailTaskId, isReply)
            }
            taskEdit={taskDetail!}
            changeProps={(value: string, name: string, viewType: string) =>
              onHandleChange(value, name, viewType)
            }
          />
        </>
      )}
    </>
  );
}

export default LectureTaskContainer;
