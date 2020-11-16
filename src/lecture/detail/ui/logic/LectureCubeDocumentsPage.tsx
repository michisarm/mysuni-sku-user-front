import React, { useEffect } from 'react';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeDocumentsContainer from './LectureCubeDocumentsContainer';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeDocumentsPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params === undefined) {
      return;
    }
    const { contentId, lectureId } = params;
    getCubeLectureOverview(contentId, lectureId);
  }, [params]);

  useLectureMedia();

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureCubeDocumentsContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeDocumentsPage;
