import React, { useState, useCallback, memo } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import AplService from 'myTraining/present/logic/AplService';

interface Props {
  open: boolean;
  onCloseModal: () => void;
  onConfirmModal: (remark: string) => void;
  aplService?: AplService;
}

function ApprovalRejectModal(props: Props) {
  const { open, onCloseModal, onConfirmModal } = props;
  const [remark, setRemark] = useState<string>('');

  /* handlers */
  const onChangeRemark = useCallback((e: any) => {
    setRemark(e.target.value);
  }, []);

  /* render */
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      className="base w700"
    >
      <Modal.Header>반려 사유 등록</Modal.Header>
      <Form className="base">
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap6">
              <textarea
                placeholder={remarkPlaceholder}
                value={remark}
                onChange={onChangeRemark}
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={onCloseModal}>취소</Button>
          <Button className="pop2 p" onClick={() => onConfirmModal(remark)}>반려</Button>
        </Modal.Actions>
      </Form>
    </Modal >
  );
}

export default memo(ApprovalRejectModal);

/* globals */
const remarkPlaceholder = `반려 사유를 입력해주세요. 
(입력된 반려 사유는 E-mail을 통해 전달되며, 등록된 내용은 수정하실 수 없습니다.)`;