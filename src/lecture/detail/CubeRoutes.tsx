import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LectureDetailContainer from './ui/logic/LectureDetailContainer';
import LectureTestPage from './ui/logic/LectureTestPage';

export default function CubeRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/exam/:examId"
        component={LectureTestPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/exam/:examId"
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
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/report"
        component={LectureDetailContainer}
      />
    </Switch>
  );
}
