import React, { useEffect, useState } from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { MediaType } from 'lecture/detail/model/MediaType';
import LinkedInModal from '../view/LectureVideoView/LinkedInModal';
import ContentsProviderType from 'personalcube/media/model/ContentsProviderType';

function LectureVideoContainer() {
  // useLectureMedia();

  const [,,checkStudent] = useLectureMedia();
  const params = useLectureRouterParams();
  const [linkedInOpen, setLinkedInOpen] = useState<boolean>(false);

  useEffect(() => {
    
    if (
      getLectureMedia() &&
      getLectureMedia()?.mediaType === MediaType.ContentsProviderMedia &&
      (getLectureMedia()?.mediaContents.contentsProvider.contentsProviderType.name === "Linked in" ||
      getLectureMedia()?.mediaContents.contentsProvider.contentsProviderType.name === ContentsProviderType.LinkedIn )
    ) {
      setLinkedInOpen(true);
    }else{
      setLinkedInOpen(false);
    }

    return () => {
      setLinkedInOpen(false);
    };
  }, [getLectureMedia()]);

 

  return (
    <>
      <LectureVideoView params={params} checkStudent={checkStudent}/>
      <LinkedInModal enabled={linkedInOpen} />
    </>
    );
}

export default LectureVideoContainer;
