import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface IssueCancelModalProps {
  cancelModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function IssueCancelModal({
  cancelModal,
  onClose,
  onConfirm,
}: IssueCancelModalProps) {
  return (
    <Modal open={cancelModal} className="base w380">
      <Modal.Header>
        <PolyglotText
          id="Certification-issuecancel-발급취소알림"
          defaultString="발급 요청 취소 알림"
        />
      </Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p02">
            <div className="tt">
              <PolyglotText
                id="Certification-issuecancel-발급취소1"
                defaultString="Badge 발급 요청을 취소하시겠습니까?"
              />
            </div>
            <PolyglotText
              id="Certification-issuecancel-발급취소2"
              defaultString="발급 요청을 취소해도 이수하신 학습과정은 영향이 없습니다."
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 d" onClick={onClose}>
          <PolyglotText
            id="Certification-issuecancel-취소"
            defaultString="취소"
          />
        </Button>
        <Button className="pop2 p" onClick={onConfirm}>
          <PolyglotText
            id="Certification-issuecancel-확인"
            defaultString="확인"
          />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
