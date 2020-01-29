
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ContentLayout } from 'shared';
import CreateListContainer from '../logic/CreateListContainer';


interface Props extends RouteComponentProps<RouteParams> {
}

interface RouteParams {
  tab: string
}

@observer
@reactAutobind
class CreateListPage extends Component<Props> {
  //
  render() {
    //
    const { params } = this.props.match;

    return (
      <ContentLayout
        className="create"
        breadcrumb={[
          { text: 'Create' },
          { text: `${params.tab}` },
        ]}
      >
        <CreateListContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(CreateListPage);
