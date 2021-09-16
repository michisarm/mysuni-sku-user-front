import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import BoardListContentHeaderContainer from '../logic/BoardListContentHeaderContainer';
import QnaTabContainer from '../logic/QnaListContainer';
import FaqTabContainer from '../logic/FaqListContainer';
import NoticeTabContainer from '../logic/NoticeListContainer';
import QnaManagementTabContainer from '../logic/QnaManagementContainer';
import { findForeignerUser } from 'shared/helper/findForeignerUser';

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  boardId: string;
}

enum ContentType {
  Notice = 'Notice',
  FAQ = 'FAQ',
  QnA = 'Q&A',
  QnAMgt = 'Q&AMgt',
}

enum ContentName {
  Notice = 'Notice',
  FAQ = 'FAQ',
  QnA = '나의 이용문의',
  QnAMgt = 'Q&A 관리',
}

@observer
@reactAutobind
export class BoardListPage extends React.Component<Props> {
  //
  getTabs() {
    const isForeignerUser = findForeignerUser();
    const TabItem = [
      {
        name: ContentType.FAQ,
        item: ContentName.FAQ,
        render: () => <FaqTabContainer />,
      },
      {
        name: ContentType.QnA,
        item: ContentName.QnA,
        render: () => <QnaTabContainer />,
      },
      {
        name: ContentType.QnAMgt,
        item: ContentName.QnAMgt,
        render: () => <QnaManagementTabContainer />,
      },
    ] as TabItemModel[];

    if (isForeignerUser) {
      return TabItem;
    } else {
      TabItem.unshift({
        name: ContentType.Notice,
        item: ContentName.Notice,
        render: () => <NoticeTabContainer />,
      });
    }

    return TabItem;
  }

  onChangeTab(tab: TabItemModel): string {
    //
    this.props.history.push(routePaths.supportTab(tab.name));

    return routePaths.supportTab(tab.name);
  }

  render() {
    //
    const { params } = this.props.match;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: `Support` },
          {
            text: `${params.boardId}`,
            path: routePaths.supportTab(params.boardId),
          },
        ]}
      >
        <BoardListContentHeaderContainer />
        <Tab
          tabs={this.getTabs()}
          defaultActiveName={params.boardId}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default BoardListPage;
