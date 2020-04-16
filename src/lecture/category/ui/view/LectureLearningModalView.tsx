import React, {Component} from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Modal } from 'semantic-ui-react';


interface Props {
  videoUrl?: string
}

interface States {
  open: boolean
}

@reactAutobind
class LectureLearningModalView extends React.Component<Props, States> {

  state = {
    open : false
  };

  onOpenModal() {
    this.setState({ open : true });
  }

  onCloseModal() {
    this.setState({ open : false });
  }

  render() {

    const { open } = this.state;
    const { videoUrl } = this.props;

    console.log('videoUrl : ' + videoUrl);

    return(
      <Modal className="base w1000 video-class" open={open} onOpen={this.onOpenModal} onClose={this.onCloseModal}>
        <Modal.Header>
          동영상 학습 후 &quot;Close&quot;버튼을 클릭하시면 학습이력이 즉시 반영됩니다.
          <div className="right-btn">
            <Button className="close" onClick={this.onCloseModal}>Close</Button>
          </div>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="video">
              <iframe
                // title="video type"
                // src="https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?pid=e010bf1f-96cd-4a58-a216-ab360084ee2c"
                title={videoUrl}
                src={videoUrl}
                width="100%"
                height="562"
                style={{padding: '0px', border: '0px'}}
                frameBorder="0"
                allowFullScreen
                allow="autoplay"
              />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}
export default LectureLearningModalView;
