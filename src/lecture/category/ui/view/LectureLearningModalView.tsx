import React, {Component} from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Modal } from 'semantic-ui-react';


interface Props {
  videoUrl?: string
  onClose?: ()=>void
}

@reactAutobind
class LectureLearningModalView extends Component<Props> {

  state = {
    open : true
  };

  handleClick = () => {
    this.setState({ open : true });
  };

  handleClose = () => {
    const { onClose } = this.props;

    this.setState({ open : false });

    if (onClose) {
      onClose();
    }
  };

  render() {

    const { videoUrl } = this.props;

    return(
      <Modal className="base w1000 video-class" open={this.state.open} onClose={this.handleClose}>
        <Modal.Header>
          동영상 학습 후 &quot;Close&quot;버튼을 클릭하시면 학습이력이 즉시 반영됩니다.
          <div className="right-btn">
            <Button className="close" onClick={this.handleClose}>Close</Button>
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
