import React from 'react';
import LectureParams from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CubeView from './CubeView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

interface CubeLectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const CubeLectureStructureView: React.FC<CubeLectureStructureViewProps> = function CubeLectureStructureView({
  lectureStructure,
}) {
  return (
    <>
      {lectureStructure.cube !== undefined && (
        <CubeView
          key={lectureStructure.cube.id}
          name={lectureStructure.cube.name}
          state={lectureStructure.cube.state}
          activated={lectureStructure.cube.activated}
          learningTime={lectureStructure.cube.learningTime}
          cubeType={lectureStructure.cube.cubeType}
          path={lectureStructure.cube.path}
          can={lectureStructure.cube.can}
        />
      )}
      {lectureStructure.test !== undefined && (
        <TestView
          name={lectureStructure.test.name}
          state={lectureStructure.test.state}
          questionCount={lectureStructure.test.questionCount}
          path={lectureStructure.test.path}
          can={lectureStructure.test.can}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <SurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          questionCount={lectureStructure.survey.questionCount}
          path={lectureStructure.survey.path}
          can={lectureStructure.survey.can}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ReportView
          name={lectureStructure.report.name}
          state={lectureStructure.report.state}
          path={lectureStructure.report.path}
          can={lectureStructure.report.can}
        />
      )}
    </>
  );
};

export default CubeLectureStructureView;
