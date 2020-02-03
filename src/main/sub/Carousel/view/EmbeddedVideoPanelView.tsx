
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';


interface Props {
  url: string
}

@reactAutobind
@observer
class EmbeddedVideoPanelView extends Component<Props> {
  //
  render() {
    //
    const { url } = this.props;

    return (
      <div className="panopto">
        <iframe
          title="video type"
          src={url}
          width="600"
          height="420"
          style={{ padding: '0px', border: '0px' }}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }
}

export default EmbeddedVideoPanelView;
