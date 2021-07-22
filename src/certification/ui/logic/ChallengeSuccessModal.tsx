import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeView from '../view/BadgeView';
import { Badge } from '../../model/Badge';
import { MyBadge } from '../../model/MyBadge';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

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
      <Modal.Header>
        <PolyglotText
          id="Certification-ChallengetGetModal-획득알림"
          defaultString="Badge 획득 알림"
        />
      </Modal.Header>
      <Modal.Content>
        <div
          className="content-wrap6"
          style={{
            textAlign: 'center',
          }}
        >
          <div className="badge-list-type">
            {badge !== undefined && (
              <ul>
                <li
                  style={{
                    margin: '0 auto 1.75rem',
                    float: 'none',
                  }}
                >
                  <BadgeView
                    id={badge.id}
                    name={badge.name}
                    level={badge.level}
                    iconUrl={badge.iconUrl}
                    categoryId={categoryId}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                </li>
              </ul>
            )}
            <div className="t1">
              <PolyglotText
                id="Certification-ChallengetGetModal-축하"
                defaultString="축하합니다"
              />
            </div>
            <div className="t2">‘{badgeName}’</div>
            <div className="t3">
              <PolyglotText
                id="Certification-ChallengetGetModal-발급"
                defaultString="Badge가 발급되었습니다."
              />
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onClose}>
          <PolyglotText
            id="Certification-ChallengetGetModal-확인"
            defaultString="확인"
          />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ChallengeSuccessModal;
