
import React from 'react';
import {Modal, Button} from 'semantic-ui-react';
import {Badge} from '../../shared/Badge';

import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeDetailModel from '../model/BadgeDetailModel';

interface Props {
  badge: BadgeDetailModel,
  successModal: boolean,
  onCloseSuccessModal: () => void,
}

const ChallengeSuccessModal: React.FC<Props> = (Props) => {
  //
  const { badge, successModal, onCloseSuccessModal } = Props;

  return (
    <Modal open={successModal} className="base w588">
      <Modal.Header>Badge 획득 알림</Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p01">
            <Badge
              badge={badge}
              badgeStyle={BadgeStyle.Detail}
              badgeSize={BadgeSize.Small}
            />
            <div className="t1">축하합니다</div>
            <div className="t2">‘{badge.name}’</div>
            <div className="t3">Badge가 발급되었습니다.</div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onCloseSuccessModal}>확인</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ChallengeSuccessModal;
