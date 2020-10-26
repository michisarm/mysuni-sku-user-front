import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LectureDetailContainer from './ui/logic/LectureDetailContainer';
import LectureOverviewPage from './ui/logic/LectureOverview/LectureOverviewPage';
import LectureReportPage from './ui/logic/LectureReport/LectureReportPage';

export default function LectureDetailCourseRoutes() {
  return (
    <Switch>
      {/* Program / Course */}
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
        component={LectureOverviewPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
        component={LectureOverviewPage}
      />
      {/* Program / Course / Exam, Survey, Report*/}
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/exam"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/exam"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/survey"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/survey"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/report"
        component={LectureReportPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/report"
        component={LectureReportPage}
      />
      {/* Content */}
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId"
        component={LectureOverviewPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId"
        component={LectureOverviewPage}
      />
      {/* Content Exam,Survey,Report */}
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/exam"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/exam"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/survey"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/survey"
        component={LectureDetailContainer}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/report"
        component={LectureReportPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/report"
        component={LectureReportPage}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/course/:courseId/report"
        component={LectureReportPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/course/:courseId/report"
        component={LectureReportPage}
      />{' '}
    </Switch>
  );
}
