import React, { Fragment, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureDurationableCubeItem,
  LectureStructureItem,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
} from '../../../viewModel/LectureStructure';
import CourseReportView from './CourseReportView';
import CourseSurveyView from './CourseSurveyView';
import CourseTestView from './CourseTestView';
import CubeView from './CubeView';
import DurationableCubeView from './DurationableCubeView';
import ProgramDiscussionView from './ProgramDiscussionView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

interface CourseViewProps {
  name: string;
  cardId: string;
  state?: State;
  activated?: boolean;
  cubes?: LectureStructureCubeItem[];
  items?: LectureStructureItem[];
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  path: string;
}

const CourseView: React.FC<CourseViewProps> = function CourseView({
  name,
  cardId,
  state = 'None',
  activated = false,
  cubes,
  items,
  test,
  survey,
  report,
  path,
}) {
  const { pathname } = useLocation();
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
        <Link
          to={path}
          className="btn-over-view enable"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          {name}
        </Link>
        <button
          className={`btn-accordion ${opened ? 'open' : ''}`}
          onClick={toggle}
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '총<strong>{count}개</strong> 강의 구성',
              'Course-Contents-강의개수',
              { count: (items || cubes || []).length + '' }
            ),
          }}
        />
        <span
          className={`label-state-learning ${
            state === 'Progress' ? 'proceeding' : ''
          } ${state === 'Completed' ? 'complete' : ''}`}
        >
          <span>
            <PolyglotText
              defaultString="진행상태"
              id="Course-Contents-진행상태"
            />
          </span>
        </span>
      </div>
      <div
        className="state-course-holder"
        style={opened ? {} : { display: 'none' }}
      >
        {items !== undefined &&
          items.map((item) => {
            if (item.type === 'CUBE') {
              const cube = item as LectureStructureCubeItem;

              return (
                <Fragment key={cube.cubeId}>
                  {cube.isDurationable !== true && (
                    <CubeView
                      cardId={cardId}
                      name={cube.name}
                      state={cube.state}
                      activated={cube.path === pathname}
                      learningTime={cube.learningTime}
                      cubeType={cube.cubeType}
                      path={cube.path}
                      can={cube.can}
                    />
                  )}
                  {cube.isDurationable === true && (
                    <DurationableCubeView
                      cardId={cardId}
                      name={cube.name}
                      state={cube.state}
                      activated={cube.path === pathname}
                      learningTime={cube.learningTime}
                      cubeType={cube.cubeType}
                      path={cube.path}
                      can={cube.can}
                      duration={
                        (cube as LectureStructureDurationableCubeItem).duration
                      }
                    />
                  )}
                  {cube.test !== undefined && cube.test.name !== null && (
                    <TestView
                      activated={cube.test.path === pathname}
                      name={cube.test.name}
                      state={cube.test.state}
                      path={cube.test.path}
                      can={cube.test.can}
                    />
                  )}
                  {cube.survey !== undefined && (
                    <SurveyView
                      name={cube.survey.name}
                      activated={cube.survey.path === pathname}
                      state={cube.survey.state}
                      path={cube.survey.path}
                      can={cube.survey.can}
                    />
                  )}
                  {cube.report !== undefined &&
                    cube.report.name !== null &&
                    cube.report.name !== '' && (
                      <ReportView
                        activated={cube.report.path === pathname}
                        name={cube.report.name}
                        state={cube.report.state}
                        path={cube.report.path}
                        can={cube.report.can}
                      />
                    )}
                </Fragment>
              );
            }
            if (item.type === 'DISCUSSION') {
              const discussion = item as LectureStructureDiscussionItem;
              return (
                <ProgramDiscussionView
                  key={discussion.id}
                  name={discussion.name}
                  state={discussion.state}
                  path={discussion.path}
                  activated={discussion.path === pathname}
                />
              );
            }
          })}
        {test && (
          <CourseTestView
            name={test.name}
            state={test.state}
            activated={test.path === pathname}
            path={test.path}
            can={test.can}
          />
        )}
        {survey && (
          <CourseSurveyView
            name={survey.name}
            state={survey.state}
            activated={survey.path === pathname}
            path={survey.path}
            can={survey.can}
          />
        )}
        {report && report.name !== null && report.name !== '' && (
          <CourseReportView
            name={report.name}
            state={report.state}
            activated={report.path === pathname}
            path={report.path}
            can={report.can}
          />
        )}
      </div>
    </>
  );
};

export default CourseView;
