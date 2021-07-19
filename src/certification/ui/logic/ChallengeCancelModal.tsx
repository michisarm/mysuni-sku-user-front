import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface ChallengeCancelModalProps {
  cancelModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ChallengeCancelModal({
  cancelModal,
  onClose,
  onConfirm,
}: ChallengeCancelModalProps) {
  return (
    <Modal open={cancelModal} className="base w380">
      <Modal.Header>
        <PolyglotText
          id="Certification-ChallengetCancelModal-알림"
          defaultString="도전 취소 알림"
        />
      </Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p02">
            <div className="tt">
              <PolyglotText
                id="Certification-ChallengetCancelModal-취소묻기"
                defaultString="Badge 획득 도전을 취소하시겠습니까?"
              />
            </div>
            <PolyglotText
              id="Certification-ChallengetCancelModal-영향없음"
              defaultString="도전을 취소해도 이수하신 학습과정은 영향이 없습니다."
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 d" onClick={onClose}>
          <PolyglotText
            id="Certification-ChallengetCancelModal-취소"
            defaultString="취소"
          />
        </Button>
        <Button className="pop2 p" onClick={onConfirm}>
          <PolyglotText
            id="Certification-ChallengetCancelModal-확인"
            defaultString="확인"
          />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
