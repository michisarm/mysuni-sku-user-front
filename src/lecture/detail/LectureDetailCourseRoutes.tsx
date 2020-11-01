import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LectureDetailCourseSubRoutes from './LectureDetailCourseSubRoutes';
import LectureDetailContainer from './ui/logic/LectureDetailContainer';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';
import LectureReportPage from './ui/logic/LectureReport/LectureReportPage';
import LectureTestPage from './ui/logic/LectureTestPage';
import LectureSurveyPage from './ui/logic/LectureSurveyPage';

export default function LectureDetailCourseRoutes() {
  return (
    <Switch>
      {/* Program / Course */}
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
        component={LectureCourseOverviewPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
        component={LectureCourseOverviewPage}
      />
      {/* Program / Course / Exam, Survey, Report*/}
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/exam"
        component={LectureTestPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/exam"
        component={LectureTestPage}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/survey"
        component={LectureSurveyPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/survey"
        component={LectureSurveyPage}
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
        component={LectureDetailCourseSubRoutes}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId"
        component={LectureDetailCourseSubRoutes}
      />
      {/* Content Exam,Survey,Report */}
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/exam"
        component={LectureTestPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/exam"
        component={LectureTestPage}
      />
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/survey"
        component={LectureSurveyPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/survey"
        component={LectureSurveyPage}
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
