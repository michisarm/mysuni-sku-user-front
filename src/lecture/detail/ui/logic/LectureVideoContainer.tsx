import React, { useEffect, useState } from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureVideoView from '../view/LectureVideoView/LectureVideoView';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import { getLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { MediaType } from 'lecture/detail/model/MediaType';
import LinkedInModal from '../view/LectureVideoView/LinkedInModal';

function LectureVideoContainer() {
  // useLectureMedia();

  const [,,checkStudent] = useLectureMedia();
  const params = useLectureRouterParams();
  const [linkedInOpen, setLinkedInOpen] = useState<boolean>(false);

  useEffect(() => {
    
    if (
      getLectureMedia() &&
      getLectureMedia()?.mediaType === MediaType.ContentsProviderMedia &&
      getLectureMedia()?.mediaContents.contentsProvider.contentsProviderType.name === "Linked in"
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
