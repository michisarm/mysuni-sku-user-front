import React, { useEffect } from 'react';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureDocumentsView from '../view/LectureDocumentsView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';

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
  const [lectureWebpage] = useLectureWebpage();
  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      {lectureWebpage && <LectureDocumentsView {...lectureWebpage} />}
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeDocumentsPage;
