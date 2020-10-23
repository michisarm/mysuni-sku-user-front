import React from 'react';
import {
  LectureStructure,
  LectureStructureCubeItemParams,
  LectureStructureItemType,
} from '../../../viewModel/LectureStructure';
import CubeView from './CubeView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

function getPath(
  params: LectureStructureCubeItemParams,
  itemType: LectureStructureItemType
) {
  const { cineroomId, collegeId, cubeId, lectureCardId } = params;
  if (cineroomId === undefined) {
    return `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/${itemType.toLowerCase()}`;
  }
  return `/lecture/cineroom/${cineroomId}/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/${itemType.toLowerCase()}`;
}

function getSelfPath(params: LectureStructureCubeItemParams) {
  const { cineroomId, collegeId, cubeId, lectureCardId } = params;
  if (cineroomId === undefined) {
    return `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}`;
  }
  return `/lecture/cineroom/${cineroomId}/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}`;
}

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
          path={getSelfPath(lectureStructure.cube.params)}
        />
      )}
      {lectureStructure.test !== undefined && (
        <TestView
          name={lectureStructure.test.name}
          state={lectureStructure.test.state}
          questionCount={lectureStructure.test.questionCount}
          path={getPath(
            lectureStructure.test.params as LectureStructureCubeItemParams,
            lectureStructure.test.type
          )}
        />
      )}
      {lectureStructure.survey !== undefined && (
        <SurveyView
          name={lectureStructure.survey.name}
          state={lectureStructure.survey.state}
          questionCount={lectureStructure.survey.questionCount}
          path={getPath(
            lectureStructure.survey.params as LectureStructureCubeItemParams,
            lectureStructure.survey.type
          )}
        />
      )}
      {lectureStructure.report !== undefined && (
        <ReportView
          name={lectureStructure.report.name}
          state={lectureStructure.report.state}
          path={getPath(
            lectureStructure.report.params as LectureStructureCubeItemParams,
            lectureStructure.report.type
          )}
        />
      )}
    </>
  );
};

export default CubeLectureStructureView;
