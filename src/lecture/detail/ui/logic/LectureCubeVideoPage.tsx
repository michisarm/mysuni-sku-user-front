import React, { Fragment, useEffect, useRef } from 'react';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import LectureVideoContainer from './LectureVideoContainer';
import { onLectureMedia } from '../../store/LectureMediaStore';
import moment from 'moment';
import { reactAlert } from '@nara.platform/accent';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { useLectureParams } from '../../store/LectureParamsStore';
import { MediaType } from '../../../model/MediaType';

function LectureCubeVideoPage() {
  const params = useLectureParams();
  const modalTestRef = useRef<boolean>(false);
  useEffect(() => {
    return () => {
      modalTestRef.current = false;
    };
  }, [params?.cubeId]);

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

  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      <LectureVideoContainer />
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeVideoPage;
