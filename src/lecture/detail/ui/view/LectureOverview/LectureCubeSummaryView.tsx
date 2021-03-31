import { IdName, reactAlert } from '@nara.platform/accent';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
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
import LectureCourseSummary from 'lecture/detail/viewModel/LectureOverview/LectureCourseSummary';
import { PostService } from 'board/stores';

function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}
interface LectureCubeSummaryViewProps {
  lectureSummary: LectureCubeSummary;
  lectureCourseSummary?: LectureCourseSummary;
  lectureInstructor?: LectureInstructor;
  lectureReview?: LectureReview;
  lectureClassroom?: LectureClassroom;
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
  reactAlert({ title: '알림', message: 'URL이 복사되었습니다.' });
}

function getColor(college: IdName) {
  let color = CategoryColorType.Default;

  switch (college.id) {
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
      let filteredClassrooms = classrooms.filter(classroom => {
        const start = moment(classroom.learningStartDate)
          .startOf('day')
          .unix();
        const end = moment(classroom.learningEndDate)
          .endOf('day')
          .unix();
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
        filteredClassrooms = classrooms.filter(classroom => {
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

function getElearningLink(classrooms: Classroom[]): string | undefined {
  const classroom = getClassroom(classrooms);
  if (classroom !== undefined) {
    return classroom.siteUrl;
  }
}

const LectureCubeSummaryView: React.FC<LectureCubeSummaryViewProps> = function LectureCubeSummaryView({
  lectureSummary,
  lectureInstructor,
  lectureReview,
  lectureClassroom,
  lectureCourseSummary,
}) {
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
  const instrutor = lectureInstructor?.instructors.find(c => c.represent === 1);

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
  }, []);

  useEffect(() => {
    const postService = PostService.instance;

    postService.post.alarmInfo.url =
      'https://int.mysuni.sk.com/login?contentUrl=/suni-main/lecture/cineroom/ne1-m2-c2/college/' +
      window.location.href.split('college/')[1];
    postService.post.alarmInfo.managerEmail = lectureSummary.operator.email;
    postService.post.alarmInfo.contentsName = lectureSummary.name;
  }, [lectureSummary]);

  return (
    <div className="course-info-header">
      <div className="contents-header">
        <div className="title-area">
          <div
            className={`ui label ${getColor(lectureSummary.category.college)}`}
          >
            {lectureSummary.category.college.name}
          </div>
          <div className="header">{lectureSummary.name}</div>
          <div className="header-deatil">
            <div className="item">
              <Label className="bold onlytext">
                <Icon className={difficultyLevelIcon} />
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
                getElearningLink(lectureClassroom.classrooms) !== '' &&
                getElearningLink(lectureClassroom.classrooms) !== null && (
                  <a
                    id="webpage-link"
                    target="_blank"
                    style={{ display: 'none' }}
                    href={getElearningLink(lectureClassroom.classrooms)}
                  />
                )}
              <Label className="bold onlytext">
                <Icon className="time2" />
                <span>{lectureSummary.learningTime}</span>
              </Label>
              {lectureSummary.cubeType !== 'ClassRoomLecture' &&
                lectureSummary.cubeType !== 'ELearning' &&
                instrutor !== undefined && (
                  <Label className="bold onlytext">
                    <span className="header-span-first">강사</span>
                    <span className="tool-tip">
                      {instrutor.name}
                      <i>
                        <Link
                          to={`/expert/instructor/${instrutor.usid}/Introduce`}
                          className="tip-mail"
                          style={{ whiteSpace: 'nowrap', display: 'block' }}
                          target="_blank"
                        >
                          {instrutor.name}
                        </Link>
                        <span className="tip-id">{instrutor.company}</span>
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
                    <span className="header-span-first">정원정보</span>
                    <span>{getCapacity(lectureClassroom.classrooms)}</span>
                    <span>명</span>
                  </Label>
                )}
              {/* Community => Task 데이터 현행화 후 수정 예정*/}
              {lectureSummary.cubeType !== 'Community' &&
                lectureSummary.cubeType !== 'Task' && (
                  <Label className="bold onlytext">
                    <span className="header-span-first">이수</span>
                    <span>{numberWithCommas(lectureSummary.passedCount)}</span>
                    <span>명</span>
                  </Label>
                )}
              {/* Community => Task 데이터 현행화 후 수정 예정*/}
              {lectureSummary.cubeType === 'Community' ||
                (lectureSummary.cubeType === 'Task' && (
                  <>
                    <Label className="bold onlytext">
                      <span className="header-span-first">참여</span>
                      <span>{lectureSummary.studentCount}</span>
                      <span>명</span>
                    </Label>
                  </>
                ))}
              <Label className="bold onlytext">
                <span className="header-span-first">담당</span>
                <span className="tool-tip">
                  {lectureSummary.operator.name}
                  <i>
                    <span className="tip-name">
                      {lectureSummary.operator.company}
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
                to={`/board/support-qna/cube/${lectureSummary.learningCard.id}`}
                className="ui icon button left post-s"
              >
                <Icon className="ask" />
                문의하기
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
                lectureSummary.cubeType !== 'Community' && (
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
                        ? `${Math.round(lectureReview.average * 10) / 10}`
                        : ''}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="right-area">
          <div className="header-right-link">
            {lectureCourseSummary?.hasCommunity && (
              <Link
                to={`/community/${lectureCourseSummary.communityId}`}
                target="_blank"
              >
                <span className="communityText">
                  <Icon className="communityLink" />
                  커뮤니티로 이동
                </span>
              </Link>
            )}
            <a onClick={toggleCubeBookmark}>
              <span>
                <Icon
                  className={
                    lectureSummary.mytrainingId === undefined
                      ? 'listAdd'
                      : 'listDelete'
                  }
                />
                {lectureSummary.mytrainingId === undefined
                  ? '관심목록 추가'
                  : '관심목록 제거'}
              </span>
            </a>
            <a onClick={copyUrl}>
              <span>
                <Icon className="linkCopy" />
                링크 복사
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureCubeSummaryView;
