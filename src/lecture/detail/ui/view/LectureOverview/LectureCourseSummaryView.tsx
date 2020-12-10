import { IdName, reactAlert } from '@nara.platform/accent';
import LectureSummary from 'lecture/detail/viewModel/LectureOverview/LectureSummary';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import CategoryColorType from '../../../../../shared/model/CategoryColorType';
import { toggleCourseBookmark } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import LectureCourseSummary from '../../../viewModel/LectureOverview/LectureCourseSummary';
import LectureReview from '../../../viewModel/LectureOverview/LectureReview';
import ReactGA from 'react-ga';
import { getLectureStructure } from 'lecture/detail/store/LectureStructureStore';

function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

interface LectureCourseSummaryViewProps {
  lectureSummary: LectureCourseSummary;
  lectureReview?: LectureReview;
}

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

  switch (college.name) {
    case 'AI':
      color = CategoryColorType.AI;
      break;
    case 'DT':
      color = CategoryColorType.DT;
      break;
    case 'Global':
      color = CategoryColorType.Global;
      break;
    case 'Leadership':
      color = CategoryColorType.Leadership;
      break;
    case 'Management':
      color = CategoryColorType.Management;
      break;
    case 'SV':
      color = CategoryColorType.SV;
      break;
    case '행복':
      color = CategoryColorType.Happiness;
      break;
    case '반도체':
      color = CategoryColorType.SemicondDesign;
      break;
    case '혁신디자인':
      color = CategoryColorType.InnovationDesign;
      break;
    case '에너지솔루션':
      color = CategoryColorType.EnergySolution;
  }
  return color;
}

const LectureCourseSummaryView: React.FC<LectureCourseSummaryViewProps> = function LectureCourseSummaryView({
  lectureSummary,
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

  // (react-ga) post pageTitle
  useEffect(() => {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname + window.location.search, [], `(Course) - ${lectureSummary.name}`);
    }, 1000);
  })
  const lectureStructure = getLectureStructure();
  let qnaUrl = '/board/support-qna';
  if (lectureStructure !== undefined && lectureStructure.course !== undefined) {
    qnaUrl += '/course/'+lectureStructure.course.coursePlanId;
  }

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
              <Label className="bold onlytext">
                <Icon className="time2" />
                <span>{lectureSummary.learningTime}</span>
              </Label>
              {lectureSummary.stampCount !== undefined && (
                <Label className="bold onlytext">
                  <Icon className="award" />
                  <span>{lectureSummary.stampCount}</span>
                </Label>
              )}
              <Label className="bold onlytext">
                <span className="header-span-first">이수</span>
                <span>{numberWithCommas(lectureSummary.passedCount)}</span>
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
                to={qnaUrl}
                className="ui icon button left post-s"
              >
                <Icon className="ask" />
                문의하기
              </Link>
            </div>
          </div>
        </div>
        <div className="right-area">
          {lectureSummary.iconBox !== undefined && (
            <img src={lectureSummary.iconBox.baseUrl} />
          )}
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
                    ? `${Math.round(lectureReview.average * 10) / 10}`
                    : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-area">
          <div className="header-right-link">
            {lectureSummary.hasCommunity && (
              <Link
                to={`/community/${lectureSummary.communityId}`}
                target="_blank"
              >
                <span className="communityText">
                  <Icon className="communityLink" />
                  커뮤니티로 이동
                </span>
              </Link>
            )}
            <a onClick={toggleCourseBookmark}>
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

export default LectureCourseSummaryView;
