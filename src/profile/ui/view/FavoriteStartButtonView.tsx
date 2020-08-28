import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import routePaths from '../../routePaths';

@observer
@reactAutobind
class FavoriteStartButtonView extends Component {
  render() {
    //
    return (
      <Link to={routePaths.currentJob()}>
        <Button className="fix bg">Start</Button>
      </Link>
    );
  }
}

export default FavoriteStartButtonView;
