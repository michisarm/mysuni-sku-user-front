import React, { useEffect } from 'react';
import LectureChapterTitleView from '../../view/LectureChapterView/LectureChapterTitleView';
import LectureCourseListView from '../../view/LectureChapterView/LectureCourseListView';

import { useHistory } from 'react-router';
import { useCourseViewEvent } from '../../../service/useActionLog/useCourseViewEvent';
import { useRequestLectureCardOverview } from '../../../service/useLectureCourseOverview/useRequestLectureCourseOverview';
import { useLectureStructure } from '../../../store/LectureStructureStore';
import LectureCubeNavigatorView from '../../view/LectureOverview/LectureCubeNavigatorView';
import LectureCourseContentContainer from './LectureCourseContentContainer';
import LectureCourseSummaryContainer from './LectureCourseSummaryContainer';

function LectureChapterPage() {
  // useRequestLectureCardOverview();
  // const lectureStructure = useLectureStructure();

  // const history = useHistory();

  // useEffect(() => {
  //   if (lectureStructure === undefined) {
  //     return;
  //   }
  //   if (lectureStructure.cubes.length === 1) {
  //     history.replace(lectureStructure.cubes[0].path);
  //   }
  // }, [lectureStructure]);

  return (
    <>
      <LectureChapterTitleView />
      <LectureCourseListView />
      {/* {lectureStructure !== undefined && (
        <LectureCubeNavigatorView lectureStructure={lectureStructure} />
      )}
      <LectureCourseSummaryContainer />
      <LectureCourseContentContainer /> */}
    </>
  );
}

export default LectureChapterPage;
