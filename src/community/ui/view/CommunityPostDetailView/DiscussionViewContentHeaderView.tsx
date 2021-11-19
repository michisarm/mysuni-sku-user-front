import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Checkbox, Icon, Image } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import DefaultImg from '../../../../style/media/img-profile-nobg-80-px.png';
import { CommentList } from '@nara.drama/feedback';
import { reactAlert } from '@nara.platform/accent';
import { countByFeedbackId } from '../../../../lecture/detail/api/feedbackApi';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  postDetail: any;
  title: string;
  time: number;
  subField?: React.ReactNode;
  deletable?: boolean;
  readCount?: number;
  likeCount?: number;
  onClickList?: (e: any) => void;
}

const PUBLIC_URL = process.env.PUBLIC_URL;

const fileDownload = (pdf: string, fileId: string) => {
  depot.downloadDepotFile(fileId);
};

const DiscussionViewContentHeaderView: React.FC<Props> = ({
  postDetail,
  title,
  time,
  subField,
  deletable,
  readCount,
  likeCount,
  onClickList,
}) => {
  //

  // content가 undefined 일때 hidden 처리
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentCheck, setContentCheck] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [urlNull, setUrlNull] = useState<boolean>(false);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const [count, setCount] = useState<number>(0);
  const originArr: string[] = [];
  let origin: string = '';

  const commentCountEventHandler = useCallback(async () => {
    async function asyncFun() {
      if (document.body.getAttribute('feedbackid') !== undefined) {
        const { count } = await countByFeedbackId(
          document.body.getAttribute('feedbackid')!
        );
        setCount(count);
      }
    }
    asyncFun();
  }, [postDetail]);

  useEffect(() => {
    getFileIds();
    emptyCheckUrl();
    // content가 undefined 일때 hidden 처리
    const checkContentValue =
      postDetail?.content === '<p><br></p>' || postDetail?.content === ''
        ? true
        : false;
    setContentCheck(checkContentValue);
    setCount(postDetail.replyCount);
  }, [postDetail]);

  useEffect(() => {
    window.addEventListener('commentCount', commentCountEventHandler);
    return () => {
      window.removeEventListener('commentCount', commentCountEventHandler);
    };
  }, []);

  const getFileIds = useCallback(() => {
    const referenceFileBoxId = postDetail && postDetail.fileBoxId;
    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
    });
  }, [postDetail]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then((files) => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

  const fileDownload = (pdf: string, fileId: string) => {
    depot.downloadDepotFile(fileId);
  };

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

  const emptyCheckUrl = useCallback(() => {
    if (postDetail === undefined) return;

    // true 이면 null 처리
    postDetail.relatedUrlList?.map((item: any) => {
      if (item.title === '' || item.url === '') {
        setUrlNull(true);
      }
    });
  }, [postDetail?.relatedUrlList]);

  return (
    <>
      {postDetail && (
        <>
          <div className="discuss-wrap" style={{ width: '850px' }}>
            <div className="discuss-box">
              <Image
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-communtiy-discussion.png"
                alt=""
                style={{ display: 'inline-block' }}
              />
              <h2>{postDetail.title}</h2>
              <span className="peo-opinion">
                <PolyglotText
                  defaultString="전체 의견"
                  id="discussion-content-전체의견"
                />{' '}
                <strong>{count}</strong>
              </span>
              <span>
                <strong className="peo-date">
                  {moment(postDetail?.time).format('YYYY.MM.DD')}
                </strong>
              </span>
            </div>
            <div className="discuss-box2">
              <div
                className="discuss-text-wrap"
                style={contentCheck ? { display: 'none' } : {}}
              >
                {postDetail && more && (
                  <div className="ql-snow">
                    <div
                      ref={contentRef}
                      className="ql-editor"
                      style={{ width: 'auto', padding: 0, lineHeight: 1.8 }}
                      dangerouslySetInnerHTML={{
                        __html: `${postDetail?.content}`,
                      }}
                    />
                  </div>
                )}
                {postDetail && !more && (
                  <div
                    ref={contentRef}
                    className="discuss-text-belt"
                    style={{ width: 'auto' }}
                    dangerouslySetInnerHTML={{
                      __html: `${postDetail?.content}`,
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
              {urlNull === false ? (
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
                        id="discussion-content-관련url"
                      />
                    </p>
                    {postDetail &&
                      postDetail.relatedUrlList?.map((item: any) => (
                        <a href={item.url} target="blank">
                          {item.title}
                        </a>
                      ))}
                  </div>
                </div>
              ) : null}
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
                          <PolyglotText
                            defaultString="첨부파일"
                            id="discussion-content-첨부파일"
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
                              id="discussion-content-선택다운로드"
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
                              id="discussion-content-전체다운로드"
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
                                onClick={() =>
                                  fileDownload(foundedFile.name, foundedFile.id)
                                }
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <CommentList
            feedbackId={postDetail?.id === undefined ? '' : postDetail.id}
            hideCamera
            name={name}
            email={email}
            companyName={company}
            departmentName={department}
            cardId={params?.cardId}
            menuType="discussion"
          /> */}
        </>
      )}
    </>
  );
};

export default DiscussionViewContentHeaderView;
