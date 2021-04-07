import { useContext, useEffect } from 'react';
import AppContext from '../../../layout/UserApp/ui/logic/AppContext';
import {
  getChannelName,
  getCollgeName,
} from '../../../shared/service/useCollege/useRequestCollege';
import { useChannelStore } from '../../../shared/store/ChannelStore';
import { useCollegeStore } from '../../../shared/store/CollegeStore';
import routePaths from '../../routePaths';
import { useLectureCardSummary } from '../store/LectureOverviewStore';
import { getEmptyLectureCardSummary } from '../viewModel/LectureOverview/LectureCardSummary';

export function useCardBreadcrumb() {
  const lectureSummary =
    useLectureCardSummary() || getEmptyLectureCardSummary();
  const {
    breadcrumb: { setBreadcrumb },
  } = useContext(AppContext);

  const channels = useChannelStore();
  const colleges = useCollegeStore();

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
          lectureSummary.category.collegeId
        ),
      },
    ];
    setBreadcrumb(breadcrumbValue);
  }, [
    lectureSummary.category.channelId,
    lectureSummary.category.collegeId,
    channels,
    colleges,
  ]);
}
