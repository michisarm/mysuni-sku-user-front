import React, { Fragment } from 'react';
import {
  Button,
  Form,
  Modal,
  TextArea,
  TextAreaProps,
} from 'semantic-ui-react';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
  onChangeCommunityCompanionProps: (name: string, value: any) => void;
}

class CommunityMemberCompanionModal extends React.Component<Props> {
  //

  render() {
    const {
      open,
      handleClose,
      handleOk,
      onChangeCommunityCompanionProps,
    } = this.props;

    return (
      <>
        <Fragment>
          <Modal open={open} onClose={handleClose} className="base w700">
            <Modal.Header>
              <span>반려 사유</span>
            </Modal.Header>
            <Modal.Content className="admin_popup_reject">
              <h5>반려 사유를 입력해주세요.</h5>
              <p>
                입력된 반려 사유는 E-mail을 통해 발송되며, 발송된 내용은
                수정하실 수 없습니다.
              </p>
              <Form>
                <Form.Field>
                  <div className="ui right-top-count input admin-popup-textarea">
                    <TextArea
                      placeholder="반려 사유를 입력해주세요."
                      // value={studentRequestCdo && studentRequestCdo.remark || ''}
                      onChange={(
                        e: React.FormEvent<HTMLTextAreaElement>,
                        data: TextAreaProps
                      ) =>
                        onChangeCommunityCompanionProps(
                          'remark',
                          `${data.value}`
                        )
                      }
                      rows={5}
                    />
                  </div>
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions className="actions2">
              <Button className="pop2 d" onClick={handleClose}>
                취소
              </Button>
              <Button className="pop2 p" onClick={handleOk}>
                발송
              </Button>
            </Modal.Actions>
          </Modal>
        </Fragment>
      </>
    );
  }
}

export default CommunityMemberCompanionModal;
