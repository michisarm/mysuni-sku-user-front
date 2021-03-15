import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props extends RouteComponentProps {
  loading?: boolean | false;
  color?: string | '#f4f7fd';
}

@reactAutobind
@observer
class Loadingpanel extends Component<Props> {
  render() {
    const { loading, color } = this.props;
    //
    return (
      <>
        <Dimmer
          active={loading}
          inverted
          style={{ background: color === undefined ? '#f4f7fd' : color }}
        >
          <Loader size="medium" content="Waiting" />
        </Dimmer>
      </>
    );
  }
}

export default withRouter(Loadingpanel);
