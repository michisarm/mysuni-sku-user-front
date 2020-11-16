import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import React, { useEffect, useState } from 'react';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureTaskContainer from './LectureTaskContainer';

function LectureCubeTaskPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params === undefined) {
      return;
    }
    const { contentId, lectureId } = params;
    getCubeLectureOverview(contentId, lectureId);
  }, [params]);

  return (
    <LectureDetailLayout>
      <LectureTaskContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeTaskPage;
