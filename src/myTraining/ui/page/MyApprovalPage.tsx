import React, {Component} from 'react';
import {mobxHelper, reactAutobind} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps, withRouter} from 'react-router';

import {ActionLogService} from 'shared/stores';
import {ContentLayout, Tab, TabItemModel} from 'shared';
import routePaths from '../../routePaths';
import MyPageContentTypeV2 from '../model/MyPageContentTypeV2';
import MyPageContentHeaderContainer from '../logic/MyPageContentHeaderContainer';
import MyPageListContainer from '../logic/MyPageListContainer';

import MyApprovalListContainer from '../logic/MyApprovalListContainer';
import APLPage from './APLPage';
//import AplListContainer from '../../../apl/ui/logic/AplListContainer';

// import {ApprovalListBoard} from '../view/ApprovalListBoard';

interface Props extends RouteComponentProps<RouteParams> {
  actionLogService?: ActionLogService
}

interface State {
  subBreadcrumb: string
  approvalCount: number
  addPersonalLearningCount: number
}

interface RouteParams {
  tab: string
  pageNo: string
}

enum SubBreadcrumb {
  // CompletedList = '학습완료',
  //ApprovalList = '승인관리',
  ApprovalList = '유료과정',
  ApprovalAddPersonalLearning = '개인학습',
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@observer
@reactAutobind
class MyApprovalPage extends Component<Props, State> {
  //
  state = {
    // 시작하는 탭 설정
    subBreadcrumb: SubBreadcrumb.ApprovalList,
    approvalCount: 0,
    addPersonalLearningCount: 0,
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
    const { approvalCount, addPersonalLearningCount } = this.state;

    return [
      {
        name: MyPageContentTypeV2.ApprovalList,
        item: (
          <>
            유료과정
            <span className="count">{approvalCount > 0 ? `+${approvalCount}` : approvalCount}</span>
          </>
        ),
        render: () => (
          <MyApprovalListContainer/>
        )
      },
      {
        name: MyPageContentTypeV2.ApprovalAddPersonalLearning,
        item: (
          <>
            개인학습
            <span className="count">{addPersonalLearningCount > 0 ? `+${addPersonalLearningCount}` : addPersonalLearningCount}</span>
          </>
        ),
        render: () => (
          /*<AplListContainer/>*/
          <APLPage/>
        ),
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel): string {
    //
    this.props.actionLogService?.registerClickActionLog({ subAction: (SubBreadcrumb as any)[tab.name] });
    this.props.history.push(routePaths.approvalTab(tab.name));

    return routePaths.approvalTab(tab.name);
  }

  onChangeApprovalCount(approvalCount: number) {
    //
    this.setState({ approvalCount });
  }

  onChangeAddPersonalLearningCount(addPersonalLearningCount: number) {
    //
    this.setState({ addPersonalLearningCount });
  }

  render() {
    //
    const { params } = this.props.match;
    const { subBreadcrumb } = this.state;

    return (
      <ContentLayout
        className="MyApprovalPage"
        breadcrumb={[
          { text: 'MyApprovalPage' },
          { text: subBreadcrumb },
        ]}
      >
        <MyPageContentHeaderContainer />

        <Tab
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(MyApprovalPage);
