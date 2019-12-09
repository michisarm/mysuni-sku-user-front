import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { PostListContainer, PostContainer } from './index';

class Routes extends React.PureComponent<RouteComponentProps> {

  render() {
    const {
      match,
    } = this.props;

    return (
      <React.Fragment>
        <Route exact path={match.path} component={PostListContainer} />
        <Route exact path={`${match.path}/:id`} component={PostContainer} />
      </React.Fragment>
    );
  }
}

export default Routes;
