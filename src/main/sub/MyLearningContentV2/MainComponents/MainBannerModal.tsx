import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

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
      <Modal open={open} onClose={onClose} closeOnDimmerClick={false} className="base w700">
        <Modal.Header>
          {bannerTitle}
          <div className="right-btn">
            <Button className="close" onClick={this.closeMainBannerModal}>
              <PolyglotText defaultString="Close" id="home-mb-닫기버튼" />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh popup-banner-video">
            <div className="video">
              <iframe src={includeUrl} title={bannerTitle} width={100} height={100} />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MainBannerModal;
