import { reactAlert } from '@nara.platform/accent';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Rating } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { toggleCubeBookmark } from '../../../service/useLectureCourseOverview/useLectureCubeSummary';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureStateContainer from '../../logic/LectureStateContainer';
import ReactGA from 'react-ga';

import CategoryColorType from '../../../../../shared/model/CategoryColorType';
import LectureClassroom, {
  Classroom,
} from '../../../viewModel/LectureClassroom';
import moment from 'moment';
import { PostService } from '../../../../../board/stores';
import { getCollgeName } from '../../../../../shared/service/useCollege/useRequestCollege';

import { useLectureParams } from '../../../store/LectureParamsStore';
import { Action, Area } from 'tracker/model';
import { getLectureNotePopupState } from '../../../store/LectureNoteStore';
import { isMobile } from 'react-device-detect';
import DifficultyLevel from '../../../model/DifficultyLevel';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { getLectureState } from 'lecture/detail/store/LectureStateStore';
import { isEmpty, trim } from 'lodash';
import { findIsBookmark } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import { onOpenPlaylistAddPopUpView } from 'playlist/playlistAddPopUp/playlistAddPopUpView.events';
import { PlaylistAddPopUpView } from 'playlist/playlistAddPopUp/PlaylistAddPopUpView';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';

function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

// https://mysuni.sk.com/suni-main/expert/instructor/IS-00EO/Introduce

function copyUrl() {
  const textarea = document.createElement('textarea');
  textarea.value = window.location.href;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  reactAlert({
    title: getPolyglotText('??????', 'cicl-????????????-??????'),
    message: getPolyglotText('URL??? ?????????????????????.', 'cicl-????????????-URL'),
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

function getClassroom(classrooms: Classroom[]): Classroom | undefined {
  if (classrooms.length > 0) {
    let classroom = classrooms[0];
    // ????????? ????????? ??????
    if (classrooms.length > 1) {
      // ????????? ????????? ???????????? ?????? ????????? ??????
      let filteredClassrooms = classrooms.filter((classroom) => {
        const start = moment(classroom.learningStartDate).startOf('day').unix();
        const end = moment(classroom.learningEndDate).endOf('day').unix();
        const now = moment().unix();
        if (start < now && now < end) {
          return true;
        }
        return false;
      });
      if (filteredClassrooms.length > 0) {
        classroom = filteredClassrooms[0];
        // ????????? ?????????????????? ????????? ???????????? ?????? ???????????? ????????? ?????????
        if (filteredClassrooms.length > 1) {
          const compare = (classroom1: Classroom, classroom2: Classroom) =>
            moment(classroom1.learningStartDate).unix() -
            moment(classroom2.learningStartDate).unix();
          classroom = filteredClassrooms.sort(compare)[0];
        }
      }
      // ????????? ?????????????????? ?????? ?????? ??????
      else {
        // ?????? ????????? ??????????????? ?????? ?????? ??????
        filteredClassrooms = classrooms.filter((classroom) => {
          const start = moment(classroom.learningStartDate)
            .startOf('day')
            .unix();
          const now = moment().unix();
          if (start > now) {
            return true;
          }
          return false;
        });
        // ?????? ????????? ??????????????? ?????? ????????? ???????????? ?????? ?????? ????????? ??????
        if (filteredClassrooms.length > 0) {
          classroom = filteredClassrooms[0];
          if (filteredClassrooms.length > 1) {
            const compare = (classroom1: Classroom, classroom2: Classroom) =>
              moment(classroom1.learningStartDate).unix() -
              moment(classroom2.learningStartDate).unix();
            classroom = filteredClassrooms.sort(compare)[0];
          }
        }
      }
    }
    return classroom;
  }
}

function filterUrl(url: string) {
  // ????????? http, https ??? ?????? ????????? return
  const isHttps = url.includes('https://');
  const isHttp = url.includes('http://');

  if (isHttps || isHttp) {
    return trim(url);
  }

  return '';
}

function getLearningPeriod(classrooms: Classroom[]): string | undefined {
  const classroom = getClassroom(classrooms);
  if (classroom !== undefined) {
    return `${moment(classroom.learningStartDate).format(
      'YYYY.MM.DD'
    )} ~ ${moment(classroom.learningEndDate).format('YYYY.MM.DD')}`;
  }
}

function getCapacity(classrooms: Classroom[]): string | undefined {
  const classroom = getClassroom(classrooms);
  if (classroom !== undefined) {
    return `${numberWithCommas(classroom.capacity)}`;
  }
}

function getElearningLink(classrooms: Classroom[]): string {
  const lectureState = getLectureState();

  if (lectureState === undefined || lectureState.student?.round === undefined) {
    return '';
  }

  const findClassRoom = classrooms.find(
    (classroom) => classroom.round === lectureState.student?.round
  );

  if (findClassRoom?.siteUrl === undefined) {
    return '';
  }

  return filterUrl(findClassRoom.siteUrl);
}

function getDifficultyLevelIcon(difficultyLevel: DifficultyLevel) {
  switch (difficultyLevel) {
    case 'Intermediate':
      return 'inter';
    case 'Advanced':
      return 'advanced';
    case 'Expert':
      return 'export';
    default:
      return 'basic';
  }
}

function isAloneCube() {
  const lectureStructure = getLectureStructure();

  if (lectureStructure === undefined) {
    return false;
  }

  if (
    lectureStructure.cubes.length === 1 &&
    lectureStructure.items.length === 1 &&
    lectureStructure.card.test === undefined &&
    lectureStructure.card.report === undefined &&
    lectureStructure.card.survey === undefined
  ) {
    return true;
  }
}

interface LectureCubeSummaryViewProps {
  lectureSummary: LectureCubeSummary;
  lectureInstructor?: LectureInstructor;
  lectureClassroom?: LectureClassroom;
}

const LectureCubeSummaryView: React.FC<LectureCubeSummaryViewProps> =
  function LectureCubeSummaryView({
    lectureSummary,
    lectureInstructor,
    lectureClassroom,
  }) {
    const params = useLectureParams();
    const [isBookmark, setIsBookmark] = useState<boolean>(false);
    const history = useHistory();
    const instrutor = lectureInstructor?.instructors.find(
      (c) => c.representative === true
    );

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
            `(Cube) - ${lectureSummary.name}`
          );
        }, 1000);
      }
    }, [lectureSummary.name]);

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
      setIsBookmark(findIsBookmark(params?.cardId));
    }, [params?.cardId]);

    const clickNewTab = () => {
      const popupState = getLectureNotePopupState();
      if (popupState) {
        reactAlert({
          title: getPolyglotText('??????', 'cicl-????????????-??????'),
          message: getPolyglotText(
            '??? ????????? Note??? ?????? ????????????',
            'cicl-????????????-??????'
          ),
        });
        return;
      }
      const noteTab = document.getElementById('handleNoteTab') as HTMLElement;

      if (noteTab !== null) {
        noteTab.click();
      }
      setTimeout(() => {
        const noteBtn = document.getElementById('handlePopup') as HTMLElement;
        if (noteBtn !== null) {
          noteBtn.click();
        }
      }, 500);
    };

    return (
      <div
        // className="course-info-header"
        className={`course-info-header ${
          lectureSummary.cubeType === 'Task' ||
          lectureSummary.cubeType === 'Discussion'
            ? 'task'
            : ''
        }`}
        data-area={Area.CUBE_HEADER}
      >
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
                  <Icon
                    className={getDifficultyLevelIcon(
                      lectureSummary.difficultyLevel
                    )}
                  />
                  <span>{lectureSummary.difficultyLevel}</span>
                </Label>
                {lectureClassroom &&
                  Array.isArray(lectureClassroom.classrooms) &&
                  lectureClassroom.classrooms.length > 0 && (
                    <div className="ui label onlytext">
                      <i aria-hidden="true" className="icon date" />
                      <span>
                        {getLearningPeriod(lectureClassroom.classrooms) || ''}
                      </span>
                    </div>
                  )}
                {lectureClassroom &&
                  Array.isArray(lectureClassroom.classrooms) &&
                  lectureClassroom.classrooms.length > 0 &&
                  !isEmpty(getElearningLink(lectureClassroom.classrooms)) && (
                    <a
                      id="webpage-link"
                      target="_blank"
                      style={{ display: 'none' }}
                      href={getElearningLink(lectureClassroom.classrooms)}
                    />
                  )}
                {lectureSummary.learningTime !== '00h 00m' && (
                  <Label className="bold onlytext">
                    <Icon className="time2" />
                    <span>{lectureSummary.learningTime}</span>
                  </Label>
                )}
                {lectureSummary.cubeType !== 'ClassRoomLecture' &&
                  lectureSummary.cubeType !== 'ELearning' &&
                  instrutor !== undefined && (
                    <Label className="bold onlytext">
                      <span className="header-span-first">
                        <PolyglotText
                          defaultString="??????"
                          id="cicl-????????????-??????2"
                        />
                      </span>
                      <span className="tool-tip">
                        {parsePolyglotString(
                          instrutor.instructorWithIdentity?.instructor?.name,
                          getDefaultLang(
                            instrutor.instructorWithIdentity?.instructor
                              ?.langSupports
                          )
                        )}
                        <i>
                          <Link
                            to={`/expert/instructor/${instrutor.instructorId}/Introduce`}
                            className="tip-mail"
                            style={{ whiteSpace: 'nowrap', display: 'block' }}
                            target="_blank"
                          >
                            {parsePolyglotString(
                              instrutor.instructorWithIdentity?.instructor
                                ?.name,
                              getDefaultLang(
                                instrutor.instructorWithIdentity?.instructor
                                  ?.langSupports
                              )
                            )}
                          </Link>
                          <span className="tip-id">
                            {instrutor.instructorWithIdentity?.instructor
                              ?.internal
                              ? parsePolyglotString(
                                  instrutor.instructorWithIdentity?.userIdentity
                                    ?.departmentName,
                                  getDefaultLang(
                                    instrutor.instructorWithIdentity?.instructor
                                      .langSupports
                                  )
                                )
                              : parsePolyglotString(
                                  instrutor.instructorWithIdentity?.instructor
                                    ?.organization,
                                  getDefaultLang(
                                    instrutor.instructorWithIdentity?.instructor
                                      ?.langSupports
                                  )
                                )}
                          </span>
                        </i>
                      </span>
                    </Label>
                  )}
                {lectureClassroom &&
                  Array.isArray(lectureClassroom.classrooms) &&
                  lectureClassroom.classrooms.length > 0 &&
                  (lectureSummary.cubeType === 'ClassRoomLecture' ||
                    lectureSummary.cubeType === 'ELearning') &&
                  getCapacity(lectureClassroom.classrooms) !== undefined && (
                    <Label className="bold onlytext">
                      <span className="header-span-first">
                        <PolyglotText
                          defaultString="????????????"
                          id="cicl-????????????-????????????"
                        />
                      </span>
                      <span>{getCapacity(lectureClassroom.classrooms)}</span>
                      <span>
                        <PolyglotText
                          defaultString="???"
                          id="cicl-????????????-???2"
                        />
                      </span>
                    </Label>
                  )}
                {/* Community => Task ????????? ????????? ??? ?????? ??????*/}
                {lectureSummary.cubeType !== 'Community' && (
                  <Label className="bold onlytext">
                    <span className="header-span-first">
                      <PolyglotText
                        defaultString="??????"
                        id="cicl-????????????-??????"
                      />
                    </span>
                    <span>
                      {numberWithCommas(lectureSummary.passedStudentCount)}
                    </span>
                    <span>
                      <PolyglotText defaultString="???" id="cicl-????????????-???3" />
                    </span>
                  </Label>
                )}
                {/* Community => Task ????????? ????????? ??? ?????? ??????*/}
                {lectureSummary.cubeType === 'Community' && (
                  <>
                    <Label className="bold onlytext">
                      <span className="header-span-first">
                        <PolyglotText
                          defaultString="??????"
                          id="cicl-????????????-??????"
                        />
                      </span>
                      <span>
                        {numberWithCommas(lectureSummary.studentCount)}
                      </span>
                      <span>
                        <PolyglotText
                          defaultString="???"
                          id="cicl-????????????-???4"
                        />
                      </span>
                    </Label>
                  </>
                )}
                <Label className="bold onlytext">
                  <span className="header-span-first">
                    <PolyglotText
                      defaultString="??????"
                      id="cicl-????????????-??????"
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
                <Link
                  to={`/board/support-qna/course/${params?.cardId}`}
                  className="ui icon button left post-s"
                >
                  <Icon className="ask" />
                  <PolyglotText
                    defaultString="????????????"
                    id="cicl-????????????-??????"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="right-area">
            <LectureStateContainer />
          </div>
        </div>
        <div className="contents-header-side">
          <div className="title-area">
            <div className="header-deatil">
              <div className="item">{}</div>
            </div>
          </div>
          <div className="right-area">
            <div className="header-right-link">
              {/* {lectureCourseSummary?.hasCommunity && (
              <Link
                to={`/community/${lectureCourseSummary.communityId}`}
                target="_blank"
              >
                <span className="communityText">
                  <Icon className="communityLink" />
                  ??????????????? ??????
                </span>
              </Link>
            )} */}
              {!isMobile && (
                <Button onClick={clickNewTab}>
                  <span>
                    <Icon className="noteWrite" />
                    Note
                  </span>
                </Button>
              )}
              <a onClick={() => toggleCubeBookmark(setIsBookmark)}>
                <span>
                  <Icon className={!isBookmark ? 'listAdd' : 'listDelete'} />
                  {!isBookmark
                    ? getPolyglotText('?????? ??????', 'cicl-????????????-????????????')
                    : getPolyglotText('?????? ??????', 'cicl-????????????-????????????')}
                </span>
              </a>
              {isAloneCube() && (
                <>
                  <a onClick={onOpenPlaylistAddPopUpView}>
                    <span>
                      <Icon className="plAdd" />
                      <PolyglotText
                        defaultString="Playlist ??????"
                        id="playlist-popup-????????????"
                      />
                    </span>
                  </a>
                  <PlaylistAddPopUpView />
                </>
              )}
              <a
                onClick={copyUrl}
                data-area={Area.CUBE_HEADER}
                data-action={Action.CLICK}
                data-action-name="???????????? ?????? ??????"
              >
                <span>
                  <Icon className="linkCopy" />
                  <PolyglotText
                    defaultString="????????????"
                    id="cicl-????????????-????????????"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default LectureCubeSummaryView;
