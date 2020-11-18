import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import SearchAllFilterDisable from './index';

class Routes extends React.PureComponent {
  //
  render() {
    //
    return(
      <Switch>
        <Route exact path="/search" component={SearchAllFilterDisable} />
      </Switch>
    );
  }
}

export default Routes;