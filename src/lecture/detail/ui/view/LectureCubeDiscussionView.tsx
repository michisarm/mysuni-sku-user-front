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
  getLectureCardSummary,
  getLectureComment,
  setLectureComment,
} from 'lecture/detail/store/LectureOverviewStore';
import { getDenizenIdFromAudienceId } from '../../utility/getDenizenIdFromAudienceId';
import { getLectureDiscussionPrivateComment } from 'lecture/detail/store/LectureStateStore';
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
    const [isPrivateDiscussionAuth, setIsPrivateDiscussionAuth] =
      useState<boolean>(false);
    const cardInfo = getLectureCardSummary();
    const isPrivateComment = getLectureDiscussionPrivateComment();
    const { companyName, departmentName, name, email, id } = useMemo(() => {
      const {
        skProfile: { companyName, departmentName, name, email, id },
      } = SkProfileService.instance;
      return { companyName, departmentName, name, email, id };
    }, []);

    useEffect(() => {
      if (lectureState) {
        // ??????, ????????? Count Data
        if (lectureState.student) {
          setCommentCount(lectureState?.student.commentCount);
          setSubCommentCount(lectureState?.student.subCommentCount);
        }

        if (lectureState.cubeDetail) {
          // ????????????(?????? ???, ????????? ???, ??????????????????), ?????? Url Data
          if (
            lectureState.cubeDetail.cubeMaterial &&
            lectureState.cubeDetail.cubeMaterial.cubeDiscussion
          ) {
            // ????????? discussion ????????? : ???????????????,???????????????,???????????????,???????????????(0221)
            // const regiserAndOperator = [
            //   cardInfo?.operator.id,
            //   getDenizenIdFromAudienceId(cardInfo?.patronKey.keyString),
            //   getDenizenIdFromAudienceId(
            //     lectureState.cubeDetail.cubeContents.patronKey.keyString
            //   ),
            //   lectureState.cubeDetail.cubeContents.operator.keyString,
            // ];
            // const isHasAuth = regiserAndOperator.some((name) => name === id);

            // ????????? discussion ????????? : ???????????????(0221)
            const isHasAuth =
              lectureState.cubeDetail.cubeContents.operator.keyString === id;
            setIsPrivateDiscussionAuth(isHasAuth);

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
            setPrivateComment(isPrivateComment || false);
          }

          //  ???????????? Data
          if (lectureState.cubeDetail.cubeContents) {
            getFileIds();
          }
        }
      }
    }, []);

    const originArr: string[] = [];
    let origin: string = '';

    // ?????? ???????????? ????????????
    const fileDownload = (pdf: string, fileId: string) => {
      depot.downloadDepotFile(fileId);
    };

    // ??????, ???????????? ?????? ????????????
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
            title: getPolyglotText('??????', 'Collage-Discussion-??????'),
            message: getPolyglotText(
              `???????????? ????????? ??????????????? ????????? ?????????.`,
              'Collage-Discussion-????????????1'
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

    // ????????? ?????? ??? ???????????? CommentList -> Props
    const registerStudent = useCallback(async () => {
      if (lectureState && lectureState.student === undefined) {
        await submitRegisterStudent();
      }
    }, [lectureState]);

    // ????????? ?????? ??? ?????? ???????????? CommentList -> Props
    const onRefresh = () => {
      setTimeout(() => {
        refresh(1);
      }, 1000);
    };

    // Manager-Front ?????? ????????? ???????????? ?????? ??? ??????
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
        title: getPolyglotText('??????', 'feedback-comment-notice-title'),
        message: getPolyglotText(
          '?????? ????????? ???????????????.',
          'feedback-comment-notice-nonetext-message'
        ),
      });
    };

    const onRemoveCommentConfirm = () => {
      return new Promise<boolean>((resolve) => {
        reactConfirm({
          title: getPolyglotText('??????', 'feedback-comment-delete-title'),
          message: getPolyglotText(
            '????????? ?????? ???????????????????',
            'feedback-comment-delete-message'
          ),
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });
    };

    // ??????, ?????????, ????????? ?????? ??????
    const getNotieCdo = (): NotieSimpleCdo | undefined => {
      //

      const result = {
        backLink: window.location.pathname.replace('/suni-main', ''),
        title: NotieSpaceType.LEARNING,
      };

      return result;
    };

    return (
      <>
        {lectureState && (
          <div className="contents">
            {/* <LectureCubeSummaryContainer /> */}
            <div className="discuss-wrap">
              {/* ??????/?????? ????????????, ???????????? Text?????? ?????? */}
              <div className="task-condition">
                <strong className="task-condition">
                  <PolyglotText
                    id="Collage-Discussion-????????????"
                    defaultString="?????? ??????"
                  />
                </strong>
                {cubeAutomaticCompletion &&
                  !privateComment &&
                  cubeCommentCount > 0 &&
                  cubeSubCommentCount > 0 && (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          `????????? ?????? ????????? ??????
                          <strong>?????? ????????? {cubeCommentCount}???</strong>
                          ??????????????????, ??? ???????????? ?????? ?????? ??? ????????? ?????? ?????????
                          ?????? <strong>????????? {cubeSubCommentCount}???</strong>
                          ?????????????????? ???????????? ?????? ????????? ?????????.`,
                          'Collage-Discussion-????????????1',
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
                          `????????? ?????? ????????? ??????
                        <strong>?????? ????????? {cubeCommentCount}???</strong>
                        ?????????????????? ???????????? ?????? ????????? ?????????.`,
                          'Collage-Discussion-????????????2',
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
                          `??? ???????????? ?????? ?????? ??? ????????? ?????? ????????? ??????{' '}
                        <strong>????????? {cubeSubCommentCount}???</strong>{' '}
                        ?????????????????? ???????????? ?????? ????????? ?????????.`,
                          'Collage-Discussion-????????????3',
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
                      id="Collage-Discussion-??????????????????"
                      defaultString="??? ????????? ???????????? ?????? ?????? ?????? ????????? ?????? ??? ?????? ?????????
                      ????????????."
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

              {/* ???????????? ?????? */}
              <div className="discuss-box2 task">
                {lectureDescription && lectureDescription.description && (
                  <Fragment>
                    <span className="discuss-intro-title">
                      <PolyglotText
                        id="Collage-Discussion-????????????"
                        defaultString="?????? ??????"
                      />
                    </span>
                    <LectureDescriptionView
                      htmlContent={lectureDescription.description}
                    />
                  </Fragment>
                )}
              </div>

              {/* ?????? URL Link */}
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
                            defaultString="?????? URL"
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

                {/* ???????????? ?????? */}
                {filesMap.get('reference') && (
                  <div className="community-board-down discuss2">
                    <div className="community-contants">
                      <div className="community-board-down">
                        <div className="board-down-title">
                          <p>
                            <img src={iconFile} />
                            <PolyglotText
                              id="Collage-Discussion-????????????2"
                              defaultString="????????????"
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
                                id="Collage-Discussion-??????????????????"
                                defaultString="?????? ????????????"
                              />
                            </button>
                            <button
                              className="ui icon button left post list2"
                              onClick={() => zipFileDownload('all')}
                            >
                              <img src="https://image.mysuni.sk.com/suni-asset/public/images/all//icon-down-type-5-24-px.svg" />
                              <PolyglotText
                                id="Collage-Discussion-??????????????????"
                                defaultString="?????? ????????????"
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

            {/* ?????? ????????? ??????, ????????? Count ?????? */}
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
                              id="Collage-Discussion-??????"
                              defaultString="???"
                            />
                          </strong>
                          /{cubeCommentCount}
                          <PolyglotText
                            id="Collage-Discussion-??????"
                            defaultString="???"
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
                              id="Collage-Discussion-??????"
                              defaultString="???"
                            />
                          </strong>
                          /{cubeSubCommentCount}
                          <PolyglotText
                            id="Collage-Discussion-??????"
                            defaultString="???"
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
                isDiscussion={true}
                privateComment={privateComment}
                isPrivateDiscussionAuth={isPrivateDiscussionAuth}
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
