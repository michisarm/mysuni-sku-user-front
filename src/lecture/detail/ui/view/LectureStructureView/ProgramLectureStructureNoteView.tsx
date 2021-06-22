import React, { Fragment, useCallback, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import LectureParams from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureCubeItem,
} from '../../../viewModel/LectureStructure';
import LectureNoteContainer from '../../logic/LectureNoteContainer';
import ProgramHeaderView from './ProgramHeaderView';

interface ProgramLectureStructureViewProps {
  lectureStructure: LectureStructure;
  noteTab: boolean;
  cubeType: any;
}

const ProgramLectureStructureNoteView: React.FC<ProgramLectureStructureViewProps> = function ProgramLectureStructureView({
  lectureStructure,
  cubeType
}) {
  const { pathname } = useLocation();
  const params = useParams<LectureParams>();

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
        if (item.type === 'CUBE') {
          const cube = item as LectureStructureCubeItem;
          if( cube.path === pathname ) {
            return (
              <Fragment key={cube.cubeId}>
                <LectureNoteContainer
                  cubeId={cube.cubeId} 
                  cardId={params.cardId} 
                  cubeType={cubeType}
                  name={cube.name}
                  learningTime={cube.learningTime}
                />
                {cube.last === true && (
                  <div style={{ height: 8, backgroundColor: '#f8f8f8' }} />
                )}
              </Fragment>
            );
          }
        }
        return null;
      })}
    </>
  );
};

export default ProgramLectureStructureNoteView;
