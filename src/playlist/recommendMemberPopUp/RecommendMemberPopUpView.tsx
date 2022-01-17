import { PlaylistType } from 'playlist/data/models/PlaylistType';
import React, { useMemo } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import Image from '../../shared/components/Image/Image';
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
        return '담아간 구성원';
      case 'Recommended':
        return '추천받은 구성원';
    }
  }, [playlistType]);

  return (
    <Modal open={isOpen} className="base w500 pl-share-user">
      <Modal.Header className="res xfl">
        <span>{modalTitle}</span>
        <strong>{recommendMemberPopUp.length}명</strong>
        <Button className="close24" onClick={onCloseRecommendMemberPopUp}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        {recommendMemberPopUp.map((member) => (
          <div className="inner scrolling-60vh">
            <div className="sh-user-list">
              <div className="user-prf">
                <div className="ui profile">
                  <div className="pic s48">
                    <Image src={member.thumbnailImage} alt="프로필사진" />
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
            </div>
          </div>
        ))}
      </Modal.Content>
      <Modal.Actions>
        <Button className="w190 pop p" onClick={onCloseRecommendMemberPopUp}>
          확인
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
