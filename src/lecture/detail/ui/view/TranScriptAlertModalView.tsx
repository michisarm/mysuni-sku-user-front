import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface props {
  open: boolean;
  onClickOk: () => void;
}

export function TranScriptAlertModalView({ open, onClickOk }: props) {
  //
  return (
    <>
      <Modal className="base w700" open={open}>
        <Modal.Header className="header">안내</Modal.Header>
        <Modal.Content className="content">
          <div
            className="list-hide-guide"
            dangerouslySetInnerHTML={{
              __html:
                '본 Transcript 파일은 학습의 목적으로 사내 한하여 활용 부탁드리며, <strong>외부 공유를 제한</strong>합니다.',
            }}
          />
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="pop2 d" onClick={onClickOk}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
