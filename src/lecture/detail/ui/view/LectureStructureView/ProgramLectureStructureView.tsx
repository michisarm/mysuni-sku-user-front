import React from 'react';
import { Link } from 'react-router-dom';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';
import ProgramCubeView from './ProgramCubeView';
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
            />
          );
        })}
      {lectureStructure.test !== undefined && (
        <ProgramTestView
          name={lectureStructure.test.name}
          state={lectureStructure.test.state}
          path={lectureStructure.test.path}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <ProgramSurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          path={lectureStructure.survey.path}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ProgramReportView
          name={lectureStructure.report.name}
          state={lectureStructure.report.state}
          path={lectureStructure.report.path}
        />
      )}
    </>
  );
};

export default ProgramLectureStructureView;
