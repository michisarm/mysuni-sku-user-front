import { useLectureTask } from 'lecture/detail/service/useLectureTask/useLectureTask';
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import LectureTaskView from '../view/LectureTaskView/LectureTaskView';
import {
  getLectureTaskDetail,
  setLectureTaskDetail,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
  setLectureTaskOrder,
} from '../../store/LectureTaskStore';
import { ContentLayout } from 'shared';
import LectureTaskDetailView from '../view/LectureTaskView/LectureTaskDetailView';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useLectureTaskDetail } from 'lecture/detail/service/useLectureTask/useLectureTaskDetail';
import LectureTaskCreateView from '../view/LectureTaskView/LectureTaskCreateView';
import { deleteCubeLectureTaskPost } from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import LectureTaskReplyView from '../view/LectureTaskView/LectureTaskReplyView';
import { useLectureDescription } from 'lecture/detail/service/useLectureCourseOverview/useLectureDescription';
import { useLectureSubcategory } from 'lecture/detail/service/useLectureCourseOverview/useLectureSubcategory';
import { useLectureFile } from 'lecture/detail/service/useLectureFile';
import { useLectureTags } from 'lecture/detail/service/useLectureCourseOverview/useLectureTags';
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
import LectureDescriptionView from '../view/LectureOverview/LectureDescriptionView';
import { OverviewField } from '../../../../personalcube';
import { Image } from 'semantic-ui-react';
import { useLectureState } from '../../store/LectureStateStore';
import { refresh } from '../../../../../src/lecture/detail/service/useLectureState/utility/cubeStateActions';
import { submitRegisterStudent } from '../../../../lecture/detail/service/useLectureState/utility/cubeStateActions';

const PUBLIC_URL = process.env.PUBLIC_URL;

function LectureTaskContainer() {
  const { pathname, hash } = useLocation();
  const history = useHistory();

  // useEffect(() => {
  //   return () => {
  //     setLectureTaskTab('Overview');
  //   };
  // }, [pathname]);

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
    setLectureTaskViewType('list');
  }, [hash]);

  const lectureState = useLectureState();
  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureFile] = useLectureFile();
  const [lectureTags] = useLectureTags();
  const [viewType] = useLectureTaskViewType();
  const [detailTaskId, setDetailTaskId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [create, setCreate] = useState<boolean>();
  const [detailType, setDetailType] = useState<string>('');
  const [isReply, setIsReply] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  // 이수정보 관련
  const [cubeAutomaticCompletion, setCubeAutomaticCompletion] = useState<boolean>(false);
  const [cubePostCount, setCubePostCount] = useState<number>(0);
  const [cubeCommentCount, setCubeCommentCount] = useState<number>(0);
  const [cubeSubCommentCount, setCubeSubCommentCount] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [subCommentCount, setSubCommentCount] = useState<number>(0);

  useEffect(() => {
    if(taskItem){
      let totalpage = Math.ceil(taskItem!.totalCount / 10);
      if (taskItem!.totalCount % 10 < 0) {
        totalpage++;
      }
      setTotalPage(totalpage);
    }
  }, [taskItem]);

  useEffect(() => {
    if(lectureState){
      // 이수조건(댓글 수, 대댓글 수, 자동이수여부), 관련 Url Data
      if(lectureState.cubeDetail
          && lectureState.cubeDetail.cubeMaterial
          && lectureState.cubeDetail.cubeMaterial.board
          && lectureState.cubeDetail.cubeMaterial.board?.automaticCompletion){
            setCubePostCount(lectureState.cubeDetail.cubeMaterial.board.completionCondition?.postCount || 0)
            setCubeCommentCount(lectureState.cubeDetail.cubeMaterial.board.completionCondition?.commentCount || 0)
            setCubeSubCommentCount(lectureState.cubeDetail.cubeMaterial.board.completionCondition?.subCommentCount || 0)
            setCubeAutomaticCompletion(lectureState.cubeDetail.cubeMaterial.board.automaticCompletion)

            // 댓글, 대댓글 Count Data
            if(lectureState.student){
              setPostCount(lectureState.student.postCount || 0)
              setCommentCount(lectureState.student.commentCount || 0)
              setSubCommentCount(lectureState.student.subCommentCount || 0)
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
    setBoardId(param.boardId)
  }, []);

  const onClickList = useCallback(() => {
    // history.goBack();
    // 리스트로 돌아가기
    const params = getLectureParams();
    if (params === undefined) {
      return;
    }
    refresh(1).then(() => {
      history.push({
        pathname: `/lecture/card/${params.cardId}/cube/${params.cubeId}/${params.viewType}/${params.cubeType}`,
      });
      setActivePage(1);
    })
  }, []);

  // const onHandleSave = useCallback(() => {
  //   history.goBack();
  // }, []);

  // const onHandleReply = useCallback(() => {
  //   history.goBack();
  // }, []);

  const onClickModify = useCallback(() => {
    setCreate(true);
    history.push('#edit');
    // history.goBack();
  }, []);

  const onClickReplies = useCallback(() => {
    history.push('#create');
    setIsReply(true);
  }, []);

  const onClickDelete = useCallback((boardId: string, taskId: string, type: string) => {
    reactConfirm({
      title: '알림',
      message: '글을 삭제하시겠습니까?',
      onOk: () => {
        deletePost(boardId, taskId, type).then(() => {
          refresh(1).then(() => {
            history.goBack();
          });
        });
      },
    });
  }, []);

  const listHashLink = useCallback((hash: string) => {
    setLectureTaskTab(hash);
    const element = document.getElementById(hash);
    if (element !== null) {
      element.scrollIntoView();
    }
  }, []);

  const overviewHashLink = useCallback((hash: string) => {
    setLectureTaskTab(hash);
    const element = document.getElementById(hash);
    if (element !== null) {
      element.scrollIntoView();
    }
  }, []);

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
    if(target){
      setHtml = target.split('\n').join('<br />');
    }
    return setHtml;
  };

  const handleSubmitClick = useCallback((viewType, detailTaskId, isReply) => {
    reactConfirm({
      title: '알림',
      message: '저장하시겠습니까?',
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
                name: '',
                companyCode: '',
                companyName: '',
              },
              name: '',
              contents: '',
              time: 0,
              readCount: 0,
              commentFeedbackId: '',
              notice: false,
              pinned: 0, // postpinned -> number = 0
            });
            refresh(1).then(() => {
              history.goBack();
              reactAlert({
                title: '안내',
                message: '글이 등록되었습니다.',
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
  }, []);

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
        title: '안내',
        message: '글이 삭제되었습니다.',
      });
    });
  }

  // 코멘드 등록 시 학습처리 CommentList -> Props
  const onRegisterStudent = useCallback(async () => {
    if(lectureState && lectureState.student === undefined){
      await submitRegisterStudent()
    }
  }, [lectureState]);

  const cubeAutomaticCompletionMessage = useCallback(() => {
    const message = [];
    if(cubePostCount > 0){
      message.push(`Post ${cubePostCount}건`)
    }

    if(cubeCommentCount > 0){
      message.push(`Comment ${cubeCommentCount}건`)
    }

    if(cubeSubCommentCount > 0){
      message.push(`Comment Reply ${cubeSubCommentCount}건`)
    }

    return message.join(" / ")
  }, [cubePostCount, cubeCommentCount, cubeSubCommentCount]);

  return (
    <>
      <div id="Posts" />
      {viewType === 'list' && (
        <div className="contents">
          <LectureCubeSummaryContainer />

          <div className="discuss-wrap"> 
            <div className="task-condition">
              <strong className="task-condition">이수조건</strong>
                {cubeAutomaticCompletion && (
                    <span>본 학습은 <strong>{cubeAutomaticCompletionMessage()}</strong>을 수행해 주시면, 자동 이수 처리됩니다.</span>
                )}
                {!cubeAutomaticCompletion && (
                    <span>본 학습은 담당자가 직접 확인하고, 수동으로 일괄 처리합니다.</span>
                )}
                {(lectureDescription && lectureDescription.completionTerms) && (
                  <Fragment>
                    <p dangerouslySetInnerHTML={{ __html: replaceEnterWithBr(lectureDescription.completionTerms) }} />
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
              listHashLink={listHashLink}
              overviewHashLink={overviewHashLink}
              // lectureDescription={lectureDescription}
              // lectureSubcategory={lectureSubcategory}
              // lectureTags={lectureTags}
              // lectureFile={lectureFile}
              sortChange={sortChange}
              pageChange={pageChange}
              activePage={activePage}
              totalPage={totalPage}
              cubeAutomaticCompletion={cubeAutomaticCompletion}
              cubePostCount={cubePostCount}
              cubeCommentCount={cubeCommentCount}
              cubeSubCommentCount={cubeSubCommentCount}
              postCount={postCount}
              commentCount={commentCount}
              subCommentCount={subCommentCount}
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
            handleSubmitClick={viewType =>
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
            handleSubmitClick={viewType =>
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
