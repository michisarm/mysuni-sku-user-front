import React from 'react';
import { mobxHelper, reactAutobind, ReactComponent } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Icon, Radio, Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel, Pagination, SubActions } from 'shared';
import routePaths from '../../routePaths';
import { getPolyglotText, PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import QnaListView from '../view/QnaListView';
import SupportService from '../../present/logic/SupportService';
import { QnaState } from '../../model/vo/QnaState';
import { SharedService } from '../../../shared/stores';

interface Props extends RouteComponentProps {
}

interface State {
  offset: number;
  answered: string;
  isLoading: boolean;
}

interface Injected {
  sharedService: SharedService;
  supportService: SupportService;
}

@inject(mobxHelper.injectFrom('shared.sharedService', 'board.supportService'))
@observer
@reactAutobind
class QnaListContainer extends ReactComponent<Props, State, Injected> {
  //
  paginationKey = 'MyQnA';

  state = {
    offset: 0,
    answered: '',
    isLoading: false,
  };

  constructor(props: Props) {
    //
    super(props);
  }

  componentDidMount() {
    //
    const { supportService } = this.injected;

    this.findMyQnas(undefined);
    supportService.findAllCategories();
  }

  async findMyQnas(answered: any): Promise<void> {
    //
    const { supportService, sharedService } = this.injected;
    const { qnaQueryModel } = supportService;
    const pageModel = sharedService.getPageModel(this.paginationKey);
    let totalCount = 0;
    if(qnaQueryModel.state === 'AnswerWaiting') {
      totalCount = await supportService.findQnaToMe(pageModel, [QnaState.AnswerWaiting, QnaState.QuestionReceived]);
    } else if (qnaQueryModel.state === 'AnswerCompleted'){
      totalCount = await supportService.findQnaToMe(pageModel, [QnaState.AnswerCompleted]);
    } else {
      totalCount = await supportService.findQnaToMe(pageModel, qnaQueryModel.state);
    }
    sharedService.setCount(this.paginationKey, totalCount);

    this.setState({ isLoading: false });
  }

  onClickNewQna() {
    //
    this.props.history.push(routePaths.supportQnANewPost());
  }

  onClickPost(postId: string) {
    //
    this.props.history.push(routePaths.supportQnAPost(postId));
  }

  onClickPostAnswer(postId: string) {
    //
    this.props.history.push(routePaths.supportQnAAnswer(postId));
  }

  getCategoryName(categoryId: string): string {
    //
    const { supportService } = this.injected;
    return supportService.getCategoryName(categoryId);
  }

  onChangeQuestionState(value: QnaState | undefined): void {
    //
    const { supportService } = this.injected;
    supportService.changeQuestionQueryProps('state', value);

    this.findMyQnas(supportService.qnaQueryModel.state);
  }

  render() {
    //
    const { offset, isLoading } = this.state;
    const { supportService, sharedService } = this.injected;
    const { questions, qnaQueryModel } = supportService;
    const { startNo, count } = sharedService.getPageModel(this.paginationKey);

    return (
      <div className="full">
        <div className="support-list-wrap user-qa">
          <Pagination name={this.paginationKey} onChange={this.findMyQnas}>

          <SubActions>
            <SubActions.Right>
              <div className="list-top">
                <Button icon className="left post ask" onClick={this.onClickNewQna}>
                  <Icon className="ask24" />
                  &nbsp;&nbsp;{' '}
                  <PolyglotText
                    id="support-qna-btn-inquiry"
                    defaultString="문의하기"
                  />
                </Button>
                <div className="radio-wrap">
                  <Radio
                    className="base"
                    label={getPolyglotText('모두보기', 'support-qna-radio-all')}
                    name="radioGroup"
                    value={undefined}
                    checked={qnaQueryModel.state === undefined}
                    onChange={(e: any, data: any) => {
                      this.onChangeQuestionState(undefined);
                    }}
                  />
                  <Radio
                    className="base"
                    label={getPolyglotText('답변 완료', 'support-qna-radio-done')}
                    name="radioGroup"
                    value={QnaState.AnswerCompleted}
                    checked={qnaQueryModel.state === QnaState.AnswerCompleted}
                    onChange={(e: any, data: any) => {
                      this.onChangeQuestionState(data.value);
                    }}
                  />
                  <Radio
                    className="base"
                    label={getPolyglotText('답변 대기', 'support-qna-radio-wait')}
                    name="radioGroup"
                    value={QnaState.AnswerWaiting}
                    checked={qnaQueryModel.state === QnaState.AnswerWaiting}
                    onChange={(e: any, data: any) => {
                      this.onChangeQuestionState(data.value);
                    }}
                  />
                </div>
              </div>
            </SubActions.Right>
          </SubActions>
          {isLoading ? (
            <Segment
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height: 400,
                boxShadow: '0 0 0 0',
                border: 0,
              }}
            >
              <Loadingpanel loading={isLoading} />
            </Segment>
          ) : questions.length === 0 ? (
            <NoSuchContentPanel
              message={getPolyglotText(
                '등록된 Q&A가 없습니다.',
                'support-qna-목록없음'
              )}
            />
          ) : (
            <>
              <div className="qna-admin-list-wrap">
                  <QnaListView
                    getCategoryName={this.getCategoryName}
                    onClickPost={this.onClickPost}
                    questions={questions}
                    startNo={startNo}
                  />
              </div>
            </>
          )}
            <Pagination.Navigator styled/>
          </Pagination>
        </div>
      </div>
    );
  }
}

export default withRouter(QnaListContainer);
