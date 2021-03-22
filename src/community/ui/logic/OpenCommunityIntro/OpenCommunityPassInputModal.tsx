import React, { useState, useCallback, memo } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

interface Props {
  managerName: string;
  managerEmail: string;
  open: boolean;
  handleClose: () => void;
  onConfirmModal: (secret: string) => void;
}
function OpenCommunityPassInputModal(props: Props) {
  //

  const {
    managerName,
    managerEmail,
    open,
    handleClose,
    onConfirmModal,
  } = props;
  const [secret, setSecret] = useState<string>('');
  /* handlers */
  const onChangeSecret = useCallback((e: any) => {
    setSecret(e.target.value);
  }, []);

  return (
    <>
      <Modal open={open} onClose={handleClose} className="base w380">
        <Modal.Header>
          <span>비밀번호</span>
        </Modal.Header>
        <Modal.Content className="admin_popup_reject">
          <h4>
            해당 커뮤니티에 입장하기 위해서는 <br />
            비밀번호가 필요합니다.
          </h4>
          <Form>
            <Form.Field>
              <input
                type="password"
                className="commu_pw_form"
                placeholder={remarkPlaceholder}
                onChange={onChangeSecret}
                maxLength={4}
              />
            </Form.Field>
          </Form>
          <a href={`mailto:${managerEmail}`} target="_blank">
            {/*임시로 김동구과장 메일 주소 기입*/}
            관리자에게 문의하기
          </a>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={handleClose}>
            취소
          </Button>
          <Button className="pop2 p" onClick={() => onConfirmModal(secret)}>
            확인
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default OpenCommunityPassInputModal;
/* globals */
const remarkPlaceholder = `비밀번호를 입력해주세요.`;
