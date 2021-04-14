import React, { Fragment, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LectureStructure,
  LectureStructureChapterItem,
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureDurationableCubeItem,
} from '../../../viewModel/LectureStructure';
import { ChapterStructureView } from './ChapterStructureView';
import CourseReportView from './CourseReportView';
import CourseSurveyView from './CourseSurveyView';
import CourseTestView from './CourseTestView';
import CubeView from './CubeView';
import DurationableCubeView from './DurationableCubeView';
import ProgramDiscussionView from './ProgramDiscussionView';
import ProgramHeaderView from './ProgramHeaderView';
import ProgramReportView from './ProgramReportView';
import ProgramSurveyView from './ProgramSurveyView';
import ProgramTestView from './ProgramTestView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

interface ProgramLectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const ProgramLectureStructureView: React.FC<ProgramLectureStructureViewProps> = function ProgramLectureStructureView({
  lectureStructure,
}) {
  const { pathname } = useLocation();
  const [collapsedIds, setCollapsedIds] = useState<string[]>([]);
  const onToggle = useCallback((nextCollapsedIds: string[]) => {
    setCollapsedIds(nextCollapsedIds);
  }, []);
  return (
    <>
      {lectureStructure.card !== undefined && (
        <Link to={lectureStructure.card.path}>
          <ProgramHeaderView
            name={lectureStructure.card.name}
            state={lectureStructure.card.state}
            learningTime={lectureStructure.card.learningTime}
            additionalLearningTime={
              lectureStructure.card.additionalLearningTime
            }
          />
        </Link>
      )}
      {lectureStructure.items.map(item => {
        if (item.type === 'CHAPTER') {
          const chapter = item as LectureStructureChapterItem;
          return (
            <ChapterStructureView
              key={chapter.id}
              contentId={chapter.id}
              name={chapter.name}
              path={chapter.path}
              collapsedIds={collapsedIds}
              cubeCount={chapter.cubeCount}
              onToggle={onToggle}
              activated={chapter.path === pathname}
            />
          );
        }
        if (item.type === 'CUBE') {
          const cube = item as LectureStructureCubeItem;
          if (
            cube.parentId !== undefined &&
            collapsedIds.includes(cube.parentId)
          ) {
            return null;
          }
          return (
            <Fragment key={cube.cubeId}>
              {cube.cubeType !== 'Audio' && cube.cubeType !== 'Video' && (
                <CubeView
                  key={cube.cubeId}
                  name={cube.name}
                  state={cube.state}
                  learningTime={cube.learningTime}
                  cubeType={cube.cubeType}
                  path={cube.path}
                  can={cube.can}
                  activated={cube.path === pathname}
                />
              )}
              {(cube.cubeType === 'Audio' || cube.cubeType === 'Video') && (
                <DurationableCubeView
                  key={cube.cubeId}
                  name={cube.name}
                  state={cube.state}
                  learningTime={cube.learningTime}
                  cubeType={cube.cubeType}
                  path={cube.path}
                  can={cube.can}
                  duration={
                    (cube as LectureStructureDurationableCubeItem).duration
                  }
                  activated={cube.path === pathname}
                />
              )}
              {cube.last == true && cube?.test !== undefined && (
                <CourseTestView
                  name={cube.test.name}
                  state={cube.test.state}
                  path={cube.test.path}
                  can={cube.test.can}
                  activated={cube.test.path === pathname}
                />
              )}
              {cube.last == true && cube?.survey !== undefined && (
                <CourseSurveyView
                  name={cube.survey.name}
                  state={cube.survey.state}
                  path={cube.survey.path}
                  can={cube.survey.can}
                  activated={cube.survey.path === pathname}
                />
              )}
              {cube.last == true && cube?.report !== undefined && (
                <CourseReportView
                  name={cube.report.name}
                  state={cube.report.state}
                  path={cube.report.path}
                  can={cube.report.can}
                  activated={cube.report.path === pathname}
                />
              )}
              {cube.last != true && cube?.test !== undefined && (
                <TestView
                  name={cube.test.name}
                  state={cube.test.state}
                  path={cube.test.path}
                  can={cube.test.can}
                  activated={cube.test.path === pathname}
                />
              )}
              {cube.last != true && cube?.survey !== undefined && (
                <SurveyView
                  name={cube.survey.name}
                  state={cube.survey.state}
                  path={cube.survey.path}
                  can={cube.survey.can}
                  activated={cube.survey.path === pathname}
                />
              )}
              {cube.last != true && cube?.report !== undefined && (
                <ReportView
                  name={cube.report.name}
                  state={cube.report.state}
                  path={cube.report.path}
                  can={cube.report.can}
                  activated={cube.report.path === pathname}
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
        return null;
      })}

      {lectureStructure.card?.test !== undefined && (
        <ProgramTestView
          name={lectureStructure.card.test.name}
          state={lectureStructure.card.test.state}
          path={lectureStructure.card.test.path}
          can={lectureStructure.card.test.can}
          activated={lectureStructure.card.test.path === pathname}
        />
      )}
      {lectureStructure.card?.survey !== undefined && (
        <ProgramSurveyView
          name={lectureStructure.card.survey.name}
          state={lectureStructure.card.survey.state}
          path={lectureStructure.card.survey.path}
          can={lectureStructure.card.survey.can}
          activated={lectureStructure.card.survey.path === pathname}
        />
      )}
      {lectureStructure.card?.report !== undefined && (
        <ProgramReportView
          name={lectureStructure.card.report.name}
          state={lectureStructure.card.report.state}
          path={lectureStructure.card.report.path}
          can={lectureStructure.card.report.can}
          activated={lectureStructure.card.report.path === pathname}
        />
      )}
    </>
  );
};

export default ProgramLectureStructureView;
