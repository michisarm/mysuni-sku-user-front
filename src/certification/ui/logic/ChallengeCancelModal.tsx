
import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

interface Props {
  cancelModal: boolean,
  onCancel: () => void
}

const ChallengeCancelModal: React.FC<Props> = (Props) => {
  //
  const { cancelModal, onCancel } = Props;

  return (
    <Modal open={cancelModal} className="base w380">
      <Modal.Header>도전 취소 알림</Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p02">
            <div className="tt">Badge획득 도전을 취소하시겠습니까?</div>
            학습 완료 내역은 재도전시,<br/>다시 학습 하실 필요가 없습니다.
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 d" onClick={onCancel}>취소</Button>
        <Button className="pop2 p">확인</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ChallengeCancelModal;
