import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';

interface Props extends RouteComponentProps {
  loading?: boolean | false;
  heights?: number;
}

@reactAutobind
@observer
class Loadingpanel extends Component<Props> {
  render() {
    const { loading, heights } = this.props;
    //
    return (
      <>
        {loading && (
          <Segment style={{ height: heights ? heights : 418 }}>
            <Dimmer active={loading} inverted>
              <Loader size="medium" content="Waiting" />
              {/* <div className="no-cont-wrap" /> */}
              <NoSuchContentPanel message="" />
            </Dimmer>
          </Segment>
        )}
      </>
    );
  }
}

export default withRouter(Loadingpanel);
