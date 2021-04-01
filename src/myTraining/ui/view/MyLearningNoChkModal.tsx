import React, { memo } from 'react';
import { Button, Modal } from 'semantic-ui-react';

interface Props {
  open: boolean;
  onConfirm: () => void;
}

function MyLearningNoChkModal(props: Props) {
  const { open, onConfirm } = props;

  return (
    <Modal className="base w380" open={open}>
      <Modal.Header className="header">
        리스트 숨김 안내
      </Modal.Header>
      <Modal.Content className="content">
        <div className="list-hide-guide">
          <p>
            <strong>숨김처리 하실 과정을 선택해주세요.</strong>
          </p>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onConfirm}>확인</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default memo(MyLearningNoChkModal);
