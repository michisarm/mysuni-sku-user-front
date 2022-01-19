import React, { Fragment } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import LectureParams from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureCubeItem,
  LectureStructureDurationableCubeItem,
} from '../../../viewModel/LectureStructure';
import LectureNoteContainer from '../../logic/LectureNoteContainer';
import DurationableCubeView from './DurationableCubeView';

interface CubeLectureStructureViewProps {
  lectureStructure: LectureStructure;
  noteTab: boolean;
  cubeType: any;
}

const CubeLectureStructureNoteView: React.FC<CubeLectureStructureViewProps> = function CubeLectureStructureView({
  lectureStructure,
  cubeType,
}) {
  const { pathname } = useLocation();
  const params = useParams<LectureParams>();
  const { card, items } = lectureStructure;
  return (
    <>
      {items !== undefined &&
        items.map((item) => {
          if (item.type === 'CUBE') {
            const cube = item as LectureStructureCubeItem;
            return (
              <Fragment key={cube.cubeId}>
                <>
                  <DurationableCubeView
                    cardId={params.cardId}
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
                  {/* 노트 컨테이너 위치 */}
                  <LectureNoteContainer
                    cubeId={cube.cubeId}
                    cardId={params.cardId}
                    cubeType={cubeType}
                    name={cube.name}
                    learningTime={cube.learningTime}
                  />
                </>
              </Fragment>
            );
          }
        })}
    </>
  );
};

export default CubeLectureStructureNoteView;
