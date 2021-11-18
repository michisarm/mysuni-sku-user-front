import React from 'react';
import {
  reactAutobind,
  ReactComponent,
  mobxHelper,
} from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import BoardListContentHeaderContainer from '../logic/BoardListContentHeaderContainer';
import QnaTabContainer from '../logic/QnaListContainer';
import FaqTabContainer from '../logic/FaqListContainer';
import NoticeTabContainer from '../logic/NoticeListContainer';
import QnaManagementTabContainer from '../logic/QnaManagementContainer';
import {
  findForeignerUser,
  findForeignerUserFromLanguage,
} from 'shared/helper/findForeignerUser';
import SharedService from '../../../shared/present/logic/SharedService';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  boardId: string;
}

interface Injected {
  sharedService: SharedService;
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
  QnA = '1:1 문의',
  QnAMgt = '문의관리',
}

@inject(mobxHelper.injectFrom('shared.sharedService'))
@observer
@reactAutobind
export class BoardListPage extends ReactComponent<Props, {}, Injected> {
  //
  getTabs() {
    const isForeignerUser = findForeignerUserFromLanguage();
    const TabItem = [
      {
        name: ContentType.FAQ,
        item: ContentName.FAQ,
        render: () => <FaqTabContainer />,
      },
      {
        name: ContentType.QnA,
        item: getPolyglotText('1:1 문의', 'support-qna-탭명'),
        render: () => <QnaTabContainer />,
      },
      {
        name: ContentType.QnAMgt,
        item: getPolyglotText('문의관리', 'support-qnamgt-탭명'),
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
    const paginationKeys = ['Notice', 'MyQnA', 'QnAManagement'];
    const { setPage, getPageModel } = this.injected.sharedService;

    paginationKeys.forEach((paginationKey) => {
      getPageModel(paginationKey);
      setPage(paginationKey, 1);
    });

    this.props.history.push(routePaths.supportTab(tab.name));

    return routePaths.supportTab(tab.name);
  }

  getBreadCrumbString() {
    //
    const { boardId } = this.props.match.params;

    if (boardId === ContentType.Notice) {
      return 'Notice';
    } else if (boardId === ContentType.FAQ) {
      return 'FAQ';
    } else if (boardId === ContentType.QnA) {
      return getPolyglotText('1:1 문의', 'support-qna-탭명');
    } else if (boardId === ContentType.QnAMgt) {
      return getPolyglotText('문의관리', 'support-qnamgt-탭명');
    }

    return '';
  }

  render() {
    //
    const { params } = this.props.match;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Support', path: routePaths.supportNotice() },
          {
            text: this.getBreadCrumbString(),
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
