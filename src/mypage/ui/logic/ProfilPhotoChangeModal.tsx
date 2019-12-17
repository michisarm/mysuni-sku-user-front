import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Modal } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

interface Props {
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
}
interface States {
  open : boolean
}

@inject('skProfileService')
@observer
@reactAutobind
class ProfilPhotoChangeModal extends Component<Props, States> {


  constructor(props:Props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  show() {
    this.setState({
      open: true,
    });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { size } = this.props;
    const { open } = this.state;

    return (
      <>
        <Modal size={size} open={open} onClose={this.close} className="base w380">

          <Modal.Header className="res">
            프로필 사진 변경
          </Modal.Header>
          <Modal.Content>
            <div className="profile-change">
              <div className="left">
                <div className="ui profile">
                  <div className="pic s110">
                    <img src="" alt="" id="blah" />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="text01">김유니</div>
                <div className="text02">SK C&C</div>
                <div className="text02">플랫폼 개발 1팀</div>
                <div className="upload">
                  <input type="file" id="profileImage" />
                  <label htmlFor="profileImage" className="ui orange-arrow3 button">Image
                    upload
                  </label>
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={this.close}>Cancel</Button>
            <Button className="pop2 p" onClick={this.close}>Confirm</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ProfilPhotoChangeModal;
