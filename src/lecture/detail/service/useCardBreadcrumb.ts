import { useContext, useEffect } from 'react';
import AppContext from '../../../layout/UserApp/ui/logic/AppContext';
import { useAllColleges } from '../../../shared/service/requestAllColleges';
import {
  getChannelName,
  getCollgeName,
} from '../../../shared/service/useCollege/useRequestCollege';
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
        text: `${getCollgeName(lectureSummary.category.collegeId)} College`,
        path: routePaths.collegeLectures(lectureSummary.category.collegeId),
      },
      {
        text: `${getChannelName(lectureSummary.category.channelId)} Channel`,
        path: routePaths.channelLectures(
          lectureSummary.category.collegeId,
          lectureSummary.category.channelId
        ),
      },
    ];
    setBreadcrumb(breadcrumbValue);
  }, [lectureSummary.category.channelId, lectureSummary.category.collegeId]);
}
