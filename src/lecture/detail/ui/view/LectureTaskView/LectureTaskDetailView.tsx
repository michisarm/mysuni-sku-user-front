import { CommentList } from '@nara.drama/feedback';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { Button, Icon } from 'semantic-ui-react';
import { useLectureTaskViewType } from '../../../service/useLectureTask/useLectureTaskViewType';
import { useHistory } from 'react-router-dom';
import {
  getLectureParams,
  useLectureParams,
} from '../../../store/LectureParamsStore';
import { SkProfileService } from '../../../../../profile/stores';
import { getActiveCubeStructureItem } from '../../../utility/lectureStructureHelper';
import { setPinByPostId } from '../../../../../lecture/detail/api/cubeApi';
import { reactAlert } from '@nara.platform/accent';
// import { submitRegisterStudent } from '../../../../../lecture/detail/service/useLectureState/utility/cubeStateActions';

interface LectureTaskDetailViewProps {
  boardId: string;
  taskId: string;
  taskDetail: LectureTaskDetail;
  detailType: string;
  handleOnClickList: (id: string) => void;
  handleOnClickModify: (id: string, type: string) => void;
  handleOnClickReplies: (id: string) => void;
  handleOnClickDelete: (boardId: string, taskId: string, type: string) => void;
}

const LectureTaskDetailView: React.FC<LectureTaskDetailViewProps> = function LectureTaskDetailView({
  taskDetail,
  detailType,
  boardId,
  taskId,
  handleOnClickList,
  handleOnClickModify,
  handleOnClickReplies,
  handleOnClickDelete,
}) {
  const [viewType] = useLectureTaskViewType();
  const history = useHistory();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState<boolean>(false);

  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  useEffect(() => {
    setPinned(taskDetail?.pinned);
    getFileIds();
  }, [taskDetail]);

  const getFileIds = useCallback(() => {
    const referenceFileBoxId = taskDetail && taskDetail.fileBoxId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
    });
  }, [taskDetail]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then(files => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

  const OnClickModify = useCallback(() => {
    handleOnClickModify(taskId, detailType);
  }, []);

  const OnClickDelete = useCallback(() => {
    console.log("OnClickDelete", taskDetail)
    handleOnClickDelete(boardId, taskId, detailType);
  }, []);

  const OnClicList = useCallback(() => {
    handleOnClickList(taskId);
  }, []);

  const onClickReplies = useCallback(() => {
    history.push('#reply');
    handleOnClickReplies(taskId);
  }, []);

  // 코멘드 등록 시 학습처리 CommentList -> Props
  // const registerStudent = useCallback(async () => {
  //   if(lectureState && lectureState.student === undefined){
  //     await submitRegisterStudent()
  //   }
  // }, []);

  const params = useLectureParams();
  const [canNotice, setCanNotice] = useState<boolean>(false);
  useEffect(() => {
    const params = getLectureParams();
    if (params === undefined) {
      return;
    }
    const lectureStructureCubeItem = getActiveCubeStructureItem(
      params.pathname
    );
    if (lectureStructureCubeItem === undefined) {
      return;
    }

    const audienceKey = lectureStructureCubeItem.cube.patronKey.keyString;
    /* eslint-disable prefer-const */
    let [pre, last] = audienceKey.split('@');

    if (pre === undefined || last === undefined) {
      return;
    }

    [pre] = pre.split('-');
    if (pre === undefined) {
      return;
    }

    const [last1, last2] = last.split('-');
    if (last1 === undefined || last2 === undefined) {
      return;
    }

    const denizenKey = `${pre}@${last1}-${last2}`;

    if (SkProfileService.instance.skProfile.id === denizenKey) {
      setCanNotice(true);
    }

    return () => setCanNotice(false);
  }, [params?.cubeId]);

  const OnClickPostsPinned = useCallback( async(postId: string, pinned: boolean) => {
    // if (canNotice) {
      const message = pinned ? '고정되었습니다.' : '해제되었습니다.';
      await setPinByPostId(postId, pinned)
            .catch(error => {
                setPinned(pinned)
                reactAlert({
                title: '안내',
                message: `게시글이 Pin ${message}`,
              });
            })
      // setPinByPostId(postId, memberId).then(result => {
      //   if (like === true) {
      //     setLike(false);
      //     setLikeCount(likeCount - 1);
      //   } else {
      //     setLike(true);
      //     setLikeCount(likeCount + 1);
      //   }
      // });
    // }
  }, []);

  return (
    <Fragment>
      {taskDetail && (
        <>
          <LectureTaskDetailContentHeaderView
            canNotice={canNotice}
            taskDetail={taskDetail}
            title={taskDetail.title}
            name={taskDetail.name}
            time={taskDetail.time}
            pinned={pinned}
            readCount={taskDetail.readCount}
            deletable={true}
            reply={detailType === 'parent' ? true : false}
            onClickList={OnClicList}
            onClickModify={OnClickModify}
            onClickReplies={onClickReplies}
            onClickDelete={OnClickDelete}
            onClickPostsPinned={OnClickPostsPinned}
          />
          <div className="class-guide-txt fn-parents ql-snow">
            <div
              className="text ql-editor"
              dangerouslySetInnerHTML={{
                __html: taskDetail.contents,
              }}
              ref={textContainerRef}
            />
          </div>
          <div className="ov-paragraph download-area task-read-down">
            <div className="detail">
              {taskDetail.fileBoxId &&
                filesMap.get('reference') &&
                filesMap
                  .get('reference')
                  .map((foundedFile: DepotFileViewModel, index: number) => (
                    <div className="down">
                      <span>첨부파일 :</span>

                      <a
                        key={index}
                        onClick={() => depot.downloadDepotFile(foundedFile.id)}
                      >
                        <span>{foundedFile.name}</span>
                      </a>
                    </div>
                  ))}
            </div>
          </div>
          <div className="task-read-bottom">
            {canNotice && (
              <Button
                className="ui button post pin2"
                onClick={() => OnClickPostsPinned(taskDetail.id, !pinned)}
              >
                <i area-hidden = "true" className="icon pin24" />
                {!pinned ? <span>Pin 고정</span> : <span>Pin 해제</span>}
              </Button>
            )}
            <Button
              className="ui button post edit"
              onClick={OnClickModify}
            >
              <i area-hidden = "true" className="icon edit24" />
              Edit
            </Button>
            <Button
              className="ui button post delete"
              onClick={OnClickDelete}
            >
              <i area-hidden = "true" className="icon del24" />
              delete
            </Button>
            {detailType === 'parent' && (
              <Button
                className="ui button post reply"
                onClick={onClickReplies}
              >
                <i area-hidden = "true" className="icon reply24" />
                reply
              </Button>
            )}
            <Button
              className="ui button post list2"
              onClick={OnClicList}
            >
              <i area-hidden = "true" className="icon list24" />
              list
            </Button>
          </div>
          <CommentList
            feedbackId={taskDetail.commentFeedbackId}
            name={taskDetail.writer.name}
            email={taskDetail.writer.email}
            companyName={taskDetail.writer.companyName}
            departmentName={taskDetail.writer.companyCode}
            // cubeCommentStartFunction={registerStudent}
          />
        </>
      )}
    </Fragment>
  );
};

export default LectureTaskDetailView;
