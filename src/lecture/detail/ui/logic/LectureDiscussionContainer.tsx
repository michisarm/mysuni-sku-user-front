import { CommentList, CommentService } from '@nara.drama/feedback';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Icon, Image } from 'semantic-ui-react';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import { useLectureFeedbackContent } from '../../service/useFeedbackContent';
import { useLectureDiscussion } from '../../store/LectureDiscussionStore';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { countByFeedbackId, findFeedbackMenu } from 'lecture/detail/api/feedbackApi';
import { setLectureFeedbackContent } from '../../store/LectureFeedbackStore';
import { useRequestLectureDiscussion } from '../../service/useLectureDiscussion/useRequestLectureDiscussion';
import { useParams } from 'react-router-dom';
import LectureParams from '../../viewModel/LectureParams';

const PUBLIC_URL = process.env.PUBLIC_URL;

const fileDownload = (pdf: string, fileId: string) => {
  depot.downloadDepotFile(fileId);
};

export default function LectureDiscussionContainer() {
  useRequestLectureDiscussion();
  const lectureDiscussion = useLectureDiscussion();
  const params = useParams<LectureParams>();

  const [lectureFeedbackContent] = useLectureFeedbackContent();
  const [more, setMore] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const originArr: string[] = [];
  let origin: string = '';

  const commentCountEventHandler = useCallback(async () => {
    async function asyncFun() {
      if (document.body.getAttribute('feedbackid') !== undefined) {
        const { count } = await countByFeedbackId(document.body.getAttribute('feedbackid')!);
        setCount(count)
      }
    }
    asyncFun();
  }, [lectureFeedbackContent]);

  useEffect(() => {
    window.addEventListener('discCommentCount', commentCountEventHandler);
    return () => {
      window.removeEventListener('discCommentCount', commentCountEventHandler);
    };
  }, []);

  useEffect(() => {
    async function asyncFun() {
      if (lectureFeedbackContent !== undefined && lectureFeedbackContent.commentFeedbackId !== undefined) {
        const { count } = await countByFeedbackId(lectureFeedbackContent?.commentFeedbackId);
        setCount(count)
      }
    }
    getFileIds();
    asyncFun();
  }, [lectureFeedbackContent]);

  const getFileIds = useCallback(() => {

    const referenceFileBoxId =
      lectureFeedbackContent && lectureFeedbackContent.depotId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId)
      else setFilesMap(new Map<string, any>());
    });
  }, [lectureFeedbackContent]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then(files => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

  useEffect(() => {
    async function asuncFun() {
      if (lectureDiscussion?.id === undefined) {
        return;
      }

      //comment count
      if (lectureFeedbackContent !== undefined && lectureFeedbackContent.commentFeedbackId !== undefined) {
        const comment = await countByFeedbackId(lectureFeedbackContent?.commentFeedbackId);
        setCount(comment.count)
      }

      findFeedbackMenu(lectureDiscussion.id).then(res => {
        setLectureFeedbackContent({
          ...res
        });
      });
    }
    asuncFun()
  }, [lectureFeedbackContent?.title, lectureDiscussion?.id]);

  const { company, department, email, name } = useMemo(() => {
    const {
      skProfile: {
        member: { company, department, email, name },
      },
    } = SkProfileService.instance;
    return { company, department, email, name };
  }, []);

  const zipFileDownload = useCallback((type: string) => {
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

  return (
    <>
      {lectureDiscussion && (
        <>
          <div className="discuss-wrap">
            <div className="discuss-box">
              <Image
                src={`${PUBLIC_URL}/images/all/icon-communtiy-discussion.png`}
                alt=""
                style={{ display: 'inline-block' }}
              />
              <h2>{lectureDiscussion.name}</h2>
              <span className="peo-opinion">
                전체 의견 <strong>{count}</strong>
              </span>
              <span>
                <strong className="peo-date">
                  {moment(lectureDiscussion?.time).format('YYYY.MM.DD')}
                </strong>
              </span>
            </div>
            <div className="discuss-box2">
              <div className="discuss-text-wrap">
                {lectureFeedbackContent && more && (
                  <div className="ql-snow">
                    <div
                      className="discuss-text-belt"
                      dangerouslySetInnerHTML={{
                        __html: `${lectureFeedbackContent?.content}`,
                      }}
                    />
                  </div>
                )}
                {lectureFeedbackContent && !more && (
                  <div
                    className="discuss-text-belt"
                    dangerouslySetInnerHTML={{
                      __html: `${lectureFeedbackContent?.content}`,
                    }}
                  />
                )}
                {!more && (
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
                {more && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={hideMore}
                  >
                    hide
                    <i aria-hidden="true" className="icon hide2" />
                  </button>
                )}
              </div>
              {/* eslint-disable */}
              {/* 관련 URL */}
              {lectureFeedbackContent &&
                lectureFeedbackContent.relatedUrlList &&
                lectureFeedbackContent.relatedUrlList.length > 0 && (
                  (lectureFeedbackContent.relatedUrlList[0].title !== "" && lectureFeedbackContent.relatedUrlList[0].url) !== "" ||
                  (lectureFeedbackContent.relatedUrlList[1].title !== "" && lectureFeedbackContent.relatedUrlList[1].url !== "")) && (
                  <div className="community-board-down discuss2">
                    <div className="board-down-title href">
                      <p>
                        {' '}
                        <Image
                          src={`${PUBLIC_URL}/images/all/icon-url.png`}
                          alt=""
                          style={{ display: 'inline-block' }}
                        />
                        관련 URL
                      </p>
                      {lectureFeedbackContent &&
                        lectureFeedbackContent.relatedUrlList?.map(
                          (item: any) => (
                            <>
                              {/* <div>{item.title}</div> */}
                              <a href={`https://${item.url}`} target="blank">
                              {item.url}
                            </a>
                          </>
                          )
                        )}
                    </div>
                  </div>
                )}
              {/* eslint-enable */}
              {/* 관련 자료 */}
              {filesMap.get('reference') && (
                <div className="community-board-down discuss2">
                  <div className="community-contants">
                    <div className="community-board-down">
                      <div className="board-down-title">
                        <p>
                          <img
                            src={`${PUBLIC_URL}/images/all/icon-down-type-3-24-px.svg`}
                          />
                          첨부파일
                        </p>
                        <div className="board-down-title-right">
                          <button
                            className="ui icon button left post delete"
                            onClick={() => zipFileDownload('select')}
                          >
                            <i aria-hidden="true" className="icon check icon" />
                            선택 다운로드
                          </button>
                          <button
                            className="ui icon button left post list2"
                            onClick={() => zipFileDownload('all')}
                          >
                            <img
                              src={`${PUBLIC_URL}/images/all/icon-down-type-4-24-px.png`}
                            />
                            전체 다운로드
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
                                onClick={() =>
                                  fileDownload(foundedFile.name, foundedFile.id)
                                }
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              )
              }

            </div>
          </div>
          <CommentList
            feedbackId={lectureFeedbackContent?.commentFeedbackId ? lectureFeedbackContent?.commentFeedbackId : ''}
            hideCamera
            name={name}
            email={email}
            companyName={company}
            departmentName={department}
            // cardId={params?.cardId}
            menuType="discussion"
          />
        </>
      )}
    </>
  );
}
