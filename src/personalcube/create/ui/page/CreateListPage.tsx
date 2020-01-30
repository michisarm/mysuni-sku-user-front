
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import { LectureService } from 'lecture';

import routePaths from '../../../routePaths';
import CreateProfileContainer from '../logic/CreateProfileContainer';
import CreateListContainer from '../logic/CreateListContainer';
import SharedListContainer from '../logic/CreateSharedListContainer';


interface Props extends RouteComponentProps<RouteParams> {
  lectureService?: LectureService,
}

interface RouteParams {
  tab: string
}

@inject(mobxHelper.injectFrom('lecture.lectureService'))
@observer
@reactAutobind
class CreateListPage extends Component<Props> {
  //
  getTabs() {
    //
    const { lectures } = this.props.lectureService!;

    return [
      {
        name: 'Create',
        item: 'Create',
        render: () => <CreateListContainer />,
      },
      {
        name: 'Shared',
        item: <>Shared<span className="count">{lectures.length}</span></>,
        render: () => <SharedListContainer />,
      },
    ];
  }

  onChangeTab(tab: TabItemModel) {
    //
    this.props.history.push(routePaths.createTab(tab.name));
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
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(CreateListPage);
