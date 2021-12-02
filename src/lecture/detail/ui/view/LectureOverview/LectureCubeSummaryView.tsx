import { reactAlert } from '@nara.platform/accent';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Rating } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { toggleCubeBookmark } from '../../../service/useLectureCourseOverview/useLectureCubeSummary';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureReview from '../../../viewModel/LectureOverview/LectureReview';
import LectureStateContainer from '../../logic/LectureStateContainer';
import ReactGA from 'react-ga';

import CategoryColorType from '../../../../../shared/model/CategoryColorType';
import LectureClassroom, {
  Classroom,
} from '../../../viewModel/LectureClassroom';
import moment from 'moment';
import { PostService } from '../../../../../board/stores';
import { getCollgeName } from '../../../../../shared/service/useCollege/useRequestCollege';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { autorun } from 'mobx';
import { useLectureParams } from '../../../store/LectureParamsStore';
import { Area } from 'tracker/model';
import { getLectureNotePopupState } from '../../../store/LectureNoteStore';
import { isMobile } from 'react-device-detect';
import DifficultyLevel from '../../../model/DifficultyLevel';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';
import {
  getLectureState,
  useLectureState,
} from 'lecture/detail/store/LectureStateStore';
import { isEmpty, trim } from 'lodash';
import { findIsBookmark } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';

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
    title: getPolyglotText('알림', 'cicl-학상본문-알림'),
    message: getPolyglotText('URL이 복사되었습니다.', 'cicl-학상본문-URL'),
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
    // 차수가 하나인 경우
    if (classrooms.length > 1) {
      // 오늘이 차수의 학습기간 내에 있는지 여부
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
        // 오늘이 학습기간내인 차수가 여러개인 경우 시작일이 먼저인 것으로
        if (filteredClassrooms.length > 1) {
          const compare = (classroom1: Classroom, classroom2: Classroom) =>
            moment(classroom1.learningStartDate).unix() -
            moment(classroom2.learningStartDate).unix();
          classroom = filteredClassrooms.sort(compare)[0];
        }
      }
      // 오늘이 학습기간내인 것이 없는 경우
      else {
        // 오늘 이후의 학습기간을 가진 차수 조회
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
        // 오늘 이후의 학습기간을 가진 차수가 여러개인 경우 제일 가까운 차수
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
  // 주소에 http, https 가 붙는 경우만 return
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

interface LectureCubeSummaryViewProps {
  lectureSummary: LectureCubeSummary;
  lectureInstructor?: LectureInstructor;
  lectureReview?: LectureReview;
  lectureClassroom?: LectureClassroom;
}

const LectureCubeSummaryView: React.FC<LectureCubeSummaryViewProps> =
  function LectureCubeSummaryView({
    lectureSummary,
    lectureInstructor,
    lectureReview,
    lectureClassroom,
  }) {
    const params = useLectureParams();
    const [isBookmark, setIsBookmark] = useState<boolean>(false);
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
          title: getPolyglotText('알림', 'cicl-학상본문-알림'),
          message: getPolyglotText(
            '새 창에서 Note를 작성 중입니다',
            'cicl-학상본문-새창'
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
                          defaultString="강사"
                          id="cicl-학상본문-강사2"
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
                          defaultString="정원정보"
                          id="cicl-학상본문-정원정보"
                        />
                      </span>
                      <span>{getCapacity(lectureClassroom.classrooms)}</span>
                      <span>
                        <PolyglotText
                          defaultString="명"
                          id="cicl-학상본문-명2"
                        />
                      </span>
                    </Label>
                  )}
                {/* Community => Task 데이터 현행화 후 수정 예정*/}
                {lectureSummary.cubeType !== 'Community' && (
                  <Label className="bold onlytext">
                    <span className="header-span-first">
                      <PolyglotText
                        defaultString="이수"
                        id="cicl-학상본문-이수"
                      />
                    </span>
                    <span>
                      {numberWithCommas(lectureSummary.passedStudentCount)}
                    </span>
                    <span>
                      <PolyglotText defaultString="명" id="cicl-학상본문-명3" />
                    </span>
                  </Label>
                )}
                {/* Community => Task 데이터 현행화 후 수정 예정*/}
                {lectureSummary.cubeType === 'Community' && (
                  <>
                    <Label className="bold onlytext">
                      <span className="header-span-first">
                        <PolyglotText
                          defaultString="참여"
                          id="cicl-학상본문-참여"
                        />
                      </span>
                      <span>
                        {numberWithCommas(lectureSummary.studentCount)}
                      </span>
                      <span>
                        <PolyglotText
                          defaultString="명"
                          id="cicl-학상본문-명4"
                        />
                      </span>
                    </Label>
                  </>
                )}
                <Label className="bold onlytext">
                  <span className="header-span-first">
                    <PolyglotText
                      defaultString="담당"
                      id="cicl-학상본문-담당"
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
                    defaultString="문의하기"
                    id="cicl-학상본문-문의"
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
              <div className="item">
                {lectureSummary.cubeType !== 'Task' &&
                  lectureSummary.cubeType !== 'Community' &&
                  lectureSummary.cubeType !== 'Discussion' && (
                    <div className="header-rating">
                      <Rating
                        defaultRating={0}
                        maxRating={5}
                        rating={lectureReview && lectureReview.average}
                        disabled
                        className="fixed-rating"
                      />
                      <span>
                        {lectureReview !== undefined
                          ? `${Math.floor(lectureReview.average * 10) / 10}(${
                              lectureReview.reviewerCount
                            }${getPolyglotText('명', 'cicl-학상본문-명')})`
                          : ''}
                      </span>
                    </div>
                  )}
              </div>
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
                  커뮤니티로 이동
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
                    ? getPolyglotText('찜한 과정', 'cicl-학상본문-관심추가')
                    : getPolyglotText('찜한 과정', 'cicl-학상본문-관심제거')}
                </span>
              </a>
              <a onClick={copyUrl}>
                <span>
                  <Icon className="linkCopy" />
                  <PolyglotText
                    defaultString="공유하기"
                    id="cicl-학상본문-공유하기"
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
