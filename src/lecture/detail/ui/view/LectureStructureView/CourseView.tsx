import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CubeType from '../../../model/CubeType';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
} from '../../../viewModel/LectureStructure';
import { parseCubeType } from './CubeView';
import DiscussionView from './DiscussionView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

interface CourseViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  cubes?: LectureStructureCubeItem[];
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  discussion?: LectureStructureDiscussionItem;
  path: string;
}

interface CubeViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  learningTime: number;
  cubeType: CubeType;
  path: string;
}

const CubeView: React.FC<CubeViewProps> = function CubeView({
  name,
  state = 'None',
  activated = false,
  learningTime,
  cubeType,
  path,
}) {
  return (
    <Link to={path} className={`btn-state-course ${activated ? 'act-on' : ''}`}>
      <span
        className={`label-state-cube ${
          state === 'Progress' ? 'proceeding' : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span>cube 완료상태</span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li>{parseCubeType(cubeType)}</li>
          <li>
            {cubeType === 'Community'
              ? ''
              : timeToHourMinuteFormat(learningTime)}
          </li>
        </ul>
      </span>
    </Link>
  );
};

const CourseView: React.FC<CourseViewProps> = function CourseView({
  name,
  state = 'None',
  activated = false,
  cubes = [],
  test,
  survey,
  report,
  discussion,
  path,
}) {
  const [opened, setOpened] = useState<boolean>(true);
  const toggle = useCallback(() => {
    if (opened) {
      setOpened(false);
    } else {
      setOpened(true);
    }
  }, [opened]);
  return (
    <>
      <div className={`accordion-state-holder ${activated ? 'act-on' : ''}`}>
        <Link to={path} className="btn-over-view enable">
          {name}
        </Link>
        <button
          className={`btn-accordion ${opened ? 'open' : ''}`}
          onClick={toggle}
        >
          총<strong>{cubes.length}개</strong> 강의 구성
        </button>
        <span
          className={`label-state-learning ${
            state === 'Progress' ? 'proceeding' : ''
          } ${state === 'Completed' ? 'complete' : ''}`}
        >
          <span>진행상태</span>
        </span>
      </div>
      <div
        className="state-course-holder"
        style={opened ? {} : { display: 'none' }}
      >
        {cubes.map(cube => {
          return (
            <CubeView
              key={cube.id}
              name={cube.name}
              state={cube.state}
              activated={cube.activated}
              learningTime={cube.learningTime}
              cubeType={cube.cubeType}
              path={cube.path}
            />
          );
        })}
        {test && (
          <TestView
            name={test.name}
            state={test.state}
            activated={test.activated}
            questionCount={test.questionCount}
            path={test.path}
          />
        )}
        {survey && (
          <SurveyView
            name={survey.name}
            state={survey.state}
            activated={survey.activated}
            questionCount={survey.questionCount}
            path={survey.path}
          />
        )}
        {report && (
          <ReportView
            name={report.name}
            state={report.state}
            activated={report.activated}
            path={report.path}
          />
        )}
        {discussion && (
          <DiscussionView
            name={discussion.name}
            state={discussion.state}
            activated={discussion.activated}
            path={discussion.path}
          />
        )}
      </div>
    </>
  );
};

export default CourseView;
