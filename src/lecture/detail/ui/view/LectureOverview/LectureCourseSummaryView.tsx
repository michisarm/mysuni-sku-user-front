/* eslint-disable react-hooks/exhaustive-deps */
import { reactAlert } from '@nara.platform/accent';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { Action, Area } from 'tracker/model';
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
import moment from 'moment';
import { getCurrentHistory } from '../../../../../shared/store/HistoryStore';
import { parsePolyglotHTML } from '../../../../../shared/helper/parseHelper';
import { LearningState } from '../../../../../shared/model';
import LectureCourseSummarySatisfactionView from './LectureCourseSummarySatisfactionView';
import { SkProfileService } from '../../../../../profile/stores';
import { onOpenPlaylistAddPopUpView } from 'playlist/playlistAddPopUp/playlistAddPopUpView.events';
import { PlaylistAddPopUpView } from 'playlist/playlistAddPopUp/PlaylistAddPopUpView';

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
    title: getPolyglotText('??????', 'Course-Summary-??????'),
    message: getPolyglotText('URL??? ?????????????????????.', 'Course-Summary-URL'),
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

    const [onAlertOpen, setAlertOpen] = useState(false);

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

    const userLanguage = SkProfileService.instance.skProfile.language;
    const dateFormat =
      (userLanguage === 'English' && 'DD-MM-YYYY') || 'YYYY-MM-DD';

    const startDate =
      lectureSummary.learningState === LearningState.Progress
        ? Math.max(
            lectureSummary.learningStartDate,
            lectureSummary.validStartDate
          )
        : lectureSummary.learningStartDate;
    const startDate2 =
      moment().valueOf() > lectureSummary.learningEndDate
        ? lectureSummary.learningStartDate
        : startDate;

    const startDateMoment = moment(startDate2).format(dateFormat);

    const endDate = Math.min(
      lectureSummary.learningEndDate,
      lectureSummary.validEndDate
    );

    const endDateMoment = moment(endDate).format(dateFormat);

    useEffect(() => {
      //
      document.addEventListener('keydown', escFunction, false);

      if (
        lectureSummary.restrictLearningPeriod &&
        !(lectureSummary.learningState === LearningState.Passed)
      ) {
        if (
          moment().valueOf() <
            moment(lectureSummary.learningStartDate).valueOf() ||
          moment().valueOf() > endDate
        ) {
          setAlertOpen(true);
          reactAlert({
            title: getPolyglotText(
              '???????????? ?????? ?????? default',
              'card-overview-alertheader2'
            ),
            message: parsePolyglotHTML(
              'card-overview-alerttxt2',
              'date',
              `${startDateMoment} ~ ${endDateMoment}`,
              '??????????????? ???????????? ??????????????? ????????? ??? ????????????.'
            ),
            onClose: () => {
              const history = getCurrentHistory();
              history?.push('/');
            },
          });
        } else {
          reactAlert({
            title: getPolyglotText(
              '?????? ?????? ?????? ?????? default',
              'card-overview-alertheader1'
            ),
            // message: getPolyglotText(
            //   'YYYY-MM-DD ?????? ???????????? ??? ???????????? default',
            //   'card-overview-alerttxt1'
            // ),
            message: parsePolyglotHTML(
              'card-overview-alerttxt1',
              'date',
              endDateMoment,
              'YYYY-MM-DD ?????? ???????????? ??? ???????????? default'
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
                {lectureSummary.restrictLearningPeriod && (
                  <Label className="bold onlytext">
                    <span className="header-span-first">
                      <PolyglotText
                        defaultString="???????????? ????????? default"
                        id="card-overview-valid"
                      />
                    </span>
                    <span>{`${startDateMoment} ~ ${endDateMoment}`}</span>
                  </Label>
                )}
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
                          '{stampCount}???',
                          'Course-Summary-??????',
                          { stampCount: lectureSummary.stampCount.toString() }
                        ),
                      }}
                    />
                  </Label>
                )}
                <Label className="bold onlytext">
                  <span className="header-span-first">
                    <PolyglotText
                      defaultString="??????"
                      id="Course-Summary-??????"
                    />
                  </span>
                  <span>
                    {numberWithCommas(lectureSummary.passedStudentCount)}
                  </span>
                  <span>
                    <PolyglotText defaultString="???" id="Course-Summary-???1" />
                  </span>
                </Label>
                <Label className="bold onlytext">
                  <span className="header-span-first">
                    <PolyglotText
                      defaultString="??????"
                      id="Course-Summary-??????"
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
                    defaultString="????????????"
                    id="Course-Summary-????????????"
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
                <LectureCourseSummarySatisfactionView />
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
                        defaultString="??????????????? ??????"
                        id="Course-Summary-????????????"
                      />
                    </span>
                  </Link>
                )}
              <a onClick={toggleCardBookmark}>
                <span>
                  <Icon className={!isBookmark ? 'listAdd' : 'listDelete'} />
                  {!isBookmark
                    ? getPolyglotText('?????? ??????', 'Course-Summary-????????????')
                    : getPolyglotText('?????? ??????', 'Course-Summary-????????????')}
                </span>
              </a>
              <a onClick={onOpenPlaylistAddPopUpView}>
                <span>
                  <Icon className="plAdd" />
                  <PolyglotText
                    defaultString="Playlist ??????"
                    id="playlist-popup-????????????"
                  />
                </span>
              </a>
              <a
                onClick={copyUrl}
                data-area={Area.CARD_HEADER}
                data-action={Action.CLICK}
                data-action-name="???????????? ?????? ??????"
              >
                <span>
                  <Icon className="linkCopy" />
                  <PolyglotText
                    defaultString="????????????"
                    id="Course-Summary-????????????"
                  />
                </span>
              </a>
              <PlaylistAddPopUpView />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default LectureCourseSummaryView;
