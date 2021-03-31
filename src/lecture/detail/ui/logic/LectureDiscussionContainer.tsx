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
import { findFeedbackMenu } from 'lecture/detail/api/feedbackApi';
import { Link } from 'react-router-dom';
import { getLectureFeedbackContent, setLectureFeedbackContent } from '../../store/LectureFeedbackStore';

const str = " 2019년 지구상에 새로 등장한 신종 바이러스 감염병인 코로나19는 세계 많은 국가에 서 1년째 대유행을 하고 있다.코로나19는 21세기 들어 가장 많은 인명 피해를 주고 있는 감염병이란 타이틀을 이미 거머쥐었다. 지금도 정치, 경제,사회, 문화, 보건의료, 과학기술 등 많은 분야를 이전과 다른 모습으로 바꿔놓고 있는 중이다. 따라서 코로나19가 바꾸었거나바꾸고 있는 우리 사회의 다양 한 모습을 살펴보고 또 앞으로 어디까지 어떻게 바꿀지를 분석하는 것은 인류의 지속가능성을위해 매우 중요한 과제라고 할 수 있다. 코로나 사태와 관련, 코로나 사태가 시작되었던 1월 말 당시의 예상 및 결과를 Review해보고,향후 사태 지속 시 사회가 어떤 모습으로 변할지에 대해 답변하면서 평소에 생각하지 못했던 부분까지 생각의 영역을 확장해봅니다.";

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

  console.log('coursePlanId', coursePlanId)
  
  const [lectureFeedbackContent] = useLectureFeedbackContent();
  const [more, setMore] = useState<boolean>(false);
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
    // const referenceFileBoxId = '2h1';
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
    findFeedbackMenu('dd').then(
      res => {
        setLectureFeedbackContent({
          ...res,
        })
      });
  },[lectureFeedbackContent?.title]);

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
    // const PdfFile = pdf.includes('.pdf');
    // if (PdfFile) {
    //   setPdfOpen(!pdfOpen);
    //   setFileId(fileId);
    //   setFileName(pdf);
    // } else {
      depot.downloadDepotFile(fileId);
    // }
  };

  return (
    <>
      {lectureDiscussion && (
        <>
          <div className="discuss-wrap">
            
            {/* 제목 */}
            <div className="discuss-box">
              <Image src={`${PUBLIC_URL}/images/all/icon-communtiy-discussion.png`} alt="" style={{display: 'inline-block'}}/>
              <h2>{lectureDiscussion.name}</h2>
              <span className="peo-opinion">전체 의견 <strong>638</strong></span>
              <span><strong className="peo-date">{moment(lectureFeedbackContent?.time).format('YYYY.MM.DD')}</strong></span>
            </div>
            
            {/* 본문 */}
            <div className="discuss-box2">
              {/* <img src={MaskImg} className="discuss-main-img" /> */}
              <div className="discuss-text-wrap" >
                {more && (
                  <div className="ql-snow">
                    <div
                      dangerouslySetInnerHTML={{ __html: `${lectureFeedbackContent?.content}` }}
                    />
                  </div>
                )}
                {!more && (
                  <p className="discuss-text-belt">{lectureFeedbackContent?.content}</p>
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
              {/* 관련 URL */}
              <div className="community-board-down discuss2">
                <div className="board-down-title href">
                    <p>
                      {" "}
                      <Image src={`${PUBLIC_URL}/images/all/icon-url.png`} alt="" style={{display: 'inline-block'}}/>
                      관련 URL
                    </p>
                    {lectureFeedbackContent && lectureFeedbackContent.relatedUrlList?.map((item: any) => (
                      <Link to={item.url}>{item.title}</Link>
                    ))}
                </div>
              </div>

              {/* 관련 자료 */}
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

                    {/* <div className="down">
                      <Checkbox
                        className="base"
                      />
                      <Icon
                        className="icon-down-type4"
                      />
                    </div> */}
                  </div>
                </div>
              </div>  
            {/* discuss-box2 */}
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
