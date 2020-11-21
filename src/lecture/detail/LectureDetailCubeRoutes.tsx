import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LectureDetailContainer from './ui/logic/LectureDetailContainer';
import LectureTestPage from './ui/logic/LectureTestPage';
import LectureReportPage from './ui/logic/LectureReport/LectureReportPage';
import LectureDetailCubeSubRoutes from './LectureDetailCubeSubRoutes';
import LectureSurveyPage from './ui/logic/LectureSurveyPage';
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
import routePaths from '../routePaths';
import AppContext from '../../layout/UserApp/ui/logic/AppContext';

export default function LectureDetailCubeRoutes() {
  const [lectureStructure] = useLectureStructure();
  // const { breadcrumb } = useContext(AppContext);
  // useEffect(() => {
  //   if (lectureStructure === undefined) {
  //     return;
  //   }

  //   let category: Category | undefined;
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
  // }, [lectureStructure]);

  return (
    <Switch>
      <Route
        exact
        path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
        component={LectureDetailCubeSubRoutes}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
        component={LectureDetailCubeSubRoutes}
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
        component={LectureSurveyPage}
      />
      <Route
        exact
        path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/survey"
        component={LectureSurveyPage}
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
