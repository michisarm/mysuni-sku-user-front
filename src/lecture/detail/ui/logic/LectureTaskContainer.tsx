import { useLectureTask } from 'lecture/detail/service/useLectureTask/useLectureTask';
import React, { useCallback, useEffect, useState } from 'react';
import LectureTaskView from '../view/LectureTaskView/LectureTaskView';
import {
  getLectureTaskDetail,
  setLectureTaskDetail,
  setLectureTaskItem,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
} from '../../store/LectureTaskStore';
import { ContentLayout } from 'shared';
import LectureTaskDetailView from '../view/LectureTaskView/LectureTaskDetailView';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useLectureTaskDetail } from 'lecture/detail/service/useLectureTask/useLectureTaskDetail';
import LectureTaskCreateView from '../view/LectureTaskView/LectureTaskCreateView';
import {
  deleteCubeLectureTaskPost,
  getCubeLectureTaskLearningCardId,
} from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
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
import { reactConfirm } from '@nara.platform/accent';
import { updateLectureTask } from 'lecture/detail/service/useLectureTask/utility/updateLectureTask';
import { createLectureTask } from 'lecture/detail/service/useLectureTask/utility/createLectureTask';
import { useHistory, useLocation } from 'react-router-dom';
import { getTaskDetailCube } from '../../service/useLectureTask/utility/getTaskDetailCube';

function LectureTaskContainer() {
  const { pathname, hash } = useLocation();
  const history = useHistory();
  useEffect(() => {
    return () => {
      setLectureTaskTab('Overview');
    };
  }, [pathname]);
  useEffect(() => {
    if (hash === '#create') {
      setLectureTaskViewType('create');
      setCreate(true);
      return;
    } else if (hash === '#edit') {
      setLectureTaskViewType('edit');
      return;
    } else if (hash === '#reply') {
      setLectureTaskViewType('reply');
      return;
    } else if (hash === '#detail') {
      setLectureTaskViewType('detail');
      return;
    }
    setLectureTaskViewType('list');
  }, [hash]);

  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const params = useLectureRouterParams();
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureFile] = useLectureFile();
  const [lectureTags] = useLectureTags();
  const [viewType] = useLectureTaskViewType();
  const [detailTaskId, setDetailTaskId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [create, setCreate] = useState<boolean>();
  const [edit, setEdit] = useState<boolean>();
  const [detailType, setDetailType] = useState<string>('');

  const moreView = useCallback((offset: number) => {
    const nextOffset = offset + 10;
    setLectureTaskOffset(nextOffset);
  }, []);

  const moveToDetail = useCallback((param: any) => {
    getTaskDetailCube(param);
    setDetailTaskId(param.id);
    setDetailType(param.type);

    //게시글 부모인지 자식인지
  }, []);

  const onClickList = useCallback(() => {
    history.goBack();
  }, []);

  const onHandleSave = useCallback(() => {
    history.goBack();
  }, []);

  const onHandleReply = useCallback(() => {
    history.goBack();
  }, []);

  const onClickModify = useCallback(() => {
    setCreate(true);
    history.goBack();
  }, []);

  const onClickReplies = useCallback(() => {}, []);

  const onClickDelete = useCallback((id: string, type: string) => {
    deletePost(id, type);
    history.goBack();
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
        const nextTaskEditItem = { ...taskEditItem, name: value };
        setLectureTaskDetail(nextTaskEditItem);
      }
    },
    []
  );

  const handleSubmitClick = useCallback((viewType, detailTaskId?) => {
    reactConfirm({
      title: '알림',
      message: '저장하시겠습니까?',
      onOk: () => {
        if (viewType === 'create') {
          const test = createLectureTask().then(() => {
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
            });
            history.goBack();
          });
        } else {
          updateLectureTask(detailTaskId);
          history.goBack();
        }
      },
    });
  }, []);

  useEffect(() => {
    async function getContentId() {
      if (params === undefined) {
        return;
      }
      const contentData = await getCubeLectureTaskLearningCardId(
        params.contentId
      );

      setBoardId(contentData.contents.contents.id);
    }
    getContentId();
  }, [create, edit]);

  async function deletePost(id: string, type: string) {
    await deleteCubeLectureTaskPost(id, type);
  }

  return (
    <>
      <div id="Posts" />
      {viewType === 'list' && (
        <div className="contents">
          <LectureCubeSummaryContainer />
          <ContentLayout className="community-cont">
            <LectureTaskView
              handelClickCreateTask={handelClickCreateTask}
              taskItem={taskItem}
              moreView={moreView}
              handleClickTaskRow={moveToDetail}
              listHashLink={listHashLink}
              overviewHashLink={overviewHashLink}
              lectureDescription={lectureDescription}
              lectureSubcategory={lectureSubcategory}
              lectureTags={lectureTags}
              lectureFile={lectureFile}
            />
          </ContentLayout>
        </div>
      )}
      {viewType === 'detail' && (
        <>
          <LectureTaskDetailView
            taskId={detailTaskId}
            taskDetail={taskDetail!}
            detailType={detailType}
            handleOnClickList={onClickList}
            handleOnClickModify={onClickModify}
            handleOnClickReplies={onClickReplies}
            handleOnClickDelete={onClickDelete}
          />
        </>
      )}
      {viewType === 'create' && (
        <>
          <LectureTaskCreateView
            viewType="create"
            boardId={boardId}
            handleSubmitClick={viewType => handleSubmitClick(viewType)}
            changeProps={(value: string, name: string, viewType: string) =>
              onHandleChange(value, name, viewType)
            }
          />
        </>
      )}
      {viewType === 'edit' && (
        <>
          <LectureTaskCreateView
            viewType="edit"
            detailTaskId={detailTaskId}
            boardId={boardId}
            handleSubmitClick={viewType =>
              handleSubmitClick(viewType, detailTaskId)
            }
            taskEdit={taskDetail!}
            changeProps={(value: string, name: string, viewType: string) =>
              onHandleChange(value, name, viewType)
            }
          />
        </>
      )}
      {viewType === 'reply' && (
        <LectureTaskReplyView
          postId={detailTaskId}
          boardId={boardId}
          handleOnClickList={onHandleReply}
          handleCloseClick={onClickList}
        />
      )}
    </>
  );
}

export default LectureTaskContainer;
