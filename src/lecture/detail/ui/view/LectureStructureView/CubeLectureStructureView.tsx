import React from 'react';
import LectureParams from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureDurationableCubeItem,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CubeView from './CubeView';
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
  return (
    <>
      {lectureStructure.cube !== undefined &&
        (lectureStructure.cube as LectureStructureDurationableCubeItem)
          .duration === undefined && (
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
      {lectureStructure.cube !== undefined &&
        (lectureStructure.cube as LectureStructureDurationableCubeItem)
          .duration !== undefined && (
          <DurationableCubeView
            key={lectureStructure.cube.id}
            name={lectureStructure.cube.name}
            state={lectureStructure.cube.state}
            activated={lectureStructure.cube.activated}
            learningTime={lectureStructure.cube.learningTime}
            cubeType={lectureStructure.cube.cubeType}
            path={lectureStructure.cube.path}
            can={lectureStructure.cube.can}
            duration={
              (lectureStructure.cube as LectureStructureDurationableCubeItem)
                .duration
            }
          />
        )}
      {lectureStructure.cube?.test !== undefined && (
        <TestView
          name={lectureStructure.cube.test.name}
          state={lectureStructure.cube.test.state}
          questionCount={lectureStructure.cube.test.questionCount}
          path={lectureStructure.cube.test.path}
          can={lectureStructure.cube.test.can}
        />
      )}
      {lectureStructure.cube?.survey !== undefined && (
        <SurveyView
          name={lectureStructure.cube.survey.name}
          state={lectureStructure.cube.survey.state}
          questionCount={lectureStructure.cube.survey.questionCount}
          path={lectureStructure.cube.survey.path}
          can={lectureStructure.cube.survey.can}
        />
      )}
      {lectureStructure.cube?.report !== undefined && (
        <ReportView
          name={lectureStructure.cube.report.name}
          state={lectureStructure.cube.report.state}
          path={lectureStructure.cube.report.path}
          can={lectureStructure.cube.report.can}
        />
      )}
    </>
  );
};

export default CubeLectureStructureView;
