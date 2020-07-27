import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';

interface Props {
  includeUrl: string,
  bannerTitle: string,
  modalOpen: boolean,
  onClose: ()=>void
}

class MainBannerModal extends Component<Props> {
  //
  state = {
    open: this.props.modalOpen,
  };

  closeMainBannerModal = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    //
    const { includeUrl, bannerTitle, onClose } = this.props;
    const { open } = this.state;

    return (
      <Modal open={open} onClose={onClose} closeOnDimmerClick={false} className="base w1000">
        <Modal.Header>{bannerTitle}</Modal.Header>
        <Modal.Content>
          <div>
            Anchor Target이 Video, Popup 인 경우, 본 팝업을 띄웁니다.<br/>
            <strong>팝업에 대한 정의가 부족합니다.</strong>
            <iframe src={includeUrl} title={bannerTitle} width={100} height={100} className="sample_iframe"/>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={this.closeMainBannerModal}>아니오</Button>
          <Button className="pop2 p" onClick={this.closeMainBannerModal}>네</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MainBannerModal;
