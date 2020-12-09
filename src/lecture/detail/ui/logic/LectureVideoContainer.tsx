import React, { useEffect, useState, useCallback } from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { MediaType } from 'lecture/detail/model/MediaType';
import LinkedInModal from '../view/LectureVideoView/LinkedInModal';
import ContentsProviderType from 'personalcube/media/model/ContentsProviderType';
import { useLocation } from 'react-router-dom';

function LectureVideoContainer() {
  // useLectureMedia();

  const [, , checkStudent] = useLectureMedia();
  const params = useLectureRouterParams();
  const [linkedInOpen, setLinkedInOpen] = useState<boolean>(false);

  useEffect(() => {
    if (
      getLectureMedia() &&
      getLectureMedia()?.mediaType === MediaType.ContentsProviderMedia &&
      (getLectureMedia()?.mediaContents.contentsProvider.contentsProviderType
        .name === 'Linked in' ||
        getLectureMedia()?.mediaContents.contentsProvider.contentsProviderType
          .name === ContentsProviderType.LinkedIn)
    ) {
      setLinkedInOpen(true);
    } else {
      setLinkedInOpen(false);
    }

    return () => {
      setLinkedInOpen(false);
    };
  }, [getLectureMedia()]);

  const { pathname } = useLocation();

  // 스크롤 이벤트 영역
  const [scroll, setScroll] = useState<number>(0);
  const [videoPosition, setVideoPosition] = useState<number>(0);

  // 실시간 스크롤 감시
  useEffect(() => {
    const onScroll = () => setScroll(window.pageYOffset);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // video 영역 위치
  const getStickyPosition = useCallback(
    node => {
      if (getLectureMedia() === undefined) {
        return;
      }
      if (node !== undefined) {
        setVideoPosition(
          window.pageYOffset + node?.getBoundingClientRect().bottom / 1.5
        );
      }
    },
    [getLectureMedia(), pathname]
  );
  return (
    <>
      <LectureVideoView
        params={params}
        checkStudent={checkStudent}
        getStickyPosition={getStickyPosition}
        scroll={scroll}
        videoPosition={videoPosition}
      />
      <LinkedInModal enabled={linkedInOpen} />
    </>
  );
}

export default LectureVideoContainer;
