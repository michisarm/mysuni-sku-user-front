import React, { memo } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function MyLearningDeleteModal(props: Props) {
  const { open, onClose, onConfirm } = props;

  return (
    <Modal className="base w380" open={open}>
      <Modal.Header className="header">
        <PolyglotText
          defaultString="리스트 숨김 안내"
          id="Learning-리스트숨김-타이틀2"
        />
      </Modal.Header>
      <Modal.Content className="content">
        <div className="list-hide-guide">
          <p>
            <PolyglotText
              defaultString="선택하신 항목들은 학습 중 리스트에서 삭제되지만 삭제된 학습을 다시 진행하게 되면 리스트에 다시 노출 됩니다."
              id="Learning-리스트숨김-노출안내"
            />
            <br />
            <br />
            <strong>
              <PolyglotText
                defaultString="리스트를 숨김 처리 하시겠습니까?"
                id="Learning-리스트숨김-숨김질문"
              />
            </strong>
          </p>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 d" onClick={onClose}>
          <PolyglotText
            defaultString="아니요"
            id="Learning-리스트숨김-아니요"
          />
        </Button>
        <Button className="pop2 p" onClick={onConfirm}>
          <PolyglotText defaultString="예" id="Learning-리스트숨김-예" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default memo(MyLearningDeleteModal);
