import React, { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
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
import {
  setLectureCubeSummary,
  setLectureDescription,
  setLectureSubcategory,
} from './store/LectureOverviewStore';
import { useRequestLectureState } from './service/useLectureState/useRequestLectureState';
import { useRequestLectureStructure } from './service/useLectureStructure/useRequestLectureStructure';
import { useCubeBreadcrumb } from './service/useCubeBreadcrumb';

export default function LectureDetailCubeRoutes() {
  useRequestLectureStructure();
  useCubeBreadcrumb();

  const params = useParams<LectureParams>();
  const { cardId, cubeId, viewType } = params;
  useEffect(() => {
    setLectureParams(params);
  }, [params]);

  useEffect(() => {
    return () => {
      clearFindCubeDetailCache();
    };
  }, [cardId]);

  useEffect(() => {
    if (cubeId === undefined) {
      return;
    }
    getCubeLectureOverview(cubeId);
  }, [cubeId]);
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
