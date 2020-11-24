import React, { useContext, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import LectureDetailCourseSubRoutes from './LectureDetailCourseSubRoutes';
import LectureDetailContainer from './ui/logic/LectureDetailContainer';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';
import LectureReportPage from './ui/logic/LectureReport/LectureReportPage';
import LectureTestPage from './ui/logic/LectureTestPage';
import LectureSurveyPage from './ui/logic/LectureSurveyPage';
import LectureDiscussionPage from './ui/logic/LectureDiscussionPage';
import {
  getActiveCourseStructureItem,
  getActiveStructureItem,
  useLectureStructure,
} from './service/useLectureStructure/useLectureStructure';
import Category from './model/Category';
import {
  LectureStructureCourseItem,
  LectureStructureCubeItem,
} from './viewModel/LectureStructure';
import AppContext from '../../layout/UserApp/ui/logic/AppContext';
import routePaths from '../routePaths';

export default function LectureDetailCourseRoutes() {
  const [lectureStructure] = useLectureStructure();
  // const { breadcrumb } = useContext(AppContext);
  // useEffect(() => {
  //   if (lectureStructure === undefined) {
  //     return;
  //   }
  //   let category: Category | undefined;
  //   const course = getActiveCourseStructureItem();
  //   if (course !== undefined && course.lectureView !== undefined) {
  //     category = course.lectureView.category;
  //     const breadcrumbValue = [
  //       {
  //         text: `${category.college.name} College`,
  //         path: routePaths.collegeLectures(category.college.id),
  //       },
  //       {
  //         text: `${category.channel.name} Channel`,
  //         path: routePaths.channelLectures(
  //           category.college.id,
  //           category.channel.id
  //         ),
  //       },
  //     ];
  //     breadcrumb.setBreadcrumb(breadcrumbValue);
  //     return;
  //   }
  //   if (
  //     course !== undefined &&
  //     (course as LectureStructureCourseItem).coursePlanComplex !== undefined
  //   ) {
  //     category = (course as LectureStructureCourseItem).coursePlanComplex
  //       ?.coursePlan.category;
  //     if (category !== undefined) {
  //       const breadcrumbValue = [
  //         {
  //           text: `${category.college.name} College`,
  //           path: routePaths.collegeLectures(category.college.id),
  //         },
  //         {
  //           text: `${category.channel.name} Channel`,
  //           path: routePaths.channelLectures(
  //             category.college.id,
  //             category.channel.id
  //           ),
  //         },
  //       ];
  //       breadcrumb.setBreadcrumb(breadcrumbValue);
  //       return;
  //     }
  //   }

  //   const lecture = getActiveStructureItem();
  //   if (lecture === undefined) {
  //     return;
  //   }
  //   if (lecture.lectureView !== undefined) {
  //     category = lecture.lectureView.category;
  //   }
  //   if (
  //     (lecture as LectureStructureCourseItem).coursePlanComplex !== undefined
  //   ) {
  //     category = (lecture as LectureStructureCourseItem).coursePlanComplex
  //       ?.coursePlan.category;
  //   }
  //   if ((lecture as LectureStructureCubeItem).cube !== undefined) {
  //     category = (lecture as LectureStructureCubeItem).cube?.category;
  //   }
  //   if (category !== undefined) {
  //     const breadcrumbValue = [
  //       {
  //         text: `${category.college.name} College`,
  //         path: routePaths.collegeLectures(category.college.id),
  //       },
  //       {
  //         text: `${category.channel.name} Channel`,
  //         path: routePaths.channelLectures(
  //           category.college.id,
  //           category.channel.id
  //         ),
  //       },
  //     ];
  //     breadcrumb.setBreadcrumb(breadcrumbValue);
  //   }
  // }, [lectureStructure, breadcrumb]);
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
      <Route
        exact
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/discussion"
        component={LectureDiscussionPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/discussion"
        component={LectureDiscussionPage}
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
        path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/discussion"
        component={LectureDiscussionPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/:lectureType/:contentId/:lectureId/discussion"
        component={LectureDiscussionPage}
      />
    </Switch>
  );
}
