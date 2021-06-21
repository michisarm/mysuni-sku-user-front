import React, { useEffect } from 'react';
import { Switch } from 'react-router';
import { Route, useParams } from 'react-router-dom';
import NotFoundPage from '../../layout/NotFoundPage';
import { InMyLectureService } from '../../myTraining/stores';
import LectureDetailCourseRoutes from './LectureDetailCourseRoutes';
import LectureDetailCubeRoutes from './LectureDetailCubeRoutes';
import { useRequestLectureStructure } from './service/useLectureStructure/useRequestLectureStructure';
import LectureParams from './viewModel/LectureParams';
import {
  cleaCountClassroomStudentsCache,
  clearFindCubeDetailCache,
  clearFindCubesByIdsCache,
} from './api/cubeApi';
import {
  clearFindCardCache,
  clearFindMyCardRelatedStudentsCache,
} from './api/cardApi';
import LectureNoteList from './ui/view/LectureNoteView/LectureNoteList';
import LectureNoteContainer from './ui/logic/LectureNoteContainer';

export default function LectureDetailRoutes() {
  const params = useParams<LectureParams>();
  const { cardId } = params;
  useEffect(() => {
    return () => {
      clearFindCardCache();
      clearFindCubesByIdsCache();
      clearFindCubeDetailCache();
      clearFindMyCardRelatedStudentsCache();
      cleaCountClassroomStudentsCache();
    };
  }, [cardId]);

  useRequestLectureStructure();
  useEffect(() => {
    InMyLectureService.instance.findAllInMyLectures();
  }, []);
  return (
    <Switch>
      <Route
        path="/lecture/card/:cardId/cube/:cubeId/:viewType/:cubeType"
        component={LectureDetailCubeRoutes}
      />

      <Route
        path="/lecture/card/:cardId/:viewType"
        component={LectureDetailCourseRoutes}
      />

      <Route component={NotFoundPage} />
    </Switch>
  );
}
