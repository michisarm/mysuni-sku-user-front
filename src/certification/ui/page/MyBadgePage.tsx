import React, {Component} from 'react';
import {mobxHelper, reactAutobind} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router';

import {ActionLogService} from 'shared/stores';
import {ContentLayout, Tab, TabItemModel} from 'shared';
import routePaths from '../../routePaths';
import MyBadgeContentType from '../model/MyBadgeContentType';

import AllBadgeListContainer from '../logic/AllBadgeListContainer';
import EarnedBadgeListContainer from '../logic/EarnedBadgeListContainer';


interface Props extends RouteComponentProps<RouteParams> {
  actionLogService?: ActionLogService
}

interface State {
  subBreadcrumb: string
}

interface RouteParams {
  tab: string
  pageNo: string
}

enum SubBreadcrumb {
  AllBadgeList = 'Badge List',
  ChallengingBadgeList = '도전중 Badge',
  EarnedBadgeList = 'My Badge',
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@observer
@reactAutobind
class MyBadgePage extends Component<Props, State> {
  //
  state = {
    subBreadcrumb: SubBreadcrumb.AllBadgeList
  };


  componentDidMount(): void {
    //
    this.setSubBreadcrumb();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.setSubBreadcrumb();
    }
  }

  setSubBreadcrumb() {
    //
    const { match } = this.props;

    this.setState({
      subBreadcrumb: (SubBreadcrumb as any)[match.params.tab] || '',
    });
  }


  getTabs() {
    //
    return [
      {
        name: MyBadgeContentType.AllBadgeList,
        item: (
          <>
            Badge List
            <span className="count">+24</span>
          </>
        ),
        render: () => (
          <>
            <AllBadgeListContainer/>
          </>
        )
      },
      {
        name: MyBadgeContentType.ChallengingBadgeList,
        item: (
          <>
            도전중 Badge
            <span className="count">+24</span>
          </>
        ),
        render: () => (
          <>
            도전중 Badge List
          </>
        )
      },
      {
        name: MyBadgeContentType.EarnedBadgeList,
        item: (
          <>
            My Badge
            <span className="count">+24</span>
          </>
        ),
        render: () => (
          <EarnedBadgeListContainer/>
        )
      }
    ];
  }


  onChangeTab(tab: TabItemModel) {
    //this.props.actionLogService?.registerClickActionLog({ subAction: (SubBreadcrumb as any)[tab.name] });
    this.props.history.push(routePaths.badgeTab(tab.name));
  }

  render() {
    //
    const { params } = this.props.match;
    const { subBreadcrumb } = this.state;

    return (
      <ContentLayout
        breadcrumb={[
          { text: 'Certification'},
          { text: subBreadcrumb },
        ]}
      >

        <Tab
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default MyBadgePage;
