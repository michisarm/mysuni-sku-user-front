import { srcParser } from 'community/ui/components/Image';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import React, { useMemo } from 'react';
import { Button, Icon, Modal, Image } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

import { onCloseRecommendMemberPopUp } from './recommendMemberPopUp.events';
import { useRequestRecommendMemberPopUp } from './recommendMemberPopUp.request';
import {
  useIsOpenRecommendMemberPopUp,
  useRecommendMemberPopUp,
} from './recommendMemberPopUp.store';

interface RecommendMemberPopUpViewProps {
  playlistType: PlaylistType;
}

export function RecommendMemberPopUpView({
  playlistType,
}: RecommendMemberPopUpViewProps) {
  useRequestRecommendMemberPopUp(playlistType);

  const isOpen = useIsOpenRecommendMemberPopUp();
  const recommendMemberPopUp = useRecommendMemberPopUp();

  const modalTitle = useMemo(() => {
    switch (playlistType) {
      case 'MadeByOthers':
        return getPolyglotText('담아간 구성원', 'playlist-popup-담아간수');
      case 'Recommended':
        return getPolyglotText('추천받은 구성원', 'playlist-popup-추천받은수');
    }
  }, [playlistType]);

  return (
    <Modal open={isOpen} className="base w500 pl-share-user">
      <Modal.Header className="res xfl">
        <span>{modalTitle}</span>{' '}
        <strong>
          {recommendMemberPopUp.length}
          <PolyglotText defaultString="명" id="playlist-popup-선택명수" />
        </strong>
        <Button className="close24" onClick={onCloseRecommendMemberPopUp}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        <div className="inner scrolling-40vh">
          <div className="sh-user-list">
            {recommendMemberPopUp.map((member) => (
              <div className="user-prf">
                <div className="ui profile">
                  <div className="pic s48">
                    <Image
                      src={srcParser(member.photoImagePath)}
                      alt="프로필사진"
                    />
                  </div>
                  <div className="prf-info">
                    <div className="info-top">
                      <strong className="prf-name">{member.name}</strong>
                      <span className="prf-comp">{member.departmentName}</span>
                      <span className="prf-group">{`/ ${member.companyName}`}</span>
                    </div>
                    <span className="prf-email">{member.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button className="w190 pop p" onClick={onCloseRecommendMemberPopUp}>
          <PolyglotText defaultString="확인" id="playlist-popup-확인버튼" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
