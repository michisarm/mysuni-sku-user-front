import React, { useEffect, useRef, useState } from 'react';
import {
  setInMyLectureCdo,
  setLectureComment,
  setLectureCubeSummary,
  setLectureDescription,
  setLectureFile,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureReview,
  setLectureSubcategory,
  setLectureTags,
} from '../../store/LectureOverviewStore';
import { getCubeLectureOverview } from '../../service/useLectuerCubeOverview/utility/getCubeLectureOverview';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import LectureVideoContainer from './LectureVideoContainer';
import { setLectureState } from 'lecture/detail/store/LectureStateStore';
import { onLectureMedia } from '../../store/LectureMediaStore';
import { MediaType } from '../../model/MediaType';
import moment from 'moment';
import { reactAlert } from '@nara.platform/accent';

function LectureCubeVideoPage() {
  const params = useLectureRouterParams();
  const { contentId, lectureId } = params || { contentId: '', lectureId: '' };
  const modalTestRef = useRef<boolean>(false);
  useEffect(() => {
    if (params === undefined) {
      return;
    }
    getCubeLectureOverview(contentId, lectureId);
    return () => {
      setLectureCubeSummary();
      setLectureDescription();
      setLectureSubcategory();
      setLectureTags();
      setLectureInstructor();
      setLecturePrecourse();
      setLectureFile();
      setLectureComment();
      setLectureReview();
      setInMyLectureCdo();
      setLectureState();
      modalTestRef.current = false;
    };
  }, [contentId, lectureId]);

  useEffect(() => {
    return onLectureMedia(next => {
      if (next === undefined) {
        return;
      }
      if (modalTestRef.current === false) {
        modalTestRef.current = true;
        if (
          next?.mediaType === MediaType.ContentsProviderMedia &&
          next?.mediaContents !== undefined &&
          next?.mediaContents !== null &&
          next?.mediaContents.contentsProvider !== undefined &&
          next?.mediaContents.contentsProvider !== null &&
          next?.mediaContents.contentsProvider.expiryDate !== undefined &&
          next?.mediaContents.contentsProvider.expiryDate !== null &&
          moment(next?.mediaContents.contentsProvider.expiryDate).isValid()
        ) {
          if (
            moment(next.mediaContents.contentsProvider.expiryDate)
              .subtract(7, 'day')
              .startOf('day')
              .valueOf() < Date.now() &&
            moment(next.mediaContents.contentsProvider.expiryDate)
              .endOf('day')
              .valueOf() > Date.now()
          ) {
            reactAlert({
              title: '',
              message: `${moment(
                next.mediaContents.contentsProvider.expiryDate
              ).format('YYYY-MM-DD')} 까지 만료되는 콘텐츠 입니다.`,
            });
          }
        }
      }
    }, 'LectureCubeVideoPage');
  }, []);

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureVideoContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeVideoPage;
