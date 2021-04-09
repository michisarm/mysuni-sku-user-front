import React, { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import LectureCourseOverviewPage from './ui/logic/LectureCourseOverview/LectureCourseOverviewPage';
import LectureReportPage from './ui/logic/LectureReport/LectureReportPage';
import LectureTestPage from './ui/logic/LectureTestPage';
import LectureSurveyPage from './ui/logic/LectureSurveyPage';
import LectureDiscussionPage from './ui/logic/LectureDiscussionPage';
import LectureParams from './viewModel/LectureParams';
import LectureDetailLayout from './ui/view/LectureDetailLayout';
import NotFoundPage from 'layout/NotFoundPage';
import { useCardBreadcrumb } from './service/useCardBreadcrumb';
import { setLectureParams } from './store/LectureParamsStore';
import { useRequestLectureStructure } from './service/useLectureStructure/useRequestLectureStructure';
import { useRequestLectureCardOverview } from './service/useLectureCourseOverview/useRequestLectureCourseOverview';
import {
  clearFindCubeDetailCache,
  clearFindCubesByIdsCache,
} from './api/cubeApi';
import LectureDetailCourseSubRoutes from './LectureDetailCourseSubRoutes';

export default function LectureDetailCourseRoutes() {
  useRequestLectureStructure();
  useRequestLectureCardOverview();
  useCardBreadcrumb();

  const params = useParams<LectureParams>();
  const { cardId, viewType } = params;
  useEffect(() => {
    setLectureParams({ ...params });
  }, [params]);

  useEffect(() => {
    return () => {
      clearFindCubesByIdsCache();
      clearFindCubeDetailCache();
    };
  }, [cardId]);

  return (
    <LectureDetailLayout>
      {viewType === 'view' && <LectureCourseOverviewPage />}
      {viewType === 'test' && <LectureTestPage />}
      {viewType === 'report' && <LectureReportPage />}
      {viewType === 'survey' && <LectureSurveyPage />}
      <Switch>
        <Route
          path="/lecture/card/:cardId/:viewType/:contentId"
          component={LectureDetailCourseSubRoutes}
        />
      </Switch>
    </LectureDetailLayout>
  );
}
