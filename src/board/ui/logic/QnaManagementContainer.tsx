import React from 'react';
import { Radio } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import {
  ReactComponent,
  mobxHelper,
  reactAutobind,
} from '@nara.platform/accent';

import SubActions from '../../../shared/components/SubActions';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

import SupportService from '../../present/logic/SupportService';
import Pagination from '../../../shared/components/Pagination';
import QnaManagementListView from '../view/QnaManagementListView';
import { SharedService } from '../../../shared/stores';
import { QnaState } from '../../model/vo/QnaState';
import routePaths from '../../routePaths';
import { withRouter } from 'react-router-dom';

interface Param {}

interface Props extends RouteComponentProps<Param> {}

interface State {
  isLoading: boolean;
  state?: QnaState;
}

interface Injected {
  supportService: SupportService;
  sharedService: SharedService;
}

@inject(mobxHelper.injectFrom('board.supportService', 'shared.sharedService'))
@observer
@reactAutobind
class QnaManagementContainer extends ReactComponent<Props, State, Injected> {
  //
  paginationKey = 'QnAManagement';
  state: State = {
    isLoading: false,
    state: undefined,
  };

  componentDidMount() {
    //
    this.init();
  }

  async init() {
    //
    const { supportService } = this.injected;

    await supportService.findAllCategories();
    this.findQnaMyOperator();
  }

  async findQnaMyOperator() {
    //
    const { supportService, sharedService } = this.injected;
    let pageModel = sharedService.getPageModel(this.paginationKey);

    if (pageModel.limit === 20) {
      sharedService.setPageMap(this.paginationKey, pageModel.offset, 10);
      pageModel = sharedService.getPageModel(this.paginationKey);
    }

    const totalCount = await supportService.findQnaMyOperator(
      pageModel,
      this.state.state
    );

    sharedService.setCount(this.paginationKey, totalCount);
  }

  async onClickQnAStateRadio(state?: QnaState) {
    //
    const { sharedService } = this.injected;

    // 상태 바뀌었을 시에 처음 페이지로 이동
    sharedService.setPage(this.paginationKey, 1);

    await this.setState({ state });
    this.findQnaMyOperator();
  }

  onClickQnA(qnaId: string) {
    //
    this.props.history.push(routePaths.supportQnAManagementPost(qnaId));
  }

  render() {
    //
    const { supportService, sharedService } = this.injected;
    const { state } = this.state;
    const { qnas, categoriesMap } = supportService;
    const { startNo, count } = sharedService.getPageModel(this.paginationKey);

    return (
      <>
        <div className="support-list-wrap">
          <div className="list-top">
            <div className="list-top-left">
              총 {count}개의 리스트가 있습니다.
            </div>
            <div className="radio-wrap">
              <Radio
                className="base"
                label={getPolyglotText('모두 보기', 'support-qna-rall')}
                name="radioGroup"
                value={undefined}
                checked={state === undefined}
                onChange={() => this.onClickQnAStateRadio(undefined)}
              />
              <Radio
                className="base"
                label={getPolyglotText('답변 완료', 'support-qna-rdn')}
                name="radioGroup"
                value={QnaState.AnswerCompleted}
                checked={state === QnaState.AnswerCompleted}
                onChange={() =>
                  this.onClickQnAStateRadio(QnaState.AnswerCompleted)
                }
              />
              <Radio
                className="base"
                label={getPolyglotText('답변 대기', 'support-qna-rwt')}
                name="radioGroup"
                value={QnaState.AnswerWaiting}
                checked={state === QnaState.AnswerWaiting}
                onChange={() =>
                  this.onClickQnAStateRadio(QnaState.AnswerWaiting)
                }
              />
            </div>
          </div>

          <Pagination
            name={this.paginationKey}
            onChange={this.findQnaMyOperator}
          >
            <div className="qna-admin-list-wrap">
              <QnaManagementListView
                qnas={qnas}
                startNo={startNo}
                categoriesMap={categoriesMap}
                onClickQnA={this.onClickQnA}
              />
            </div>

            <Pagination.Navigator styled />
          </Pagination>
        </div>
      </>
    );
  }
}

export default withRouter(QnaManagementContainer);
