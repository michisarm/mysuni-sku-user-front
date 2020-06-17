import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ActionLogService } from 'shared/stores';
import { ContentLayout, Tab, TabItemModel } from 'shared';

import routePaths from '../../../routePaths';
import CreateProfileContainer from '../logic/CreateProfileContainer';
import CreateListContainer from '../logic/CreateListContainer';
import SharedListContainer from '../logic/SharedListContainer';

interface Props extends RouteComponentProps<RouteParams> {
  actionLogService?: ActionLogService;
}

interface State {
  createCount: number;
  sharedCount: number;
}

interface RouteParams {
  tab: string;
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
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
            <span className="count">
              {createCount > 0 ? `+${createCount}` : createCount}
            </span>
          </>
        ),
        render: () => (
          <CreateListContainer onChangeCreateCount={this.onChangeCreateCount} />
        ),
      },
      {
        name: 'Shared',
        item: (
          <>
            Shared
            <span className="count">
              {sharedCount > 0 ? `+${sharedCount}` : sharedCount}
            </span>
          </>
        ),
        render: () => (
          <SharedListContainer onChangeSharedCount={this.onChangeSharedCount} />
        ),
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel) {
    //
    const { actionLogService, history } = this.props;
    actionLogService?.registerClickActionLog({ subAction: tab.name });
    history.push(routePaths.createTab(tab.name));
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
        breadcrumb={[{ text: 'Create' }, { text: `${params.tab}` }]}
      >
        <CreateProfileContainer />

        <Tab
          allMounted // true 이면 map 돌려서 tab 세팅
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(CreateListPage);
