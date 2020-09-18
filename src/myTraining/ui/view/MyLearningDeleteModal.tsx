import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function MyLearningDeleteModal(props: Props) {
  const { open, onClose, onConfirm } = props;

  return (
    <>
      {open && (
        <Modal className="base w380" open={open}>
          <Modal.Header className="header">
            리스트 숨김 안내
          </Modal.Header>
          <Modal.Content className="content">
            <div className="list-hide-guide">
              <p>
                선택하신 항목들은 학습 중 리스트에서 삭제되지만 삭제된 학습을 다시 진행하게 되면 리스트에 다시 노출 됩니다.
                <br />
                <br />
                <strong>리스트를 숨김 처리 하시겠습니까?</strong>
              </p>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={onClose}>아니요</Button>
            <Button className="pop2 p" onClick={onConfirm}>예</Button>
          </Modal.Actions>
        </Modal>
      )
      }
    </>
  );
}

export default MyLearningDeleteModal;
