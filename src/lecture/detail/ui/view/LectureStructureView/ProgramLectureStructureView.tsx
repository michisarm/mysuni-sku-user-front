import React from 'react';
import { Link } from 'react-router-dom';
import { LectureStructure } from '../../../viewModel/LectureStructure';
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
      {lectureStructure.courses.map(course => (
        <CourseView
          key={course.id}
          name={course.name}
          state={course.state}
          activated={course.activated}
          cubes={course.cubes}
          test={course.test}
          survey={course.survey}
          report={course.report}
          discussion={course.discussion}
          path={course.path}
        />
      ))}
      {lectureStructure.cubes.length > 0 &&
        lectureStructure.cubes.map(cube => {
          return (
            <ProgramCubeView
              name={cube.name}
              state={cube.state}
              activated={cube.activated}
              learningTime={cube.learningTime}
              cubeType={cube.cubeType}
              path={cube.path}
              can={cube.can}
            />
          );
        })}
      {lectureStructure.test !== undefined && (
        <ProgramTestView
          name={lectureStructure.test.name}
          state={lectureStructure.test.state}
          path={lectureStructure.test.path}
          activated={lectureStructure.test.activated}
          can={lectureStructure.test.can}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <ProgramSurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          path={lectureStructure.survey.path}
          activated={lectureStructure.survey.activated}
          can={lectureStructure.survey.can}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ProgramReportView
          name={lectureStructure.report.name}
          state={lectureStructure.report.state}
          path={lectureStructure.report.path}
          activated={lectureStructure.report.activated}
          can={lectureStructure.report.can}
        />
      )}
      {lectureStructure.discussion !== undefined && (
        <ProgramDiscussionView
          name={lectureStructure.discussion.name}
          state={lectureStructure.discussion.state}
          path={lectureStructure.discussion.path}
          activated={lectureStructure.discussion.activated}
        />
      )}
    </>
  );
};

export default ProgramLectureStructureView;
