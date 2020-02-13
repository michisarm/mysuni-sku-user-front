
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


interface Props extends RouteComponentProps<RouteParams> {
}

interface RouteParams {
  boardId: string
}

enum ContentType {
  Notice = 'Notice',
  FAQ = 'FAQ',
  QnA = 'Q&A',
}

@observer
@reactAutobind
export class BoardListPage extends React.Component<Props> {
  //
  getTabs() {
    //
    return [
      { name: ContentType.Notice, item: ContentType.Notice, render: () => <NoticeTabContainer /> },
      { name: ContentType.FAQ, item: ContentType.FAQ, render: () => <FaqTabContainer /> },
      { name: ContentType.QnA, item: ContentType.QnA, render: () => <QnaTabContainer /> },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel) {
    //
    this.props.history.push(routePaths.supportTab(tab.name));
  }

  render() {
    //
    const { params } = this.props.match;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: `Support` },
          { text: `${params.boardId}`, path: routePaths.supportTab(params.boardId) },
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
