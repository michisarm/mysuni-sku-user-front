
import React, {useState} from 'react';
import {Modal, Button} from 'semantic-ui-react';


const ChallengeBadgeCompanionModal = () => {
  //
  const [ modalOpen, setModalOpen ] = useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button className="fix line">발급요청</Button>

      <Modal
        className="base w380"
        open={modalOpen}
      >
        <Modal.Header>Badge 발급 안내</Modal.Header>
        <Modal.Content>
          <div className="content-wrap6">
            <div className="test-report-cont">
              해당 Badge는 모든 학습이 완료되면 발급요청을 하실 수 있습니다.
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 p" onClick={modalClose}>Confirm</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ChallengeBadgeCompanionModal;
