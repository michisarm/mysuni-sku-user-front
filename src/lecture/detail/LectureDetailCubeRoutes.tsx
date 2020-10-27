import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LectureDetailContainer from './ui/logic/LectureDetailContainer';
import LectureTestPage from './ui/logic/LectureTestPage';
import LectureReportPage from './ui/logic/LectureReport/LectureReportPage';
import LectureOverviewPage from './ui/logic/LectureOverview/LectureCourseOverviewPage';

export default function LectureDetailCubeRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
        component={LectureDetailCubeRoutes}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
        component={LectureDetailCubeRoutes}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/exam"
        component={LectureTestPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/exam"
        component={LectureTestPage}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/survey"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/survey"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/report"
        component={LectureReportPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/report"
        component={LectureReportPage}
      />
    </Switch>
  );
}
