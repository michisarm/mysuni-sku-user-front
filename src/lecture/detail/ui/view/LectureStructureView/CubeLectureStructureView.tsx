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
  const cube = lectureStructure.cubes[0];
  if (cube === undefined) {
    return null;
  }
  return (
    <>
      {cube !== undefined &&
        cube.cubeType !== 'Audio' &&
        cube.cubeType !== 'Video' && (
          <CubeView
            key={cube.cubeId}
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
        (cube.cubeType === 'Audio' || cube.cubeType === 'Video') && (
          <DurationableCubeView
            key={cube.cubeId}
            name={cube.name}
            state={cube.state}
            activated={cube.activated}
            learningTime={cube.learningTime}
            cubeType={cube.cubeType}
            path={cube.path}
            can={cube.can}
            duration={(cube as LectureStructureDurationableCubeItem).duration}
          />
        )}
      {cube?.test !== undefined && (
        <TestView
          name={cube.test.name}
          state={cube.test.state}
          path={cube.test.path}
          can={cube.test.can}
          activated={cube.test.activated}
        />
      )}
      {cube?.survey !== undefined && (
        <SurveyView
          name={cube.survey.name}
          state={cube.survey.state}
          path={cube.survey.path}
          can={cube.survey.can}
          activated={cube.survey.activated}
        />
      )}
      {cube?.report !== undefined && (
        <ReportView
          name={cube.report.name}
          state={cube.report.state}
          path={cube.report.path}
          can={cube.report.can}
          activated={cube.report.activated}
        />
      )}
    </>
  );
};

export default CubeLectureStructureView;
