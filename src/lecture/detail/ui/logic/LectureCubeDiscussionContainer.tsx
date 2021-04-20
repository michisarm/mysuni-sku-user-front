import React, { useCallback, useEffect, useState, Fragment, useMemo } from 'react';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useLectureDescription } from 'lecture/detail/service/useLectureCourseOverview/useLectureDescription';
import { useLectureCubeSummary } from 'lecture/detail/service/useLectureCourseOverview/useLectureCubeSummary';
import { useLectureSubcategory } from 'lecture/detail/service/useLectureCourseOverview/useLectureSubcategory';
import LectureDescriptionView from '../view/LectureOverview/LectureDescriptionView';
import { useLectureFile } from 'lecture/detail/service/useLectureFile';
import { useLectureTags } from 'lecture/detail/service/useLectureCourseOverview/useLectureTags';
import { useHistory, useLocation } from 'react-router-dom';
import { getLectureParams } from '../../store/LectureParamsStore';
import { OverviewField } from '../../../../personalcube';
import { Image, List, Icon } from 'semantic-ui-react';
import { CommentList } from '@nara.drama/feedback';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import { useLectureState } from '../../store/LectureStateStore';

const PUBLIC_URL = process.env.PUBLIC_URL;

function LectureCubeDiscussionContainer() {
  const history = useHistory();

  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [LectureCubeSummary] = useLectureCubeSummary();
  const [lectureFile] = useLectureFile();
  const [lectureTags] = useLectureTags();
  const lectureState = useLectureState();
  const [commentCount, setCommentCount] = useState<number>(0);
  const [subCommentCount, setSubCommentCount] = useState<number>(0);
  // const { student } = lectureState;

  const { company, department, email, name } = useMemo(() => {
    const {
      skProfile: {
        member: { company, department, email, name },
      },
    } = SkProfileService.instance;
    return { company, department, email, name };
  }, []);

  const onClickList = useCallback(() => {
    // setLectureTaskViewType('list');
    // history.goBack();
    // 리스트로 돌아가기
    const params = getLectureParams();
    if (params === undefined) {
      return;
    }
    history.push({
      pathname: `/lecture/card/${params.cardId}/cube/${params.cubeId}/${params.viewType}/${params.cubeType}`,
    });
  }, []);

  // useEffect(() => {
  //   const params = getLectureParams();
  //   if (params === undefined) {
  //     return;
  //   }
  //   const structureItem = getActiveStructureItem(params.pathname);
  //   if (structureItem !== undefined) {
  //     const { cubeId } = structureItem as LectureStructureCubeItem;
  //     if (cubeId !== undefined) {
  //       setBoardId(cubeId);
  //     }
  //   }
  // }, [create]);

  useEffect(() => {
    console.log('LectureCubeDiscussionContainer commentFeedbackId', lectureState)
    console.log('LectureCubeDiscussionContainer commentFeedbackId', lectureState?.cubeDetail.cubeContents.commentFeedbackId)
    console.log('LectureCubeDiscussionContainer student', lectureState?.student)
    if(lectureState?.student){
      // setCommentCount(lectureState?.student.commentCount)
      // setSubCommentCount(lectureState?.student.subCommentCount)
    }

  }, [lectureState]);

  

  const replaceEnterWithBr = (target?: string) => {
    let setHtml = '';
    if(target){
      setHtml = target.split('\n').join('<br />');
    }
    return setHtml;
  };

  return (
    <>
      <div id="Posts" />
      {lectureState && (
        <div className="contents">
          <LectureCubeSummaryContainer />
          <div className="discuss-wrap">
            <div className="task-condition">
              <strong className="task-condition">이수조건</strong>
              {lectureState?.cubeDetail.cubeMaterial.cubeDiscussion?.automaticCompletion ? (
                  <span>(확인용 자동 : )본 Task는 <strong>Comment {lectureState?.cubeDetail.cubeMaterial.cubeDiscussion.completionCondition.commentCount}건 / Comment Reply {lectureState?.cubeDetail.cubeMaterial.cubeDiscussion.completionCondition.subCommentCount}건</strong>을 수행해 주시면, 자동 이수 처리됩니다.</span>
                ) : (
                  <span>(확인용 수동 : )본 Task는 담당자가 직접 확인하고, 수동으로 일괄 처리합니다.</span>
                )
              }
              {(lectureDescription && lectureDescription.completionTerms) && (
                <Fragment>
                  {/* <p>{replaceEnterWithBr(lectureDescription.completionTerms)}</p> */}
                  <p
                    dangerouslySetInnerHTML={{ __html: replaceEnterWithBr(lectureDescription.completionTerms) }}
                  />
                </Fragment>
              )}
            </div>
            {/* <p>1. Posts 게시판에 올라온 타(他) 학습자 게시물을 읽어보고 댓글 3개 이상 작성</p>
            <p>2. Posts 게시판에 과제 질문에 대한 자신만의 적절하고 성실한 답변 작성 (공백 포함 300자 이상)</p> */}
              {lectureDescription && (
                <Fragment>
                  {/* <p>{replaceEnterWithBr(lectureDescription.completionTerms)}</p> */}
                  <div className="discuss-box2 task">
                    <span className="discuss-intro-title">토론 안내</span>
                      <LectureDescriptionView
                        htmlContent={lectureDescription.description}
                      />
                  </div>
                </Fragment>
              )}
            <div className="discuss-box2">
            {/* {lectureFeedbackContent &&
                lectureFeedbackContent.relatedUrlList &&
                lectureFeedbackContent.relatedUrlList.length > 0 &&
                (lectureFeedbackContent.relatedUrlList[0].title !== '' ||
                  lectureFeedbackContent.relatedUrlList[0].url !== '') && (
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
                            <a href={item.url} target="blank">
                              {item.title}
                            </a>
                          )
                        )}
                    </div>
                  </div>
                )
          } */}
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
                  <a href="www.naver.com" target="blank">
                          참고 Url Test Naver
                  </a>
                </div>
              </div>
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
                          // onClick={() => zipFileDownload('select')}
                        >
                          <i aria-hidden="true" className="icon check icon" />
                          선택 다운로드
                        </button>
                        <button
                          className="ui icon button left post list2"
                          // onClick={() => zipFileDownload('all')}
                        >
                          <img
                            src={`${PUBLIC_URL}/images/all/icon-down-type-4-24-px.png`}
                          />
                          전체 다운로드
                        </button>
                      </div>
                    </div>
                    {/* {filesMap.get('reference') &&
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
                        ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 내가 작성한 댓글 Count */}
          <div className="scrolling-area area2 ">
              <div className="ui segment full">
                <List as="ul" className="my-task-bar">
                  <List.Item as="li"><Icon className="my-comment"/> My Comment<em><strong>{commentCount}건</strong>/10건</em></List.Item>
                  <List.Item as="li"><Icon className="my-comment-reply"/>My Comment Reply<em><strong>{subCommentCount}건</strong>/5건</em></List.Item>
                </List>
              </div>
          </div>
          <CommentList
            feedbackId={lectureState.cubeDetail.cubeContents.commentFeedbackId}
            hideCamera
            name={name}
            email={email}
            companyName={company}
            departmentName={department}
            // cardId={params?.cardId}
            menuType="discussion"
          />
        </div>
      )}
    </>
  );
}

export default LectureCubeDiscussionContainer;
