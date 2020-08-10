
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import classNames from 'classnames';
import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import MySuniView from '../view/MySuniView';
import CollegeView from '../view/CollegeView';
import CertificationView from '../view/CertificationView';


interface Props extends RouteComponentProps<RouteParams> {
}

interface RouteParams {
  tab: ContentType
}

enum ContentType {
  MySuni = 'MySuni',
  College = 'College',
  Certification = 'Certification',
}

enum ContentTypeName {
  MySuni = 'mySUNI 소개',
  College = 'College 소개',
  Certification = '인증제도 소개',
}


@reactAutobind
@observer
class UserMainPage extends Component<Props> {
  //
  getTabs() {
    //
    return [
      {
        name: ContentType.MySuni,
        item: ContentTypeName.MySuni,
        render: () => <MySuniView />,
      },
      {
        name: ContentType.College,
        item: ContentTypeName.College,
        render: () => <CollegeView />,
      },
      {
        name: ContentType.Certification,
        item: ContentTypeName.Certification,
        render: () => <CertificationView />,
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel): string {
    //
    this.props.history.push(routePaths.introductionTab(tab.name));

    return routePaths.introductionTab(tab.name);
  }

  renderTabContent(props : any) {
    //
    return (
      <div className={classNames('ui tab', { active: props.active })}>
        {props.tab.render(props)}
      </div>
    );
  }

  render() {
    //
    const { params } = this.props.match;

    return (
      <ContentLayout
        className="bg-white introduction"
        breadcrumb={[
          { text: 'Introduction' },
          { text: ContentTypeName[params.tab] },
        ]}
      >
        <Tab
          large
          className="tab-menu2 offset0"
          defaultActiveName={params.tab}
          tabs={this.getTabs()}
          onChangeTab={this.onChangeTab}
          renderContent={this.renderTabContent}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(UserMainPage);
