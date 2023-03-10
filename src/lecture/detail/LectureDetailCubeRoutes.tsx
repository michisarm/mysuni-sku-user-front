import React, { useEffect } from 'react';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import LectureTestPage from './ui/logic/LectureTestPage';
import LectureReportPage from './ui/logic/LectureReport/LectureReportPage';
import LectureDetailCubeSubRoutes from './LectureDetailCubeSubRoutes';
import LectureSurveyPage from './ui/logic/LectureSurveyPage';
import LectureParams from './viewModel/LectureParams';
import LectureDetailLayout from './ui/view/LectureDetailLayout';
import NotFoundPage from 'layout/NotFoundPage';
import { setLectureParams } from './store/LectureParamsStore';
import { clearFindCubeDetailCache } from './api/cubeApi';
import { getCubeLectureOverview } from './service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useRequestLectureState } from './service/useLectureState/useRequestLectureState';
import { useCubeBreadcrumb } from './service/useCubeBreadcrumb';
import { useRequestLectureCardOverview } from './service/useLectureCourseOverview/useRequestLectureCourseOverview';

export default function LectureDetailCubeRoutes() {
  useCubeBreadcrumb();
  useRequestLectureCardOverview();

  const params = useParams<LectureParams>();
  const { pathname } = useLocation();
  const { cardId, cubeId, viewType } = params;
  useEffect(() => {
    setLectureParams({ ...params, pathname });
  }, [params, pathname]);

  useEffect(() => {
    return () => {
      clearFindCubeDetailCache();
    };
  }, [cardId]);

  useEffect(() => {
    if (cubeId === undefined) {
      return;
    }
    getCubeLectureOverview(cardId, cubeId);
  }, [cardId, cubeId]);
  useRequestLectureState();

  return (
    <LectureDetailLayout>
      <Switch>
        {viewType === 'view' && <LectureDetailCubeSubRoutes />}
        {viewType === 'test' && <LectureTestPage />}
        {viewType === 'report' && <LectureReportPage />}
        {viewType === 'survey' && <LectureSurveyPage />}
        <Route component={NotFoundPage} />
      </Switch>
    </LectureDetailLayout>
  );
}
