import React, { Component, useCallback, useEffect, useState } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Checkbox, Icon, Image } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import DefaultImg from '../../../../style/media/img-profile-nobg-80-px.png';
import { CommentList } from '@nara.drama/feedback';


interface Props {
  postDetail: any;
  title: string;
  time: number;
  subField?: React.ReactNode;
  deletable?: boolean;
  readCount?: number;
  replyCount?: number;
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
  replyCount,
  likeCount,
  onClickList,
}) => {
  //

  const [more, setMore] = useState<boolean>(false);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const originArr: string[] = [];
  let origin: string = '';

  useEffect(() => {
    getFileIds();
  }, [postDetail]);

  const getFileIds = useCallback(() => {
    const referenceFileBoxId =
      postDetail && postDetail.depotId;
    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
    });
  }, [postDetail]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then(files => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
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
      {postDetail && (
        <>
          <div className="discuss-wrap" style={{width: '850px'}}>
            <div className="discuss-box">
              <Image
                src={`${PUBLIC_URL}/images/all/icon-communtiy-discussion.png`}
                alt=""
                style={{ display: 'inline-block' }}
              />
              <h2>{postDetail.title}</h2>
              <span className="peo-opinion">
                전체 의견 <strong>{postDetail.replyCount}</strong>
              </span>
              <span>
                <strong className="peo-date">
                  {moment(postDetail?.time).format('YYYY.MM.DD')}
                </strong>
              </span>
            </div>
            <div className="discuss-box2">
              <div className="discuss-text-wrap">
                {postDetail && more && (
                  <div className="ql-snow">
                    <div
                      className="discuss-text-belt"
                      dangerouslySetInnerHTML={{
                        __html: `${postDetail?.content}`,
                      }}
                    />
                  </div>
                )}
                {postDetail && !more && (
                  <div
                    className="discuss-text-belt"
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
              {postDetail &&
                postDetail.relatedUrlList &&
                postDetail.relatedUrlList.length > 0 &&
                (postDetail.relatedUrlList[0].title !== '' ||
                  postDetail.relatedUrlList[0].url !== '') && (
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
                      {postDetail &&
                        postDetail.relatedUrlList?.map(
                          (item: any) => (
                            <a href={item.url} target="blank">
                              {item.title}
                            </a>
                          )
                        )}
                    </div>
                  </div>
                )}
              {/* eslint-enable */}
              {/* 관련 자료 */}
              {(postDetail.fileBoxId !== '' && postDetail.fileBoxId !== null) && (
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
}

export default DiscussionViewContentHeaderView;
