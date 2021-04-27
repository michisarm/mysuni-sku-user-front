import { reactAlert } from '@nara.platform/accent';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import CategoryColorType from '../../../../../shared/model/CategoryColorType';
import LectureCourseSummary from '../../../viewModel/LectureOverview/LectureCardSummary';
import LectureReview from '../../../viewModel/LectureOverview/LectureReview';
import ReactGA from 'react-ga';
import StampCompleted from '../../../../../style/media/stamp-completed.svg';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import { State } from '../../../viewModel/LectureState';
import { toggleCardBookmark } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import { PostService } from '../../../../../board/stores';
import { getCollgeName } from '../../../../../shared/service/useCollege/useRequestCollege';
import { Thumbnail } from '../../../../shared/ui/view/LectureElementsView';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { useLectureParams } from '../../../store/LectureParamsStore';
import { autorun } from 'mobx';
import InMyLectureService from '../../../../../myTraining/present/logic/InMyLectureService';
import { Area } from 'tracker/model';
import LectureStateContainer from '../../logic/LectureStateContainer';

function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

interface LectureCourseSummaryViewProps {
  lectureSummary: LectureCourseSummary;
  lectureReview?: LectureReview;
  lectureStructure: LectureStructure;
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

const LectureCourseSummaryView: React.FC<LectureCourseSummaryViewProps> = function LectureCourseSummaryView({
  lectureSummary,
  lectureReview,
  lectureStructure,
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
  }, []);
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

  const [inMyLectureMap, setInMyLectureMap] = useState<
    Map<string, InMyLectureModel>
  >();
  const [inMyLectureModel, setInMyLectureModel] = useState<InMyLectureModel>();

  const params = useLectureParams();

  useEffect(() => {
    return autorun(() => {
      setInMyLectureMap(InMyLectureService.instance.inMyLectureMap);
    });
  }, []);

  useEffect(() => {
    if (params?.cardId === undefined) {
      return;
    }
    setInMyLectureModel(inMyLectureMap?.get(params?.cardId));
  }, [inMyLectureMap, params?.cardId]);

  useEffect(() => {
    const postService = PostService.instance;

    postService.post.alarmInfo.url =
      'https://int.mysuni.sk.com/login?contentUrl=/suni-main/lecture/cineroom/ne1-m2-c2/college/' +
      window.location.href.split('college/')[1];
    postService.post.alarmInfo.managerEmail = lectureSummary.operator.email;
    postService.post.alarmInfo.contentsName = lectureSummary.name;
  }, [lectureSummary]);

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
              {lectureSummary.validLearningDate !== '' && (
                <Label className="bold onlytext">
                  <span className="header-span-first">유효학습 종료일</span>
                  <span>{lectureSummary.validLearningDate}</span>
                </Label>
              )}
              <Label className="bold onlytext">
                <Icon className="time2" />
                <span>{lectureSummary.learningTime}</span>
              </Label>
              {lectureSummary.stampCount !== undefined && (
                <Label className="bold onlytext">
                  <Icon className="stamp" />
                  <span>{lectureSummary.stampCount}개</span>
                </Label>
              )}
              <Label className="bold onlytext">
                <span className="header-span-first">이수</span>
                <span>
                  {numberWithCommas(lectureSummary.passedStudentCount)}
                </span>
                <span>명</span>
              </Label>
              <Label className="bold onlytext">
                <span className="header-span-first">담당</span>
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
                문의하기
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
                    ? `${Math.floor(lectureReview.average * 10) / 10}`
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
            <a onClick={toggleCardBookmark}>
              <span>
                <Icon
                  className={
                    inMyLectureModel === undefined ? 'listAdd' : 'listDelete'
                  }
                />
                {inMyLectureModel === undefined
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
