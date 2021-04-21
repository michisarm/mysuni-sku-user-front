import React, { useCallback, useEffect, useState, Fragment, useMemo } from 'react';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useLectureDescription } from 'lecture/detail/service/useLectureCourseOverview/useLectureDescription';
import { useLectureCubeSummary } from 'lecture/detail/service/useLectureCourseOverview/useLectureCubeSummary';
import { useLectureSubcategory } from 'lecture/detail/service/useLectureCourseOverview/useLectureSubcategory';
import LectureDescriptionView from '../view/LectureOverview/LectureDescriptionView';
import { useLectureFile } from 'lecture/detail/service/useLectureFile';
import { useLectureTags } from 'lecture/detail/service/useLectureCourseOverview/useLectureTags';
import { Checkbox, Image, List, Icon } from 'semantic-ui-react';
import { CommentList } from '@nara.drama/feedback';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import { useLectureState } from '../../store/LectureStateStore';
import { submitRegisterStudent, refresh } from '../../../../../src/lecture/detail/service/useLectureState/utility/cubeStateActions';
import depot, { DepotFileViewModel } from '@nara.drama/depot';

type RelatedUrlList = {
  title: string;
  url: string;
}

const PUBLIC_URL = process.env.PUBLIC_URL;
const fileDownload = (pdf: string, fileId: string) => {
  depot.downloadDepotFile(fileId);
};

function LectureCubeDiscussionContainer() {
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [LectureCubeSummary] = useLectureCubeSummary();
  const [lectureFile] = useLectureFile();
  const [lectureTags] = useLectureTags();
  const lectureState = useLectureState();

  const [cubeCommentCount, setCubeCommentCount] = useState<number>(0);
  const [cubeSubCommentCount, setCubeSubCommentCount] = useState<number>(0);
  const [cubeAutomaticCompletion, setCubeAutomaticCompletion] = useState<boolean>(false);
  const [cubeRelatedUrlList, setCubeRelatedUrlList] = useState<RelatedUrlList[]>();
  const [commentCount, setCommentCount] = useState<number>(0);
  const [subCommentCount, setSubCommentCount] = useState<number>(0);
  const [filesMap, setFilesMap] = useState<Map<string, any>>(new Map<string, any>());

  const originArr: string[] = [];
  let origin: string = '';

  const { company, department, email, name } = useMemo(() => {
    const {
      skProfile: {
        member: { company, department, email, name },
      },
    } = SkProfileService.instance;
    return { company, department, email, name };
  }, []);

  const registerStudent = useCallback(async () => {
    if(lectureState && lectureState.student === undefined){
      await submitRegisterStudent()
    }
  }, [lectureState]);

  const onRefresh = () => {
    setTimeout(() => {
      refresh(1)
    }, 1000);
  };

  const getFileIds = useCallback(() => {
    const referenceFileBoxId =
    lectureState?.cubeDetail.cubeContents && lectureState?.cubeDetail.cubeContents.fileBoxId;
    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
    });
  }, [lectureState?.cubeDetail.cubeContents]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then(files => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
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


  useEffect(() => {
    // console.log('LectureCubeDiscussionContainer', lectureState)
    if(lectureState?.student){
      setCommentCount(lectureState?.student.commentCount)
      setSubCommentCount(lectureState?.student.subCommentCount)
    }

    if(lectureState
      && lectureState.cubeDetail
      && lectureState.cubeDetail.cubeMaterial
      && lectureState.cubeDetail.cubeMaterial.cubeDiscussion){
        setCubeCommentCount(lectureState.cubeDetail.cubeMaterial.cubeDiscussion.completionCondition.commentCount)
        setCubeSubCommentCount(lectureState.cubeDetail.cubeMaterial.cubeDiscussion.completionCondition.subCommentCount)
        setCubeAutomaticCompletion(lectureState.cubeDetail.cubeMaterial.cubeDiscussion.automaticCompletion)
        setCubeRelatedUrlList(lectureState.cubeDetail.cubeMaterial.cubeDiscussion.relatedUrlList)
    }

    if(lectureState?.cubeDetail.cubeContents){
      getFileIds()
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
      {lectureState && (
        <div className="contents">
          <LectureCubeSummaryContainer />
          <div className="discuss-wrap">
            {/* 자동/수동 이수조건, 이수조건 Text내용 표현 */}
            <div className="task-condition">
              <strong className="task-condition">이수조건</strong>
              {cubeAutomaticCompletion ? (
                  <span>본 Task는 <strong>Comment {cubeCommentCount}건 / Comment Reply {cubeSubCommentCount}건</strong>을 수행해 주시면, 자동 이수 처리됩니다.</span>
                ) : (
                  <span>본 Task는 담당자가 직접 확인하고, 수동으로 일괄 처리합니다.</span>
                )
              }
              {(lectureDescription && lectureDescription.completionTerms) && (
                <Fragment>
                  <p
                    dangerouslySetInnerHTML={{ __html: replaceEnterWithBr(lectureDescription.completionTerms) }}
                  />
                </Fragment>
              )}
            </div>
            {/* 교육내용 표현 */}
            {lectureDescription && (
              <Fragment>
                {/* <p>{replaceEnterWithBr(lectureDescription.completionTerms)}</p> */}
                <div className="discuss-box2 task">
                  <span className="discuss-intro-title">토론 안내</span>
                    <LectureDescriptionView
                      htmlContent={lectureDescription.description}
                      overviewClass="class-guide-txt fn-parents mt0"
                    />
                </div>
              </Fragment>
            )}
            {/* 관련 URL Link */}
            <div className="discuss-box2">  
              {cubeRelatedUrlList &&
                cubeRelatedUrlList.length > 0 &&
                (cubeRelatedUrlList[0].title !== '' ||
                  cubeRelatedUrlList[0].url !== '') && (
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
                        {cubeRelatedUrlList &&
                          cubeRelatedUrlList.map(
                            (item: any, index: number) => (
                              <a href={item.url} target="blank" key={index}>
                                {item.title}
                              </a>
                            )
                          )}
                      </div>
                    </div>
                  )}

              {/* 첨부파일 표현 */}
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

          {/* 내가 작성한 댓글 Count */}
          {(lectureState?.student && cubeAutomaticCompletion) && (
            <div className="scrolling-area area2 ">
                <div className="ui segment full">
                  <List as="ul" className="my-task-bar">
                    <List.Item as="li"><Icon className="my-comment"/> My Comment<em><strong>{commentCount}건</strong>/{cubeCommentCount}건</em></List.Item>
                    <List.Item as="li"><Icon className="my-comment-reply"/>My Comment Reply<em><strong>{subCommentCount}건</strong>/{cubeSubCommentCount}건</em></List.Item>
                  </List>
                </div>
            </div>
          )}

          <CommentList
            feedbackId={lectureState.cubeDetail.cubeContents.commentFeedbackId}
            hideCamera
            name={name}
            email={email}
            companyName={company}
            departmentName={department}
            // cardId={params?.cardId}
            menuType="DISCUSSION"
            cubeCommentStartFunction={registerStudent}
            cubeCommentEndFunction={onRefresh}
          />
        </div>
      )}
    </>
  );
}

export default LectureCubeDiscussionContainer;
