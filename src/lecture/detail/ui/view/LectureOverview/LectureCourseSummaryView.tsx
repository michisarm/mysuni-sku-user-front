import { reactAlert } from '@nara.platform/accent';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Rating } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import CategoryColorType from '../../../../../shared/model/CategoryColorType';
import LectureCourseSummary from '../../../viewModel/LectureOverview/LectureCardSummary';
import ReactGA from 'react-ga';
import StampCompleted from '../../../../../style/media/stamp-completed.svg';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import { State } from '../../../viewModel/LectureState';
import { findIsBookmark } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import { PostService } from '../../../../../board/stores';
import { getCollgeName } from '../../../../../shared/service/useCollege/useRequestCollege';
import { Thumbnail } from '../../../../shared/ui/view/LectureElementsView';
import { useLectureParams } from '../../../store/LectureParamsStore';
import { Area } from 'tracker/model';
import LectureStateContainer from '../../logic/LectureStateContainer';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { PageElement } from '../../../../shared/model/PageElement';
import { addBookMark, deleteBookMark } from 'shared/service/requestBookmarks';
import {
  initLectureCourseSatisfaction,
  useLectureCoureSatisfaction,
} from 'lecture/detail/store/LectureOverviewStore';
import LectureCardSummary from '../../../viewModel/LectureOverview/LectureCardSummary';
import moment from 'moment';
import { getCurrentHistory } from '../../../../../shared/store/HistoryStore';
import { parsePolyglotHTML } from '../../../../../shared/helper/parseHelper';

function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

interface LectureCourseSummaryViewProps {
  lectureSummary: LectureCourseSummary;
  lectureStructure: LectureStructure;
  menuAuth: PageElement[];
}

function copyUrl() {
  const textarea = document.createElement('textarea');
  textarea.value = window.location.href;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  reactAlert({
    title: getPolyglotText('알림', 'Course-Summary-알림'),
    message: getPolyglotText('URL이 복사되었습니다.', 'Course-Summary-URL'),
  });
}

function getColor(collegeId: string) {
  let color = CategoryColorType.Default;

  switch (collegeId) {
    case 'CLG00001':
      color = CategoryColorType.AI;
      break;
    case 'CLG00002':
      color = CategoryColorType.DT;
      break;
    case 'CLG00006':
      color = CategoryColorType.Global;
      break;
    case 'CLG00007':
      color = CategoryColorType.Leadership;
      break;
    case 'CLG00008':
      color = CategoryColorType.Management;
      break;
    case 'CLG00004':
      color = CategoryColorType.SV;
      break;
    case 'CLG00003':
      color = CategoryColorType.Happiness;
      break;
    case 'CLG00019':
      color = CategoryColorType.SemicondDesign;
      break;
    case 'CLG00005':
      color = CategoryColorType.InnovationDesign;
      break;
    case 'CLG00020':
      color = CategoryColorType.BMDesign;
      break;
    case 'CLG0001c':
      color = CategoryColorType.EnergySolution;
  }
  return color;
}

const LectureCourseSummaryView: React.FC<LectureCourseSummaryViewProps> =
  function LectureCourseSummaryView({
    lectureSummary,
    lectureStructure,
    menuAuth,
  }) {
    const params = useLectureParams();
    const [isBookmark, setIsBookmark] = useState<boolean>(false);
    const history = useHistory();
    let difficultyLevelIcon = 'basic';
    switch (lectureSummary.difficultyLevel) {
      case 'Intermediate':
        difficultyLevelIcon = 'inter';
        break;
      case 'Advanced':
        difficultyLevelIcon = 'advanced';
        break;
      case 'Expert':
        difficultyLevelIcon = 'export';
        break;

      default:
        break;
    }

    const state = useMemo<State>(() => {
      return lectureStructure.card.state || 'None';
    }, [lectureStructure]);

    // (react-ga) post pageTitle
    useEffect(() => {
      //
      if (window.location.search === '?_source=newsletter') {
        ReactGA.event({
          category: 'External',
          action: 'Email',
          label: 'Newsletter',
        });
      } else {
        setTimeout(() => {
          ReactGA.pageview(
            window.location.pathname + window.location.search,
            [],
            `(Course) - ${lectureSummary.name}`
          );
        }, 1000);
      }
    }, [lectureSummary.name]);
    const qnaUrl = `/board/support-qna/course/${lectureSummary.cardId}`;

    useEffect(() => {
      const postService = PostService.instance;
      const currentUrl = window.location.href;
      const hostUrl = window.location.host;
      const alarmUrl = currentUrl.split(hostUrl);

      postService.post.alarmInfo.url =
        'https://mysuni.sk.com/login?contentUrl=/suni-main/' + alarmUrl[1];
      postService.post.alarmInfo.managerEmail = lectureSummary.operator.email;
      postService.post.alarmInfo.contentsName = lectureSummary.name;
    }, [lectureSummary]);

    useEffect(() => {
      const postService = PostService.instance;

      postService.post.alarmInfo.url =
        'https://int.mysuni.sk.com/login?contentUrl=/suni-main/lecture/cineroom/ne1-m2-c2/college/' +
        window.location.href.split('college/')[1];
      postService.post.alarmInfo.managerEmail = lectureSummary.operator.email;
      postService.post.alarmInfo.contentsName = lectureSummary.name;
    }, [lectureSummary]);

    useEffect(() => {
      setIsBookmark(findIsBookmark(params?.cardId));
    }, [params?.cardId]);

    async function toggleCardBookmark() {
      const cardId = params?.cardId;

      if (cardId === undefined) {
        return;
      }

      const isBookmark = findIsBookmark(cardId);

      if (isBookmark) {
        deleteBookMark(cardId).then((bookmarks) => {
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          setIsBookmark(findIsBookmark(cardId));
        });
      }

      if (!isBookmark) {
        addBookMark(cardId).then((bookmarks) => {
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          setIsBookmark(findIsBookmark(cardId));
        });
      }
    }

    const satisfaction =
      useLectureCoureSatisfaction() || initLectureCourseSatisfaction();

    const validLearningStartDate = moment(
      lectureStructure.card.student?.registeredTime
    ).format('YYYY-MM-DD');
    // const validLearningEndDate = moment(
    //   lectureSummary.restrictLearningPeriod
    //     ? Math.min(
    //         lectureSummary.learningEndDate,
    //         lectureSummary.validLearningDate
    //       )
    //     : lectureSummary.learningEndDate
    // ).format('YYYY-MM-DD');

    const [onAlertOpen, setAlertOpen] = useState(false);

    const validLearningEndDate = moment(
      lectureSummary.validLearningDate
    ).format('YYYY-MM-DD');

    const escFunction = useCallback(
      (event) => {
        if (event.keyCode === 27 && onAlertOpen) {
          //Do whatever when esc is pressed
          const history = getCurrentHistory();
          history?.push('/');
        }
      },
      [onAlertOpen]
    );

    useEffect(() => {
      //
      document.addEventListener('keydown', escFunction, false);
      const validDate = moment(lectureSummary.validLearningDate).format(
        'YYYY-MM-DD'
      );

      if (lectureSummary.restrictLearningPeriod && !lectureSummary.complete) {
        if (
          moment().valueOf() >
          moment(lectureSummary.validLearningDate).valueOf()
        ) {
          setAlertOpen(true);
          reactAlert({
            title: getPolyglotText(
              '교육기간 만료 안내 default',
              'card-overview-alertheader2'
            ),
            message: getPolyglotText(
              '교육기간이 만료되어 학습카드에 접근할 수 없습니다. default',
              'card-overview-alerttxt2'
            ),
            onClose: () => {
              const history = getCurrentHistory();
              history?.push('/');
            },
          });
        } else {
          reactAlert({
            title: getPolyglotText(
              '학습 참여 기간 안내 default',
              'card-overview-alertheader1'
            ),
            // message: getPolyglotText(
            //   'YYYY-MM-DD 까지 학습하실 수 있습니다 default',
            //   'card-overview-alerttxt1'
            // ),
            message: parsePolyglotHTML(
              'card-overview-alerttxt1',
              'date',
              validDate,
              'YYYY-MM-DD 까지 학습하실 수 있습니다 default'
            ),
            onClose: () => {},
          });
        }
      }

      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }, [onAlertOpen]);

    return (
      <div className="course-info-header" data-area={Area.CARD_HEADER}>
        <div className="contents-header">
          <div className="title-area">
            <div
              className={`ui label ${getColor(
                lectureSummary.category.collegeId
              )}`}
            >
              {getCollgeName(lectureSummary.category.collegeId)}
            </div>
            <div className="header">{lectureSummary.name}</div>
            <div className="header-deatil">
              <div className="item">
                <Label className="bold onlytext">
                  <Icon className={difficultyLevelIcon} />
                  <span>{lectureSummary.difficultyLevel}</span>
                </Label>
                {/*{lectureSummary.validLearningDate !== 0 &&*/}
                {/*  !lectureSummary.restrictLearningPeriod && (*/}
                <Label className="bold onlytext">
                  <span className="header-span-first">
                    <PolyglotText
                      defaultString="유효학습 종료일 default"
                      id="card-overview-valid"
                    />
                  </span>
                  <span>{`${validLearningStartDate} ~ ${validLearningEndDate}`}</span>
                </Label>
                {/*)}*/}
                <Label className="bold onlytext">
                  <Icon className="time2" />
                  <span>{lectureSummary.learningTime}</span>
                </Label>
                {lectureSummary.stampCount !== undefined && (
                  <Label className="bold onlytext">
                    <Icon className="stamp" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          '{stampCount}개',
                          'Course-Summary-갯수',
                          { stampCount: lectureSummary.stampCount.toString() }
                        ),
                      }}
                    />
                  </Label>
                )}
                <Label className="bold onlytext">
                  <span className="header-span-first">
                    <PolyglotText
                      defaultString="이수"
                      id="Course-Summary-이수"
                    />
                  </span>
                  <span>
                    {numberWithCommas(lectureSummary.passedStudentCount)}
                  </span>
                  <span>
                    <PolyglotText defaultString="명" id="Course-Summary-명1" />
                  </span>
                </Label>
                <Label className="bold onlytext">
                  <span className="header-span-first">
                    <PolyglotText
                      defaultString="담당"
                      id="Course-Summary-담당"
                    />
                  </span>
                  <span className="tool-tip">
                    {lectureSummary.operator.name}
                    <i>
                      <span className="tip-name">
                        {lectureSummary.operator.companyName}
                      </span>
                      <a
                        className="tip-mail"
                        href={`mailto:${lectureSummary.operator.email}`}
                      >
                        {lectureSummary.operator.email}
                      </a>
                    </i>
                  </span>
                </Label>
                <Link to={qnaUrl} className="ui icon button left post-s">
                  <Icon className="ask" />
                  <PolyglotText
                    defaultString="문의하기"
                    id="Course-Summary-문의하기"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="right-area">
            {lectureSummary.hasClassroomCube !== true && (
              <>
                {state === 'Completed' ? (
                  <img src={StampCompleted} />
                ) : (
                  lectureSummary.thumbImagePath !== undefined && (
                    <Thumbnail image={lectureSummary.thumbImagePath} />
                  )
                )}
              </>
            )}
            {lectureSummary.hasClassroomCube === true && (
              <LectureStateContainer />
            )}
          </div>
        </div>
        <div className="contents-header-side">
          <div className="title-area">
            <div className="header-deatil">
              <div className="item">
                {satisfaction.surveyCaseId && (
                  <div className="header-rating">
                    <Rating
                      defaultRating={5}
                      maxRating={5}
                      rating={
                        satisfaction?.totalCount !== 0
                          ? satisfaction && satisfaction.average
                          : 5
                      }
                      disabled
                      className="fixed-rating"
                    />
                    <span>
                      {satisfaction?.totalCount !== 0
                        ? `${Math.floor(satisfaction.average * 10) / 10}(${
                            satisfaction?.totalCount
                          }
                            ${getPolyglotText('명', 'cicl-학상본문-명')})`
                        : '0'}
                    </span>

                    {!satisfaction.isDoneSurvey && (
                      <Button
                        className="re-feedback"
                        onClick={() =>
                          history.push(`/lecture/card/${params?.cardId}/survey`)
                        }
                      >
                        <Icon className="edit16" />
                        {getPolyglotText(
                          '평가하기',
                          'survey-reviewOverview-평가'
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right-area">
            <div className="header-right-link">
              {lectureSummary.hasCommunity &&
                menuAuth.some(
                  (pagemElement) =>
                    pagemElement.position === 'TopMenu' &&
                    pagemElement.type === 'Community'
                ) && (
                  <Link
                    to="#"
                    onClick={() =>
                      window.open(
                        `${window.location.origin}/suni-community/community/${lectureSummary.communityId}`
                      )
                    }
                  >
                    <span className="communityText">
                      <Icon className="communityLink" />
                      <PolyglotText
                        defaultString="커뮤니티로 이동"
                        id="Course-Summary-커뮤니티"
                      />
                    </span>
                  </Link>
                )}
              <a onClick={toggleCardBookmark}>
                <span>
                  <Icon className={!isBookmark ? 'listAdd' : 'listDelete'} />
                  {!isBookmark
                    ? getPolyglotText('찜한 과정', 'Course-Summary-관심추가')
                    : getPolyglotText('찜한 과정', 'Course-Summary-관심제거')}
                </span>
              </a>
              <a onClick={copyUrl}>
                <span>
                  <Icon className="linkCopy" />
                  <PolyglotText
                    defaultString="공유하기"
                    id="Course-Summary-공유하기"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default LectureCourseSummaryView;
