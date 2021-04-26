import React, { memo } from 'react';
import { Button, Modal } from 'semantic-ui-react';

interface Props {
  open: boolean;
  onConfirm: () => void;
}

function MyLearningDeleteFinishModal(props: Props) {
  const { open, onConfirm } = props;

  return (
    <Modal className="base w380" open={open}>
      <Modal.Header className="header">
        리스트 숨김 안내
      </Modal.Header>
      <Modal.Content className="content">
        <div className="list-hide-guide">
          <p>
            선택 한 과정이 숨김 처리되었습니다.
          </p>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onConfirm}>확인</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default memo(MyLearningDeleteFinishModal);
