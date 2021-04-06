
import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

interface ChallengeCancelModalProps {
  cancelModal: boolean,
  onClose: () => void,
  onConfirm: () => void
}

export default function ChallengeCancelModal({
  cancelModal,
  onClose,
  onConfirm,
}: ChallengeCancelModalProps) {

  return (
    <Modal open={cancelModal} className="base w380">
      <Modal.Header>도전 취소 알림</Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p02">
            <div className="tt">Badge 획득 도전을 취소하시겠습니까?</div>
            도전을 취소해도 이수하신 학습과정은 영향이 없습니다.
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 d" onClick={onClose}>취소</Button>
        <Button className="pop2 p" onClick={onConfirm}>확인</Button>
      </Modal.Actions>
    </Modal>
  );
}