/* eslint-disable react-hooks/exhaustive-deps */
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { Comment } from '@sku/skuniv-ui-comment';
import {
  NotieSimpleCdo,
  NotieSpaceType,
} from '@sku/skuniv-ui-comment/lib/api.models';
import { countByFeedbackId } from 'lecture/detail/api/feedbackApi';
import { useLectureFeedbackContent } from 'lecture/detail/store/LectureFeedbackStore';
import {
  getLectureComment,
  setLectureComment,
} from 'lecture/detail/store/LectureOverviewStore';
import { relatedUrlVisiable } from 'lecture/detail/viewModel/LectureFeedbackContent';
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox, Icon, Image } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import CommunityProfileModal from '../../../../community/ui/view/CommunityProfileModal';
import { findCommunityProfile } from '../../../../layout/UserApp/api/ProfileAPI';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import {
  useRequestLectureDiscussion,
  useRequestLectureFeedbackContent,
} from '../../service/useLectureDiscussion/useRequestLectureDiscussion';
import { useLectureDiscussion } from '../../store/LectureDiscussionStore';

const PUBLIC_URL = process.env.PUBLIC_URL;

const fileDownload = (fileId: string) => {
  depot.downloadDepotFile(fileId);
};

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

export default function LectureDiscussionContainer() {
  useRequestLectureDiscussion();
  useRequestLectureFeedbackContent();
  const lectureDiscussion = useLectureDiscussion();
  const lectureFeedbackContent = useLectureFeedbackContent();
  const params = useParams<LectureParams>();

  const [more, setMore] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const originArr: string[] = [];
  let origin: string = '';
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<profileParams>();

  const commentCountEventHandler = useCallback(async () => {
    const feedbackId = document.body.getAttribute('feedbackid');
    if (feedbackId !== undefined && feedbackId !== null) {
      const { count } = await countByFeedbackId(feedbackId);
      setCount(count);
    }
  }, [setCount]);

  useEffect(() => {
    return () => {
      setMore(false);
      setFilesMap(new Map());
    };
  }, [params.cardId, params?.contentId]);

  useEffect(() => {
    window.addEventListener('discCommentCount', commentCountEventHandler);
    return () => {
      window.removeEventListener('discCommentCount', commentCountEventHandler);
    };
  }, [commentCountEventHandler]);

  useEffect(() => {
    if (
      lectureDiscussion?.id === undefined ||
      lectureFeedbackContent?.commentFeedbackId === undefined
    ) {
      return;
    }
    countByFeedbackId(lectureFeedbackContent.commentFeedbackId).then(
      (comment) => {
        setCount(comment.count);
      }
    );
    getFileIds();
  }, [
    lectureDiscussion?.id,
    lectureFeedbackContent?.commentFeedbackId,
    lectureFeedbackContent?.content,
  ]);

  const getFileIds = useCallback(() => {
    const referenceFileBoxId =
      lectureFeedbackContent && lectureFeedbackContent.depotId;

    if (referenceFileBoxId) {
      findFiles('reference', referenceFileBoxId);
    } else {
      setFilesMap(new Map());
    }
  }, [lectureFeedbackContent?.depotId]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then((files) => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

  const {
    skProfile: { companyName, departmentName, name, email },
  } = SkProfileService.instance;

  const zipFileDownload = useCallback((type: string) => {
    if (originArr && originArr.length > 0) {
      if (type === 'select') {
        if (origin === '') {
          return;
        }
        if (originArr!.length === 1) {
          depot.downloadDepotFile(origin);
          return;
        }
        depot.downloadDepotFiles(originArr);
      } else {
        if (type === 'all') {
          const idArr: string[] = [];
          filesMap.get('reference')?.map((foundedFile: DepotFileViewModel) => {
            idArr.push(foundedFile.id);
          });
          if (idArr.length === 0) {
            return;
          }
          depot.downloadDepotFiles(idArr);
        }
      }
    } else {
      reactAlert({
        title: '안내',
        message: `다운로드 받으실 첨부파일을 선택해 주세요.`,
      });
    }
  }, []);

  const viewMore = useCallback(() => {
    setMore(true);
  }, []);
  const hideMore = useCallback(() => {
    setMore(false);
  }, []);

  const checkOne = useCallback((e: any, value: any, depotData: any) => {
    if (value.checked && depotData.id) {
      originArr.push(depotData.id);
      origin = depotData.id;
    }
    if (!(value.checked && depotData.id)) {
      originArr.splice(originArr.indexOf(depotData.id), 1);
    }
  }, []);

  const clickProfileEventHandler = useCallback(async (denizenId: string) => {
    findCommunityProfile(denizenId).then((result) => {
      setProfileInfo({
        id: result!.id,
        profileImg: result!.photoImagePath,
        introduce: result!.selfIntroduction,
        nickName: result!.nickname,
        creatorName: parsePolyglotString(result!.name),
      });
      setProfileOpen(true);
    });
  }, []);

  const relatedUrlVisible = relatedUrlVisiable(lectureFeedbackContent);

  const checkContentValue =
    parsePolyglotString(lectureFeedbackContent?.content) === '<p><br></p>' ||
    parsePolyglotString(lectureFeedbackContent?.content) === ''
      ? true
      : false;

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

  // 댓글, 좋아요, 핀고정 알림 발송
  const getNotieCdo = (): NotieSimpleCdo | undefined => {
    //

    const result = {
      backLink: window.location.pathname,
      title: NotieSpaceType.LEARNING,
    };

    return result;
  };

  return (
    <>
      {lectureDiscussion && lectureFeedbackContent !== undefined && (
        <>
          <div className="discuss-wrap">
            <div className="discuss-box">
              <Image
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-communtiy-discussion.png"
                alt=""
                style={{ display: 'inline-block' }}
              />
              <h2>{lectureDiscussion.name}</h2>
              <span className="peo-opinion">
                <PolyglotText
                  defaultString="전체 의견"
                  id="discussion-content-전체의견2"
                />{' '}
                <strong>{count}</strong>
              </span>
              <span>
                <strong className="peo-date">
                  {moment(lectureDiscussion.time).format('YYYY.MM.DD')}
                </strong>
              </span>
            </div>
            <div className="discuss-box2">
              <div
                className="discuss-text-wrap"
                style={checkContentValue ? { display: 'none' } : {}}
              >
                {more === true && (
                  <div className="ql-snow">
                    <div
                      className="discuss-text-belt txtmore"
                      dangerouslySetInnerHTML={{
                        __html: `${parsePolyglotString(
                          lectureFeedbackContent?.content
                        )}`,
                      }}
                    />
                  </div>
                )}
                {more === false && (
                  <div
                    className="discuss-text-belt"
                    dangerouslySetInnerHTML={{
                      __html: `${parsePolyglotString(
                        lectureFeedbackContent?.content
                      )}`,
                    }}
                  />
                )}
                {more === true && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={hideMore}
                  >
                    hide
                    <i aria-hidden="true" className="icon hide2" />
                  </button>
                )}
                {more === false && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={viewMore}
                  >
                    more
                    <i
                      aria-hidden="true"
                      className="icon icon morelink more2"
                    />
                  </button>
                )}
              </div>
              {relatedUrlVisible === true && (
                <div className="community-board-down discuss2">
                  <div className="board-down-title href">
                    <p>
                      {' '}
                      <Image
                        src={`${PUBLIC_URL}/images/all/icon-url.png`}
                        alt=""
                        style={{ display: 'inline-block' }}
                      />
                      <PolyglotText
                        defaultString="관련 URL"
                        id="discussion-content-관련URL2"
                      />
                    </p>
                    {lectureFeedbackContent.relatedUrlList?.map((item: any) => (
                      <>
                        <a href={`https://${item.url}`} target="blank">
                          {item.title}
                        </a>
                      </>
                    ))}
                  </div>
                </div>
              )}
              {lectureFeedbackContent.depotId && (
                <div className="community-board-down discuss2">
                  <div className="community-contants">
                    <div className="community-board-down">
                      <div className="board-down-title">
                        <p>
                          <img
                            src={`${PUBLIC_URL}/images/all/icon-down-type-3-24-px.svg`}
                          />
                          <PolyglotText
                            defaultString="첨부파일"
                            id="discussion-content-첨부파일2"
                          />
                        </p>
                        <div className="board-down-title-right">
                          <button
                            className="ui icon button left post delete"
                            onClick={() => zipFileDownload('select')}
                          >
                            <i aria-hidden="true" className="icon check icon" />
                            <PolyglotText
                              defaultString="선택 다운로드"
                              id="discussion-content-선택다운로드2"
                            />
                          </button>
                          <button
                            className="ui icon button left post list2"
                            onClick={() => zipFileDownload('all')}
                          >
                            <img
                              src={`${PUBLIC_URL}/images/all/icon-down-type-4-24-px.png`}
                            />
                            <PolyglotText
                              defaultString="전체 다운로드"
                              id="discussion-content-전체다운로드2"
                            />
                          </button>
                        </div>
                      </div>
                      {filesMap.get('reference') &&
                        filesMap
                          .get('reference')
                          .map((foundedFile: DepotFileViewModel) => (
                            <div className="down">
                              <Checkbox
                                className="base"
                                label={foundedFile.name}
                                name={'depot' + foundedFile.id}
                                onChange={(event, value) =>
                                  checkOne(event, value, foundedFile)
                                }
                              />
                              <Icon
                                className="icon-down-type4"
                                onClick={() => fileDownload(foundedFile.id)}
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {lectureFeedbackContent?.commentFeedbackId !== undefined && (
            <>
              <div className="contents comment">
                <Comment
                  feedbackId={lectureFeedbackContent.commentFeedbackId}
                  name={JSON.stringify(name)}
                  email={email}
                  companyName={parsePolyglotString(companyName)}
                  departmentName={parsePolyglotString(departmentName)}
                  hasPinRole={false}
                  onOpenProfileModal={clickProfileEventHandler}
                  onCommentCountChange={(commentsCount) => {
                    const lectureComment = getLectureComment();
                    if (lectureComment !== undefined) {
                      setLectureComment({ ...lectureComment, commentsCount });
                    }
                  }}
                  onRemoveCommentConfirm={onRemoveCommentConfirm}
                  onNoContentAlert={onNoContentAlert}
                  notieSimpleCdo={getNotieCdo()}
                />
              </div>
              <CommunityProfileModal
                open={profileOpen}
                setOpen={setProfileOpen}
                userProfile={profileInfo && profileInfo.profileImg}
                memberId={profileInfo && profileInfo.id}
                introduce={profileInfo && profileInfo.introduce}
                nickName={profileInfo && profileInfo.nickName}
                name={profileInfo && profileInfo.creatorName}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
