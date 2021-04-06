import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface ChallengeBadgeAlertModalProps {
  open: boolean;
  onClick: () => void;
}
export default function ChallengeBadgeAlertModal({
  open,
  onClick,
}: ChallengeBadgeAlertModalProps) {
  return (
    <>
      <Modal className="base w380" open={open}>
        <Modal.Header>Badge 발급 안내</Modal.Header>
        <Modal.Content>
          <div className="content-wrap6">
            <div className="test-report-cont">
              해당 Badge는 모든 학습이 완료되면 발급요청을 하실 수 있습니다.
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 p" onClick={onClick}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
