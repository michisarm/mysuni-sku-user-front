import LectureSummary from 'lecture/detail/viewModel/LectureOverview/LectureSummary';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';

interface LectureSummaryViewProps {
  lectureSummary: LectureSummary;
}

const LectureSummaryView: React.FC<LectureSummaryViewProps> = function LectureSummaryView({
  lectureSummary,
}) {
  return (
    <div className="contents-header">
      <div className="title-area">
        <div className="ui mpurple label">
          {lectureSummary.category.college}
        </div>
        <div className="header">{lectureSummary.name}</div>
        <div className="header-deatil">
          <div className="item">
            {lectureSummary.difficultyLevel !== undefined && (
              <Label className="bold onlytext">
                <Icon className="inter" />
                <span>{lectureSummary.difficultyLevel}</span>
              </Label>
            )}
            <Label className="bold onlytext">
              <Icon className="time2" />
              <span>{lectureSummary.learningTime}</span>
            </Label>
            {lectureSummary.stampCount !== undefined && (
              <Label className="bold onlytext">
                <Icon className="award" />
                <span>2개</span>
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
                {lectureSummary.operation.operator.name}
                <i>
                  <span className="tip-name">
                    {lectureSummary.operation.operator.company}
                  </span>
                  <a className="tip-mail">
                    {lectureSummary.operation.operator.email}
                  </a>
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
        <Icon className="dticon" />
      </div>
    </div>
  );
};

export default LectureSummaryView;
