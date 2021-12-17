import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import CourseView from './CourseView';
import NoteTabView from './NoteTabView';

interface CourseLectureStructureViewProps {
  lectureStructure: LectureStructure;
  noteTab: boolean;
  cubeType: any;
}

const CourseLectureStructureView: React.FC<CourseLectureStructureViewProps> =
  function CourseLectureStructureView({ lectureStructure, noteTab, cubeType }) {
    const { pathname } = useLocation();

    return (
      <>
        {lectureStructure.card !== undefined &&
          noteTab !== undefined &&
          !noteTab && (
            <>
              <CourseView
                key={lectureStructure.card.cardId}
                cardId={lectureStructure.card.cardId}
                name={lectureStructure.card.name}
                state={lectureStructure.card.state}
                activated={lectureStructure.card.path === pathname}
                cubes={lectureStructure.cubes}
                items={lectureStructure.items}
                path={lectureStructure.card.path}
                test={lectureStructure.card.test}
                survey={lectureStructure.card.survey}
                report={lectureStructure.card.report}
              />
            </>
          )}
        {lectureStructure.card !== undefined &&
          noteTab !== undefined &&
          noteTab && (
            <>
              <NoteTabView
                key={lectureStructure.card.cardId}
                name={lectureStructure.card.name}
                state={lectureStructure.card.state}
                activated={lectureStructure.card.path === pathname}
                cubes={lectureStructure.cubes}
                items={lectureStructure.items}
                path={lectureStructure.card.path}
                test={lectureStructure.card.test}
                survey={lectureStructure.card.survey}
                report={lectureStructure.card.report}
                cubeType={cubeType}
              />
            </>
          )}
      </>
    );
  };

export default CourseLectureStructureView;
