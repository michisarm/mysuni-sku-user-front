import { useLectureDescription } from 'lecture/detail/service/useLectureOverview/useLectureDescription';
import React from 'react';
import LectureDescriptionView from '../../view/LectureOverview/LectureDescriptionView';

function LectureDescriptionContainer() {
  const [lectureDescription] = useLectureDescription();
  return (
    <>
      {lectureDescription && (
        <LectureDescriptionView lectureDescription={lectureDescription} />
      )}
    </>
  );
}

export default LectureDescriptionContainer;
