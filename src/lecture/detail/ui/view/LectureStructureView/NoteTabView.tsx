import React, { Fragment, useCallback, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import LectureParams from '../../../viewModel/LectureParams';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureDurationableCubeItem,
  LectureStructureItem,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
} from '../../../viewModel/LectureStructure';
import LectureNoteContainer from '../../logic/LectureNoteContainer';
import CourseReportView from './CourseReportView';
import CourseSurveyView from './CourseSurveyView';
import CourseTestView from './CourseTestView';
import CubeView from './CubeView';
import DurationableCubeView from './DurationableCubeView';
import ProgramDiscussionView from './ProgramDiscussionView';
import ReportView from './ReportView';
import SurveyView from './SurveyView';
import TestView from './TestView';

interface CourseViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  cubes?: LectureStructureCubeItem[];
  items?: LectureStructureItem[];
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  path: string;
  cubeType: any;
}

const NoteTabView: React.FC<CourseViewProps> = function CourseView({
  name,
  state = 'None',
  activated = false,
  cubes,
  items,
  test,
  survey,
  report,
  path,
  cubeType
}) {
  const { pathname } = useLocation();
  const params = useParams<LectureParams>();

  const [opened, setOpened] = useState<boolean>(true);
  return (
    <>
      <div
        className="state-course-holder"
        style={opened ? {} : { display: 'none' }}
      >
        {items !== undefined &&
          items.map(item => {
            if (item.type === 'CUBE') {
              const cube = item as LectureStructureCubeItem;
              if(cube.path === pathname) {
                return (
                  <Fragment key={cube.cubeId}>
                    {/* <CubeView
                      name={cube.name}
                      state={cube.state}
                      activated={cube.path === pathname}
                      learningTime={cube.learningTime}
                      cubeType={cube.cubeType}
                      path={cube.path}
                      can={cube.can}
                    /> */}
                    {/* 노트 컨테이너 위치 */}
                    <LectureNoteContainer 
                      cubeId={cube.cubeId} 
                      cardId={params.cardId} 
                      cubeType={cubeType}
                      name={cube.name}
                      learningTime={cube.learningTime}
                    />
                  </Fragment>
                );
              }
            }
          })}
      </div>
    </>
  );
};

export default NoteTabView;
