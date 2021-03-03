import React, { Fragment } from 'react';
import {
  Button,
  Form,
  Modal,
  TextArea,
  TextAreaProps,
} from 'semantic-ui-react';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
  useOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import OpenCommunityItem from '../../../viewModel/OpenCommunityIntro/OpenCommunityItem';
import {
  requestAppendOpenCommunityList,
  requestOpenCommunityList,
} from '../../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';

interface Props {
  managerName: string;
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
}

class OpenCommunityPassInputModal extends React.Component<Props> {
  //
  render() {
    const { managerName, open, handleClose, handleOk } = this.props;

    return (
      <>
        <Fragment>
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
                  <input type="password" className="commu_pw_form" />
                </Form.Field>
              </Form>
              <a href="mailto:bbonggu92@gmail.com">
                {/*임시로 김동구과장 메일 주소 기입*/}
                {managerName}관리자에게 문의하기
              </a>
            </Modal.Content>
            <Modal.Actions className="actions2">
              <Button className="pop2 d" onClick={handleClose}>
                취소
              </Button>
              <Button className="pop2 p" onClick={handleOk}>
                확인
              </Button>
            </Modal.Actions>
          </Modal>
        </Fragment>
      </>
    );
  }
}

export default OpenCommunityPassInputModal;
