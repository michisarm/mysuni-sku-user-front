import { CommentList } from '@nara.drama/feedback';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox, Comment, Icon, Image } from 'semantic-ui-react';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import { findSkProfileByAudienceId } from '../../api/profileApi';
import { useLectureDiscussion } from '../../service/useLectureDiscussion';
import { useLectureFeedbackContent } from '../../service/useFeedbackContent';
import { getLectureDiscussion,setLectureDiscussion } from '../../store/LectureDiscussionStore';
import defaultImage from '../../../../style/media/img-profile-80-px.png';
import { InMyLectureService } from 'myTraining/stores';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import LectureFeedbackContent from '../../viewModel/LectureFeedbackContent';
import { countByFeedbackId, findFeedbackMenu } from 'lecture/detail/api/feedbackApi';
import { Link } from 'react-router-dom';
import { getLectureFeedbackContent, setLectureFeedbackContent } from '../../store/LectureFeedbackStore';

const PUBLIC_URL = process.env.PUBLIC_URL;

interface Props extends RouteComponentProps<RouteParams> {
  inMyLectureService?: InMyLectureService;
}

interface RouteParams {
  coursePlanId?: string;
}

function LectureDiscussionContainer (props: Props) {
  const [lectureDiscussion] = useLectureDiscussion();

  const { match } = props;

  const { coursePlanId } = match.params;

  const [lectureFeedbackContent] = useLectureFeedbackContent();
  const [more, setMore] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const originArr: string[] = [];
  let origin: string = '';
  
  useEffect(() => {
    getFileIds();
  },[lectureFeedbackContent])

  const getFileIds = useCallback(() => {
    const referenceFileBoxId = lectureFeedbackContent && lectureFeedbackContent.depotId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
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
    if (lectureDiscussion === undefined) {
      return;
    }
    findSkProfileByAudienceId(lectureDiscussion.creatorAudienceId).then(
      profile => {
        const mLectureDiscussion = getLectureDiscussion();
        if (profile !== undefined && mLectureDiscussion !== undefined) {
          if (mLectureDiscussion.creatorImage != profile.photoImage) {
            setLectureDiscussion({
              ...lectureDiscussion,
              creatorImage: profile.photoImage,
            });
          }
        }
      }
    );
  }, [lectureDiscussion?.creatorAudienceId]);

  useEffect(() => {
    // LMS 컨텐츠 api호출
    lectureDiscussion && findFeedbackMenu(lectureDiscussion?.id).then(
      res => {
        setLectureFeedbackContent({
          ...res,
        })
      });
  },[lectureDiscussion?.id]);

  // 전체의견 갯수 조회
  useEffect(() => {
    lectureDiscussion && countByFeedbackId(lectureDiscussion?.id).then(
      res => {
        setCount(res.count)
      }
    )
  },[lectureDiscussion?.id])

  const {
    skProfile: {
      member: { company, department, email, name },
    },
  } = SkProfileService.instance;

  const zipFileDownload = useCallback((type: string) => {
    if (type === 'select') {
      if (origin === '') {
        // console.log('선택 첨부파일 없음 err')
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
          // console.log('전체 첨부파일 없음 err');
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

  const fileDownload = (pdf: string, fileId: string) => {
    depot.downloadDepotFile(fileId);
  };

  return (
    <>
      {lectureDiscussion && lectureFeedbackContent !== undefined && (
        <>
          <div className="discuss-wrap">
            
            {/* 제목 */}
            <div className="discuss-box">
              <Image src={`${PUBLIC_URL}/images/all/icon-communtiy-discussion.png`} alt="" style={{display: 'inline-block'}}/>
              <h2>{lectureDiscussion.name}</h2>
              <span className="peo-opinion">전체 의견 <strong>{count}</strong></span>
              <span><strong className="peo-date">{moment(lectureFeedbackContent?.time).format('YYYY.MM.DD')}</strong></span>
            </div>
            
            {/* 본문 */}
            <div className="discuss-box2">
              {/* <img src={MaskImg} className="discuss-main-img" /> */}
              <div className="discuss-text-wrap" >
                {more && (
                  <div className="ql-snow">
                    <div className="discuss-text-belt" dangerouslySetInnerHTML={{ __html: `${lectureFeedbackContent?.content}` }}/>
                    {/* <p className="discuss-text-belt">{lectureFeedbackContent?.content}</p> */}
                  </div>
                )}
                {!more && (
                  <div className="discuss-text-belt" dangerouslySetInnerHTML={{ __html: `${lectureFeedbackContent?.content}` }}/>
                  // <p className="discuss-text-belt">{lectureFeedbackContent?.content}</p>
                )}
                {!more && (
                  <button
                    className="ui icon button right btn-blue"
                    onClick={viewMore}
                  >
                    more
                    <i aria-hidden="true" className="icon icon morelink more2" />
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
              {lectureFeedbackContent.relatedUrlList && 
                <div className="community-board-down discuss2">
                  <div className="board-down-title href">
                      <p>
                        {" "}
                        <Image src={`${PUBLIC_URL}/images/all/icon-url.png`} alt="" style={{display: 'inline-block'}}/>
                        관련 URL
                      </p>
                      {lectureFeedbackContent && lectureFeedbackContent.relatedUrlList?.map((item: any) => (
                        <a href={item.url} target='blank'>{item.title}</a>
                      ))}
                  </div>
                </div>
              } 
              {/* 관련 자료 */}
              {lectureFeedbackContent.depotId &&
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
              }
            {/* eslint-enable */}
            </div>
          </div>

          <CommentList
            feedbackId={lectureDiscussion.id}
            hideCamera
            name={name}
            email={email}
            companyName={company}
            departmentName={department}
            coursePlanId={coursePlanId}
            menuType="discussion"
          />
        </>
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'myTraining.inMyLectureService',
  )
)(withRouter(observer(LectureDiscussionContainer)));
