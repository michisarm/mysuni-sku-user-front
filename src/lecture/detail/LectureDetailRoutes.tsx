import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import NotFoundPage from '../../layout/NotFoundPage';
import LectureDetailCourseRoutes from './LectureDetailCourseRoutes';
import LectureDetailCubeRoutes from './LectureDetailCubeRoutes';
import { useRequestLectureStructure } from './service/useLectureStructure/useRequestLectureStructure';

export default function LectureDetailRoutes() {
  useRequestLectureStructure();
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