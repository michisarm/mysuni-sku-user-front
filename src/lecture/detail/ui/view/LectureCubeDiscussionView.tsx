/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
  Fragment,
  useMemo,
} from 'react';
import { useLectureDescription } from 'lecture/detail/service/useLectureCourseOverview/useLectureDescription';
import LectureDescriptionView from '../view/LectureOverview/LectureDescriptionView';
import { Checkbox, Image, List, Icon } from 'semantic-ui-react';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import {
  submitRegisterStudent,
  refresh,
} from '../../../../../src/lecture/detail/service/useLectureState/utility/cubeStateActions';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import iconUrl from '../../../../style/media/icon-url.png';
import iconFile from '../../../../style/media/icon-community-file-copy-2.png';
import LectureState from '../../viewModel/LectureState';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import CommunityProfileModal from '../../../../community/ui/view/CommunityProfileModal';
import { findCommunityProfile } from '../../../../layout/UserApp/api/ProfileAPI';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { Comment } from '@sku/skuniv-ui-comment';
import {
  getLectureComment,
  setLectureComment,
} from 'lecture/detail/store/LectureOverviewStore';
import {
  NotieSimpleCdo,
  NotieSpaceType,
} from '@sku/skuniv-ui-comment/lib/api.models';

interface LectureCubeDiscussionViewProps {
  lectureState: LectureState;
}

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

const LectureCubeDiscussionView: React.FC<LectureCubeDiscussionViewProps> =
  function LectureCubeDiscussionView({ lectureState }) {
    // function LectureCubeDiscussionContainer() {
    type RelatedUrlList = {
      title: string;
      url: string;
    };

    const PUBLIC_URL = process.env.PUBLIC_URL;
    const [lectureDescription] = useLectureDescription();
    // const lectureState = useLectureState();

    const [cubeCommentCount, setCubeCommentCount] = useState<number>(0);
    const [cubeSubCommentCount, setCubeSubCommentCount] = useState<number>(0);
    const [cubeAutomaticCompletion, setCubeAutomaticCompletion] =
      useState<boolean>(false);
    const [privateComment, setPrivateComment] = useState<boolean>(false);
    const [cubeRelatedUrlList, setCubeRelatedUrlList] =
      useState<RelatedUrlList[]>();
    const [commentCount, setCommentCount] = useState<number>(0);
    const [subCommentCount, setSubCommentCount] = useState<number>(0);
    const [filesMap, setFilesMap] = useState<Map<string, any>>(
      new Map<string, any>()
    );
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [profileInfo, setProfileInfo] = useState<profileParams>();

    const { companyName, departmentName, name, email } = useMemo(() => {
      const {
        skProfile: {
          companyName,
          departmentName,
          name,
          email,
          // member: { company, department, email, name },
        },
      } = SkProfileService.instance;
      return { companyName, departmentName, name, email };
    }, []);

    useEffect(() => {
      if (lectureState) {
        // 댓글, 대댓글 Count Data
        if (lectureState.student) {
          setCommentCount(lectureState?.student.commentCount);
          setSubCommentCount(lectureState?.student.subCommentCount);
        }

        if (lectureState.cubeDetail) {
          // 이수조건(댓글 수, 대댓글 수, 자동이수여부), 관련 Url Data
          if (
            lectureState.cubeDetail.cubeMaterial &&
            lectureState.cubeDetail.cubeMaterial.cubeDiscussion
          ) {
            setCubeCommentCount(
              lectureState.cubeDetail.cubeMaterial.cubeDiscussion
                .completionCondition.commentCount
            );
            setCubeSubCommentCount(
              lectureState.cubeDetail.cubeMaterial.cubeDiscussion
                .completionCondition.subCommentCount
            );
            setCubeAutomaticCompletion(
              lectureState.cubeDetail.cubeMaterial.cubeDiscussion
                .automaticCompletion
            );
            setCubeRelatedUrlList(
              lectureState.cubeDetail.cubeMaterial.cubeDiscussion.relatedUrlList
            );
            setPrivateComment(
              lectureState.cubeDetail.cubeMaterial.cubeDiscussion.privateComment
            );
          }

          //  관련자료 Data
          if (lectureState.cubeDetail.cubeContents) {
            getFileIds();
          }
        }
      }
    }, []);

    const originArr: string[] = [];
    let origin: string = '';

    // 파일 클릭하여 다운로드
    const fileDownload = (pdf: string, fileId: string) => {
      depot.downloadDepotFile(fileId);
    };

    // 선택, 전체선택 파일 다운로드
    const zipFileDownload = useCallback(
      (type: string) => {
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
              filesMap
                .get('reference')
                ?.map((foundedFile: DepotFileViewModel) => {
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
            title: getPolyglotText('안내', 'Collage-Discussion-안내'),
            message: getPolyglotText(
              `다운로드 받으실 첨부파일을 선택해 주세요.`,
              'Collage-Discussion-첨부파일1'
            ),
          });
        }
      },
      [filesMap, origin, originArr]
    );

    const getFileIds = useCallback(() => {
      const referenceFileBoxId =
        lectureState?.cubeDetail.cubeContents &&
        lectureState?.cubeDetail.cubeContents.fileBoxId;
      Promise.resolve().then(() => {
        if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
      });
    }, [lectureState.cubeDetail.cubeContents]);

    const findFiles = useCallback(
      (type: string, fileBoxId: string) => {
        depot.getDepotFiles(fileBoxId).then((files) => {
          filesMap.set(type, files);
          const newMap = new Map(filesMap.set(type, files));
          setFilesMap(newMap);
        });
      },
      [filesMap]
    );

    const checkOne = useCallback((e: any, value: any, depotData: any) => {
      if (value.checked && depotData.id) {
        originArr.push(depotData.id);
        origin = depotData.id;
      }
      if (!(value.checked && depotData.id)) {
        originArr.splice(originArr.indexOf(depotData.id), 1);
      }
    }, []);

    // 코멘드 등록 시 학습처리 CommentList -> Props
    const registerStudent = useCallback(async () => {
      if (lectureState && lectureState.student === undefined) {
        await submitRegisterStudent();
      }
    }, [lectureState]);

    // 코멘드 등록 시 화면 새로고침 CommentList -> Props
    const onRefresh = () => {
      setTimeout(() => {
        refresh(1);
      }, 1000);
    };

    // Manager-Front 에서 등록한 이수조건 엔터 값 처리
    const replaceEnterWithBr = (target?: string) => {
      let setHtml = '';
      if (target) {
        setHtml = target.split('\n').join('<br />');
      }
      return setHtml;
    };

    const clickProfileEventHandler = useCallback(async (denizenId: string) => {
      const id = document.body.getAttribute('selectedProfileId');
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
      console.log('notie 테스트');

      const result = {
        backLink: window.location.pathname,
        title: NotieSpaceType.NOTICE,
      };

      console.dir(result);

      return result;
    };

    return (
      <>
        {lectureState && (
          <div className="contents">
            {/* <LectureCubeSummaryContainer /> */}
            <div className="discuss-wrap">
              {/* 자동/수동 이수조건, 이수조건 Text내용 표현 */}
              <div className="task-condition">
                <strong className="task-condition">
                  <PolyglotText
                    id="Collage-Discussion-이수조건"
                    defaultString="이수 조건"
                  />
                </strong>
                {cubeAutomaticCompletion &&
                  !privateComment &&
                  cubeCommentCount > 0 &&
                  cubeSubCommentCount > 0 && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          `다음의 토론 주제에 대한
                          <strong>나의 생각을 {cubeCommentCount}건</strong>
                          작성해주시고, 타 학습자의 작성 내용 중 관심이 가는 의견에
                          대해 <strong>댓글을 {cubeSubCommentCount}건</strong>
                          작성해주시면 자동으로 이수 처리가 됩니다.`,
                          'Collage-Discussion-이수안내1',
                          {
                            cubeCommentCount: cubeCommentCount.toString(),
                            cubeSubCommentCount: cubeSubCommentCount.toString(),
                          }
                        ),
                      }}
                    />
                  )}
                {cubeAutomaticCompletion &&
                  (privateComment ||
                    (cubeCommentCount > 0 && cubeSubCommentCount === 0)) && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          `다음의 토론 주제에 대한
                        <strong>나의 생각을 {cubeCommentCount}건</strong>
                        작성해주시면 자동으로 이수 처리가 됩니다.`,
                          'Collage-Discussion-이수안내2',
                          {
                            cubeCommentCount: cubeCommentCount.toString(),
                          }
                        ),
                      }}
                    />
                  )}
                {cubeAutomaticCompletion &&
                  !privateComment &&
                  cubeCommentCount === 0 &&
                  cubeSubCommentCount > 0 && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          `타 학습자의 작성 내용 중 관심이 가는 의견에 대해{' '}
                        <strong>댓글을 {cubeSubCommentCount}건</strong>{' '}
                        작성해주시면 자동으로 이수 처리가 됩니다.`,
                          'Collage-Discussion-이수안내3',
                          {
                            cubeSubCommentCount: cubeSubCommentCount.toString(),
                          }
                        ),
                      }}
                    />
                  )}
                {!cubeAutomaticCompletion && (
                  <span>
                    <PolyglotText
                      id="Collage-Discussion-이수처리안내"
                      defaultString="본 과정은 담당자가 이수 조건 충족 여부를 확인 후 이수 처리해
                      드립니다."
                    />
                  </span>
                )}
                {lectureDescription && lectureDescription.completionTerms && (
                  <Fragment>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: replaceEnterWithBr(
                          lectureDescription.completionTerms
                        ),
                      }}
                    />
                  </Fragment>
                )}
              </div>

              {/* 교육내용 표현 */}
              <div className="discuss-box2 task">
                {lectureDescription && lectureDescription.description && (
                  <Fragment>
                    <span className="discuss-intro-title">
                      <PolyglotText
                        id="Collage-Discussion-토론안내"
                        defaultString="토론 안내"
                      />
                    </span>
                    <LectureDescriptionView
                      htmlContent={lectureDescription.description}
                    />
                  </Fragment>
                )}
              </div>

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
                            src={iconUrl}
                            alt=""
                            style={{ display: 'inline-block' }}
                          />
                          <PolyglotText
                            id="Collage-Discussion- URL"
                            defaultString="관련 URL"
                          />
                        </p>
                        {cubeRelatedUrlList &&
                          cubeRelatedUrlList.map((item: any, index: number) => (
                            <a href={item.url} target="blank" key={index}>
                              {item.title}
                            </a>
                          ))}
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
                            <img src={iconFile} />
                            <PolyglotText
                              id="Collage-Discussion-첨부파일2"
                              defaultString="첨부파일"
                            />
                          </p>
                          <div className="board-down-title-right">
                            <button
                              className="ui icon button left post delete"
                              onClick={() => zipFileDownload('select')}
                            >
                              <i
                                aria-hidden="true"
                                className="icon check icon"
                              />
                              <PolyglotText
                                id="Collage-Discussion-선택다운로드"
                                defaultString="선택 다운로드"
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
                                id="Collage-Discussion-전체다운로드"
                                defaultString="전체 다운로드"
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
                                    fileDownload(
                                      foundedFile.name,
                                      foundedFile.id
                                    )
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

            {/* 내가 작성한 댓글, 대댓글 Count 표현 */}
            {lectureState?.student && cubeAutomaticCompletion && (
              <div className="scrolling-area area2 ">
                <div className="ui segment full">
                  <List as="ul" className="my-task-bar">
                    {cubeCommentCount > 0 && (
                      <List.Item as="li">
                        <Icon className="my-comment" />
                        <PolyglotText
                          id="Collage-Discussion-Comments"
                          defaultString="My Comment"
                        />
                        <em>
                          <strong>
                            {commentCount}
                            <PolyglotText
                              id="Collage-Discussion-건수"
                              defaultString="건"
                            />
                          </strong>
                          /{cubeCommentCount}
                          <PolyglotText
                            id="Collage-Discussion-건수"
                            defaultString="건"
                          />
                        </em>
                      </List.Item>
                    )}
                    {!privateComment && cubeSubCommentCount > 0 && (
                      <List.Item as="li">
                        <Icon className="my-comment-reply" />
                        <PolyglotText
                          id="Collage-Discussion-reply"
                          defaultString="My reply"
                        />
                        <em>
                          <strong>
                            {subCommentCount}
                            <PolyglotText
                              id="Collage-Discussion-건수"
                              defaultString="건"
                            />
                          </strong>
                          /{cubeSubCommentCount}
                          <PolyglotText
                            id="Collage-Discussion-건수"
                            defaultString="건"
                          />
                        </em>
                      </List.Item>
                    )}
                  </List>
                </div>
              </div>
            )}
            <div className="contents comment">
              <Comment
                feedbackId={
                  lectureState.cubeDetail.cubeContents.commentFeedbackId
                }
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
                onBeforeRegisterComment={registerStudent}
                onAfterRegisterComment={onRefresh}
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
          </div>
        )}
      </>
    );
  };

export default LectureCubeDiscussionView;
