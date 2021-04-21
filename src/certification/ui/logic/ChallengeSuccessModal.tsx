import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeView from '../view/BadgeView';
import { Badge } from '../../model/Badge';
import { MyBadge } from '../../model/MyBadge';

interface ChallengeSuccessModalProps {
  badge?: Badge | MyBadge;
  categoryId: string;
  successModal: boolean;
  onClose: () => void;
}

function ChallengeSuccessModal({
  badge,
  categoryId,
  successModal,
  onClose,
}: ChallengeSuccessModalProps) {
  const badgeName = (badge && badge.name) || '';

  return (
    <Modal open={successModal} className="base w588">
      <Modal.Header>Badge 획득 알림</Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p01">
            {badge !== undefined && (
              <BadgeView
                id={badge.id}
                name={badge.name}
                level={badge.level}
                iconUrl={badge.iconUrl}
                categoryId={categoryId}
                badgeStyle={BadgeStyle.Detail}
                badgeSize={BadgeSize.Small}
              />
            )}

            <div className="t1">축하합니다</div>
            <div className="t2">‘{badgeName}’</div>
            <div className="t3">Badge가 발급되었습니다.</div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onClose}>
          확인
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ChallengeSuccessModal;
