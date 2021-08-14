import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

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
        <Modal.Header>
          <PolyglotText
            id="Certification-alert-발급안내"
            defaultString="Badge 발급 안내"
          />
        </Modal.Header>
        <Modal.Content>
          <div className="content-wrap6">
            <div className="test-report-cont">
              <PolyglotText
                id="Certification-alert-발급안내M"
                defaultString="해당 Badge는 모든 학습이 완료되면 발급요청을 하실 수 있습니다."
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 p" onClick={onClick}>
            <PolyglotText
              id="Certification-alert-confirm"
              defaultString="Confirm"
            />
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
