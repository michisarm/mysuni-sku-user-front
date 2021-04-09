import React, { Fragment } from 'react';
import { useLocation } from 'react-router';
import LectureParams from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureDurationableCubeItem,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CourseReportView from './CourseReportView';
import CourseSurveyView from './CourseSurveyView';
import CourseTestView from './CourseTestView';
import CubeView from './CubeView';
import DiscussionView from './DiscussionView';
import DurationableCubeView from './DurationableCubeView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

interface CubeLectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const CubeLectureStructureView: React.FC<CubeLectureStructureViewProps> = function CubeLectureStructureView({
  lectureStructure,
}) {
  const { pathname } = useLocation();
  const { card, items } = lectureStructure;
  const { test, survey, report } = card;
  return (
    <>
      {items !== undefined &&
        items.map(item => {
          if (item.type === 'CUBE') {
            const cube = item as LectureStructureCubeItem;
            return (
              <Fragment key={cube.cubeId}>
                {cube.cubeType !== 'Audio' && cube.cubeType !== 'Video' && (
                  <CubeView
                    name={cube.name}
                    state={cube.state}
                    activated={cube.path === pathname}
                    learningTime={cube.learningTime}
                    cubeType={cube.cubeType}
                    path={cube.path}
                    can={cube.can}
                  />
                )}
                {(cube.cubeType === 'Audio' || cube.cubeType === 'Video') && (
                  <DurationableCubeView
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
                {cube.test !== undefined && (
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
                {cube.report !== undefined && (
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
              <DiscussionView
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
      {report && (
        <CourseReportView
          name={report.name}
          state={report.state}
          activated={report.path === pathname}
          path={report.path}
          can={report.can}
        />
      )}
    </>
  );
};

export default CubeLectureStructureView;
