import { useContext, useEffect } from 'react';
import AppContext from '../../../layout/UserApp/ui/logic/AppContext';
import routePaths from '../../routePaths';
import { useLectureCubeSummary } from './useLectureCourseOverview/useLectureCubeSummary';

export function useCubeBreadcrumb() {
  const [lectureSummary] = useLectureCubeSummary();
  const {
    breadcrumb: { setBreadcrumb },
  } = useContext(AppContext);

  useEffect(() => {
    if (lectureSummary?.category.channelId === undefined) {
      return;
    }
    const breadcrumbValue = [
      {
        text: `${lectureSummary.category.collegeId} College`,
        path: routePaths.collegeLectures(lectureSummary.category.collegeId),
      },
      {
        text: `${lectureSummary.category.collegeId} Channel`,
        path: routePaths.channelLectures(
          lectureSummary.category.collegeId,
          lectureSummary.category.collegeId
        ),
      },
    ];
    setBreadcrumb(breadcrumbValue);
  }, [lectureSummary?.category.channelId, lectureSummary?.category.collegeId]);
}
