
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ContentLayout } from 'shared';
import IntroductionContainer from '../../sub/Introduction';


interface Props extends RouteComponentProps {
}

@reactAutobind
@observer
class UserMainPage extends Component<Props> {
  //
  render() {
    //
    return (
      <ContentLayout
        className="bg-white introduction"
        breadcrumb={[
          { text: 'Introduction' },
        ]}
      >
        <IntroductionContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(UserMainPage);
