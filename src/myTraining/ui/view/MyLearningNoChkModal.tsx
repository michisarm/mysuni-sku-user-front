import React, { memo } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  open: boolean;
  onConfirm: () => void;
}

function MyLearningNoChkModal(props: Props) {
  const { open, onConfirm } = props;

  return (
    <Modal className="base w380" open={open}>
      <Modal.Header className="header">
        <PolyglotText
          defaultString="리스트 숨김 안내"
          id="Learning-리스트숨김-타이틀4"
        />
      </Modal.Header>
      <Modal.Content className="content">
        <div className="list-hide-guide">
          <p>
            <strong>
              <PolyglotText
                defaultString="숨김처리 하실 과정을 선택해주세요."
                id="Learning-리스트숨김-숨김과정"
              />
            </strong>
          </p>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onConfirm}>
          <PolyglotText defaultString="확인" id="Learning-리스트숨김-확인" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default memo(MyLearningNoChkModal);
