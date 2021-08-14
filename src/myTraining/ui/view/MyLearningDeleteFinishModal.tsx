import React, { memo } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  open: boolean;
  onConfirm: () => void;
}

function MyLearningDeleteFinishModal(props: Props) {
  const { open, onConfirm } = props;

  return (
    <Modal className="base w380" open={open}>
      <Modal.Header className="header">
        <PolyglotText
          defaultString="리스트 숨김 안내"
          id="Learning-리스트숨김-타이틀1"
        />
      </Modal.Header>

      <Modal.Content className="content">
        <div className="list-hide-guide">
          <p>
            <PolyglotText
              defaultString="선택 한 과정이 숨김 처리되었습니다."
              id="Learning-리스트숨김-숨김완료"
            />
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

export default memo(MyLearningDeleteFinishModal);
