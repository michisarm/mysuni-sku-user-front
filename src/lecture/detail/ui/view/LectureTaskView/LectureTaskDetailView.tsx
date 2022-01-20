/* eslint-disable react-hooks/exhaustive-deps */
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
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import LectureState from '../../../viewModel/LectureState';
import { findCommunityProfile } from '../../../../../community/api/profileApi';
import CommunityProfileModal from '../../../../../community/ui/view/CommunityProfileModal';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { Comment } from '@sku/skuniv-ui-comment';

interface LectureTaskDetailViewProps {
  boardId: string;
  lectureState?: LectureState;
  taskId: string;
  taskDetail: LectureTaskDetail;
  detailType: string;
  handleOnClickList: (id: string) => void;
  handleOnClickModify: (id: string, type: string) => void;
  handleOnClickReplies: (id: string) => void;
  handleOnClickDelete: (boardId: string, taskId: string, type: string) => void;
  onRegisterStudent: () => void;
  onRefresh: () => void;
}

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

const LectureTaskDetailView: React.FC<LectureTaskDetailViewProps> =
  function LectureTaskDetailView({
    lectureState,
    taskDetail,
    detailType,
    boardId,
    taskId,
    handleOnClickList,
    handleOnClickModify,
    handleOnClickReplies,
    handleOnClickDelete,
    onRegisterStudent,
    onRefresh,
  }) {
    const [viewType] = useLectureTaskViewType();
    const history = useHistory();
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [pinned, setPinned] = useState<number>(0);
    const [profileInfo, setProfileInfo] = useState<profileParams>();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [filesMap, setFilesMap] = useState<Map<string, any>>(
      new Map<string, any>()
    );

    const skProfile = SkProfileService.instance.skProfile;

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
      depot.getDepotFiles(fileBoxId).then((files) => {
        filesMap.set(type, files);
        const newMap = new Map(filesMap.set(type, files));
        setFilesMap(newMap);
      });
    }, []);

    const OnClickModify = useCallback(() => {
      handleOnClickModify(taskId, detailType);
    }, []);

    const OnClickDelete = useCallback(() => {
      handleOnClickDelete(boardId, taskId, detailType);
    }, []);

    const OnClicList = useCallback(() => {
      handleOnClickList(taskId);
    }, []);

    const onClickReplies = useCallback(() => {
      history.push('#reply');
      handleOnClickReplies(taskId);
    }, []);

    const clickProfileEventHandler = useCallback(async (denizenId: string) => {
      findCommunityProfile(denizenId!).then((result) => {
        setProfileInfo({
          id: result!.id,
          profileImg: result!.profileImg,
          introduce: result!.introduce,
          nickName: result!.nickname,
          creatorName: result!.name,
        });
        setProfileOpen(true);
      });
    }, []);

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

      if (
        SkProfileService.instance.skProfile.id === denizenKey ||
        (lectureState &&
          lectureState.cubeDetail &&
          lectureState.cubeDetail.cubeContents &&
          lectureState.cubeDetail.cubeContents.operator?.keyString ===
            SkProfileService.instance.skProfile.id)
      ) {
        setCanNotice(true);
      } else {
        setCanNotice(false);
      }
    }, [lectureState, params?.cubeId]);

    const OnClickPostsPinned = useCallback(
      async (postId: string, pinned: number) => {
        if (canNotice) {
          const message =
            pinned === 1
              ? getPolyglotText(
                  '고정되었습니다.',
                  'Collage-TaskPostViewDetail-고정안내'
                )
              : getPolyglotText(
                  '해제되었습니다.',
                  'Collage-TaskPostViewDetail-해제안내'
                );
          await setPinByPostId(postId, pinned).then(() => {
            setPinned(pinned);
            reactAlert({
              title: getPolyglotText('안내', 'Collage-TaskPostViewDetail-안내'),
              message: getPolyglotText(
                `게시글이 Pin {message}`,
                'Collage-TaskPostViewDetail-게시글안내',
                { message }
              ),
            });
          });
        }
      },
      [canNotice]
    );

    const onNoContentAlert = () => {
      reactAlert({
        title: getPolyglotText('알림', 'feedback-comment-notice-title'),
        message: getPolyglotText(
          '댓글 내용을 입력하세요.',
          'feedback-comment-notice-nonetext-message'
        ),
      });
    };

    const onRemoveCommentConfirm = () => {
      return new Promise<boolean>((resolve) => {
        reactConfirm({
          title: getPolyglotText('삭제', 'feedback-comment-delete-title'),
          message: getPolyglotText(
            '댓글을 삭제 하시겠습니까?',
            'feedback-comment-delete-message'
          ),
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });
    };

    const isPostWriter =
      SkProfileService.instance.skProfile.id ===
      taskDetail?.writerPatronKeyString;

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
                        <span>
                          <PolyglotText
                            defaultString="첨부파일"
                            id="Collage-TaskPostViewDetail-첨부파일"
                          />{' '}
                          :
                        </span>
                        <a
                          key={index}
                          onClick={() =>
                            depot.downloadDepotFile(foundedFile.id)
                          }
                        >
                          <span>{foundedFile.name}</span>
                        </a>
                      </div>
                    ))}
              </div>
            </div>
            <div className="task-read-bottom">
              {canNotice && detailType === 'parent' && pinned !== 2 && (
                <Button
                  className="ui button post pin2"
                  onClick={() =>
                    OnClickPostsPinned(taskDetail.id, pinned === 1 ? 0 : 1)
                  }
                >
                  <i area-hidden="true" className="icon pin24" />
                  {pinned === 0 ? (
                    <span>
                      <PolyglotText
                        defaultString="Pin 고정"
                        id="Collage-TaskPostViewDetail-Pin고정"
                      />
                    </span>
                  ) : (
                    <span>
                      <PolyglotText
                        defaultString="Pin 해제"
                        id="Collage-TaskPostViewDetail-Pin해제"
                      />
                    </span>
                  )}
                </Button>
              )}
              {isPostWriter && (
                <>
                  <Button
                    className="ui button post edit"
                    onClick={OnClickModify}
                  >
                    <i area-hidden="true" className="icon edit24" />
                    <PolyglotText
                      defaultString="Edit"
                      id="Collage-TaskPostViewDetail-Edit1"
                    />
                  </Button>
                  <Button
                    className="ui button post delete"
                    onClick={OnClickDelete}
                  >
                    <i area-hidden="true" className="icon del24" />
                    <PolyglotText
                      defaultString="delete"
                      id="Collage-TaskPostViewDetail-delete"
                    />
                  </Button>
                </>
              )}
              {/* {detailType === 'parent' && (
              <Button
                className="ui button post reply"
                onClick={onClickReplies}
              >
                <i area-hidden = "true" className="icon reply24" />
                reply
              </Button>
            )} */}
              <Button className="ui button post list2" onClick={OnClicList}>
                <i area-hidden="true" className="icon list24" />
                <PolyglotText
                  defaultString="list"
                  id="Collage-TaskPostViewDetail-list"
                />
              </Button>
            </div>
            {taskId === taskDetail.id && (
              <div className="contents comment">
                <Comment
                  feedbackId={taskDetail.commentFeedbackId}
                  name={JSON.stringify(skProfile.name)}
                  email={skProfile.email}
                  companyName={parsePolyglotString(skProfile.companyName)}
                  departmentName={skProfile.companyCode}
                  hasPinRole={false}
                  onOpenProfileModal={clickProfileEventHandler}
                  onRemoveCommentConfirm={onRemoveCommentConfirm}
                  onNoContentAlert={onNoContentAlert}
                />
              </div>
            )}
          </>
        )}
        <CommunityProfileModal
          open={profileOpen}
          setOpen={setProfileOpen}
          userProfile={profileInfo && profileInfo.profileImg}
          memberId={profileInfo && profileInfo.id}
          introduce={profileInfo && profileInfo.introduce}
          nickName={profileInfo && profileInfo.nickName}
          name={profileInfo && profileInfo.creatorName}
        />
      </Fragment>
    );
  };

export default LectureTaskDetailView;
