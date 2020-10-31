import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import { toggleCubeBookmark } from '../../../service/useLectureCourseOverview/useLectureCubeSummary';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureReview from '../../../viewModel/LectureOverview/LectureReview';
import LectureStateContainer from '../../logic/LectureStateContainer';

interface LectureCubeSummaryViewProps {
  lectureSummary: LectureCubeSummary;
  lectureInstructor?: LectureInstructor;
  lectureReview?: LectureReview;
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

const LectureCubeSummaryView: React.FC<LectureCubeSummaryViewProps> = function LectureCubeSummaryView({
  lectureSummary,
  lectureInstructor,
  lectureReview,
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
  return (
    <div className="course-info-header">
      <div className="contents-header">
        <div className="title-area">
          <div className="ui mpurple label">
            {lectureSummary.category.college.name}
          </div>
          <div className="header">{lectureSummary.name}</div>
          <div className="header-deatil">
            <div className="item">
              <Label className="bold onlytext">
                <Icon className={difficultyLevelIcon} />
                <span>{lectureSummary.difficultyLevel}</span>
              </Label>
              <Label className="bold onlytext">
                <Icon className="time2" />
                <span>{lectureSummary.learningTime}</span>
              </Label>
              {lectureInstructor && lectureInstructor.instructors.length > 0 && (
                <Label className="bold onlytext">
                  <span className="header-span-first">강사</span>
                  <span>
                    {lectureInstructor.instructors
                      .map(({ name }) => name)
                      .join(', ')}
                  </span>
                </Label>
              )}
              <Label className="bold onlytext">
                <span className="header-span-first">이수</span>
                <span>{lectureSummary.passedCount}</span>
                <span>명</span>
              </Label>
              <Label className="bold onlytext">
                <span className="header-span-first">담당</span>
                <span className="tool-tip">
                  {lectureSummary.operator.name}
                  <i>
                    <span className="tip-name">
                      {lectureSummary.operator.company}
                    </span>
                    <a className="tip-mail">{lectureSummary.operator.email}</a>
                  </i>
                </span>
              </Label>
              <Link
                to="/board/support-qna"
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
                    ? `${lectureReview.average}`
                    : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-area">
          <div className="header-right-link">
            <a onClick={toggleCubeBookmark}>
              <span>
                <Icon className="listAdd" />
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
