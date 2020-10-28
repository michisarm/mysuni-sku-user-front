import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureStateContainer from '../../logic/LectureStateContainer';

interface LectureCubeSummaryViewProps {
  lectureSummary: LectureCubeSummary;
  lectureInstructor?: LectureInstructor;
}

// https://mysuni.sk.com/suni-main/expert/instructor/IS-00EO/Introduce

const LectureCubeSummaryView: React.FC<LectureCubeSummaryViewProps> = function LectureCubeSummaryView({
  lectureSummary,
  lectureInstructor,
}) {
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
                <Icon className="inter" />
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
    </div>
  );
};

export default LectureCubeSummaryView;
