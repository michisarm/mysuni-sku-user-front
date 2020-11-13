import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CubeType from '../../../model/CubeType';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureDurationableCubeItem,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
} from '../../../viewModel/LectureStructure';
import CourseReportView from './CourseReportView';
import CourseSurveyView from './CourseSurveyView';
import CourseTestView from './CourseTestView';
import CubeView, { parseCubeType } from './CubeView';
import DiscussionView from './DiscussionView';
import DurationableCubeView from './DurationableCubeView';
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
            <>
              {cube !== undefined &&
                (cube as LectureStructureDurationableCubeItem).duration ===
                  undefined && (
                  <CubeView
                    key={cube.id}
                    name={cube.name}
                    state={cube.state}
                    activated={cube.activated}
                    learningTime={cube.learningTime}
                    cubeType={cube.cubeType}
                    path={cube.path}
                    can={cube.can}
                  />
                )}
              {cube !== undefined &&
                (cube as LectureStructureDurationableCubeItem).duration !==
                  undefined && (
                  <DurationableCubeView
                    key={cube.id}
                    name={cube.name}
                    state={cube.state}
                    activated={cube.activated}
                    learningTime={cube.learningTime}
                    cubeType={cube.cubeType}
                    path={cube.path}
                    can={cube.can}
                    duration={
                      (cube as LectureStructureDurationableCubeItem).duration
                    }
                  />
                )}
              {cube.test !== undefined && (
                <TestView
                  name={cube.test.name}
                  state={cube.test.state}
                  questionCount={cube.test.questionCount}
                  path={cube.test.path}
                  can={cube.test.can}
                />
              )}
              {cube.survey !== undefined && (
                <SurveyView
                  name={cube.survey.name}
                  state={cube.survey.state}
                  questionCount={cube.survey.questionCount}
                  path={cube.survey.path}
                  can={cube.survey.can}
                />
              )}
              {cube.report !== undefined && (
                <ReportView
                  name={cube.report.name}
                  state={cube.report.state}
                  path={cube.report.path}
                  can={cube.report.can}
                />
              )}
            </>
          );
        })}
        {test && (
          <CourseTestView
            name={test.name}
            state={test.state}
            activated={test.activated}
            questionCount={test.questionCount}
            path={test.path}
            can={test.can}
          />
        )}
        {survey && (
          <CourseSurveyView
            name={survey.name}
            state={survey.state}
            activated={survey.activated}
            questionCount={survey.questionCount}
            path={survey.path}
            can={survey.can}
          />
        )}
        {report && (
          <CourseReportView
            name={report.name}
            state={report.state}
            activated={report.activated}
            path={report.path}
            can={report.can}
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
