import { useContext, useEffect } from 'react';
import AppContext from '../../../layout/UserApp/ui/logic/AppContext';
import routePaths from '../../routePaths';
import { useLectureCardSummary } from '../store/LectureOverviewStore';
import { getEmptyLectureCardSummary } from '../viewModel/LectureOverview/LectureCardSummary';

export function useCardBreadcrumb() {
  const lectureSummary =
    useLectureCardSummary() || getEmptyLectureCardSummary();
  const {
    breadcrumb: { setBreadcrumb },
  } = useContext(AppContext);

  useEffect(() => {
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
  }, [lectureSummary.category.channelId, lectureSummary.category.collegeId]);
}
