import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface Props {
  badgeName: string;
  alertModal: boolean;
  onCloseAlertModal: () => void;
}

const ChallengeAlertModal: React.FC<Props> = (Props) => {
  //
  const { badgeName, alertModal, onCloseAlertModal } = Props;

  return (
    <Modal open={alertModal} className="base w380">
      <Modal.Header>
        <PolyglotText
          id="Certification-ChallengetStartModal-도전알림"
          defaultString="Badge 도전 알림"
        />
      </Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p02">
            <div className="tt">
              <PolyglotText
                id="Certification-ChallengetStartModal-도전시작"
                defaultString="‘${badgeName}’ Badge 도전이 시작되었습니다."
                values={{ badgeName }}
              />
            </div>
            <PolyglotText
              id="Certification-ChallengetStartModal-뱃지탭"
              defaultString="‘도전 중 Badge’ 탭을 통해 Learning Path에 따라 학습해주세요."
            />
            <p />
            <PolyglotText
              id="Certification-ChallengetStartModal-도전문의"
              defaultString="뱃지 도전관련 문의는 담당자에게 연락 부탁드립니다."
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onCloseAlertModal}>
          <PolyglotText
            id="Certification-ChallengetStartModal-확인"
            defaultString="확인"
          />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ChallengeAlertModal;
