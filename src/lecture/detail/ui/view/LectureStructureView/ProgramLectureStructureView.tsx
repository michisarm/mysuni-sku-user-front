import React from 'react';
import { Link } from 'react-router-dom';
import {
  LectureStructure,
  LectureStructureCourseItem,
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
} from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';
import ProgramCubeView from './ProgramCubeView';
import ProgramDiscussionView from './ProgramDiscussionView';
import ProgramHeaderView from './ProgramHeaderView';
import ProgramReportView from './ProgramReportView';
import ProgramSurveyView from './ProgramSurveyView';
import ProgramTestView from './ProgramTestView';

interface ProgramLectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const ProgramLectureStructureView: React.FC<ProgramLectureStructureViewProps> = function ProgramLectureStructureView({
  lectureStructure,
}) {
  return (
    <>
      {lectureStructure.course !== undefined && (
        <Link to={lectureStructure.course.path}>
          <ProgramHeaderView name={lectureStructure.course.name} />
        </Link>
      )}
      {lectureStructure.items.map(item => {
        if (item.type === 'COURSE') {
          const course = item as LectureStructureCourseItem;
          return (
            <CourseView
              key={course.id}
              name={course.name}
              state={course.state}
              activated={course.activated}
              cubes={course.cubes}
              test={course.test}
              survey={course.survey}
              report={course.report}
              // discussion={course.discussion}
              path={course.path}
            />
          );
        }
        if (item.type === 'CUBE') {
          const cube = item as LectureStructureCubeItem;
          return (
            <ProgramCubeView
              key={cube.id}
              name={cube.name}
              state={cube.state}
              activated={cube.activated}
              learningTime={cube.learningTime}
              cubeType={cube.cubeType}
              path={cube.path}
              can={cube.can}
            />
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
              activated={discussion.activated}
            />
          );
        }
        return null;
      })}

      {lectureStructure.course?.test !== undefined && (
        <ProgramTestView
          name={lectureStructure.course.test.name}
          state={lectureStructure.course.test.state}
          path={lectureStructure.course.test.path}
          activated={lectureStructure.course.test.activated}
          can={lectureStructure.course.test.can}
        />
      )}
      {lectureStructure.course?.survey !== undefined && (
        <ProgramSurveyView
          name={lectureStructure.course.survey.name}
          state={lectureStructure.course.survey.state}
          path={lectureStructure.course.survey.path}
          activated={lectureStructure.course.survey.activated}
          can={lectureStructure.course.survey.can}
        />
      )}
      {lectureStructure.course?.report !== undefined && (
        <ProgramReportView
          name={lectureStructure.course.report.name}
          state={lectureStructure.course.report.state}
          path={lectureStructure.course.report.path}
          activated={lectureStructure.course.report.activated}
          can={lectureStructure.course.report.can}
        />
      )}
      {/* {lectureStructure.discussion !== undefined && (
        <ProgramDiscussionView
          name={lectureStructure.discussion.name}
          state={lectureStructure.discussion.state}
          path={lectureStructure.discussion.path}
          activated={lectureStructure.discussion.activated}
        />
      )} */}
    </>
  );
};

export default ProgramLectureStructureView;
