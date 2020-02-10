
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ContentLayout, Tab, TabItemModel } from 'shared';

import routePaths from '../../../routePaths';
import CreateProfileContainer from '../logic/CreateProfileContainer';
import CreateListContainer from '../logic/CreateListContainer';
import SharedListContainer from '../logic/SharedListContainer';


interface Props extends RouteComponentProps<RouteParams> {
}

interface State {
  createCount: number
  sharedCount: number
}

interface RouteParams {
  tab: string
}

@observer
@reactAutobind
class CreateListPage extends Component<Props, State> {
  //
  state = {
    createCount: 0,
    sharedCount: 0,
  };


  getTabs() {
    //
    const { createCount, sharedCount } = this.state;

    return [
      {
        name: 'Create',
        item: (
          <>
            Create
            <span className="count">{createCount > 0 ? `+${createCount}` : createCount}</span>
          </>
        ),
        render: () => (
          <CreateListContainer
            onChangeCreateCount={this.onChangeCreateCount}
          />
        ),
      },
      {
        name: 'Shared',
        item: (
          <>
            Shared
            <span className="count">{sharedCount > 0 ? `+${sharedCount}` : sharedCount}</span>
          </>
        ),
        render: () => (
          <SharedListContainer
            onChangeSharedCount={this.onChangeSharedCount}
          />
        ),
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel) {
    //
    this.props.history.push(routePaths.createTab(tab.name));
  }

  onChangeCreateCount(createCount: number) {
    this.setState({ createCount });
  }

  onChangeSharedCount(sharedCount: number) {
    //
    this.setState({ sharedCount });
  }

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
        <CreateProfileContainer />

        <Tab
          allMounted
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(CreateListPage);