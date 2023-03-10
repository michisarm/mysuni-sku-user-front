import React, { Component } from 'react';
import {
  reactAutobind,
  mobxHelper,
  reactConfirm, ReactComponent,
} from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Container, Form, Icon, Segment } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';

import { AlertWin, ConfirmWin } from 'shared';
import routePaths from '../../routePaths';
import { CategoryService, PostService } from '../../stores';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import SupportService from '../../present/logic/SupportService';
import QnaDetailView from '../view/QnaDetailView';
import QnaAnswerView from '../view/QnaAnswerView';
import QnaAnswerSatisfactionView from '../view/QnaAnswerSatisfactionView';
import OperatorModel from '../../model/vo/OperatorModel';
import QnAModel from '../../model/QnAModel';
import { QnaState } from '../../model/vo/QnaState';

interface Props extends RouteComponentProps<{ postId: string }> {
}

interface States {
  isEdit: boolean;
  confirmWinOpen: boolean;
  alertWinOpen: boolean;
  alertWinOpenSuccess: boolean;
  isBlankTarget: string;
  successMessage: string;
  filesMap: Map<string, any>;
}

interface Injected {
  supportService: SupportService;
}

@inject(mobxHelper.injectFrom('board.supportService'))
@observer
@reactAutobind
class QnaDetailContainer extends ReactComponent<Props, States, Injected> {
  //
  constructor(props: Props) {
    //
    super(props);
    this.state = {
      isEdit: false,
      confirmWinOpen: false,
      alertWinOpen: false,
      alertWinOpenSuccess: false,
      isBlankTarget: '',
      successMessage: '',
      filesMap: new Map<string, any>(),
    };
  }

  componentDidMount() {
    //
    this.init();
  }

  componentWillUnmount() {
    this.injected.supportService.clearQna();
  }

  async init() {
    const { postId } = this.props.match.params;
    const { supportService } = this.injected;

    await supportService.findAllCategories();
    const qna = await supportService.findQnaById(postId);

    this.getFileIds();

    if (qna.answer.modifier) {
      await this.setFinalOperator(qna.answer.modifier);
    }
  }

  async setFinalOperator(id: string) {
    //
    const { supportService } = this.injected;

    supportService
      .findOperatorById(id)
      .then((response) =>
        supportService.setFinalOperator(response || new OperatorModel())
      );
  }

  getFileIds() {
    //
    const { supportService } = this.injected;
    const { qna } = supportService;
    const referenceFileBoxId = qna && qna.question && qna.question.depotId;
    const answerFileBoxId = qna && qna.answer && qna.answer.depotId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) this.findFiles('reference', referenceFileBoxId);
      if (answerFileBoxId) this.findFiles('answer', answerFileBoxId);
    });
  }

  findFiles(type: string, fileBoxId: string) {
    const { filesMap } = this.state;
    depot.getDepotFiles(fileBoxId).then((files) => {
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      this.setState({ filesMap: newMap });
    });
  }

  handleCloseConfirmWin() {
    //
    this.setState({
      confirmWinOpen: false,
    });
  }

  handleOKConfirmWin() {
    //
    const { supportService } = this.injected;
    const { postId } = this.props.match.params;
    const { qna } = supportService;
    // Promise.resolve().then(() => {
    //   post.deleted = true;
    //   if (postService) {
    //     postService.deletePost(postId, post).then(() => {
    //       window.location.href =
    //         process.env.PUBLIC_URL + routePaths.supportQnA();
    //     });
    //   }
    // });
    //this.onClickList();
  }

  deleteQnaDetail() {
    //
    this.setState({
      confirmWinOpen: true,
    });
  }

  /*
  Q&A ??????
  */
  modifyQnaDetail() {
    //
    const { params } = this.props.match;

    reactConfirm({
      title: getPolyglotText('?????? ??????', 'support-QnaRead-????????????'),
      message: getPolyglotText('?????? ???????????????????', 'support-QnaRead-??????mg'),
      warning: true,
      onOk: () => this.handleModifyOKConfirmWin(),
    });
  }

  // modifyQnaDetail() {
  //   //
  //   this.setState({
  //     modifyWinOpen: true,
  //   });
  // }

  // handleModifyCloseConfirmWin() {
  //   //
  //   this.setState({
  //     modifyWinOpen: false,
  //   });
  // }

  handleModifyOKConfirmWin() {
    //
    const { supportService } = this.injected;
    const { postId } = this.props.match.params;
    const { qna } = supportService;
    this.onClickList();
    this.setState({ isEdit: false });
  }

  handleCloseAlertWin() {
    //
    this.setState({ alertWinOpen: false, isBlankTarget: ''});
  }

  handleCloseAlertWinSuccess() {
    //
    this.setState({ alertWinOpenSuccess: false, successMessage: ''});
  }

  onClickList() {
    this.props.history.push(routePaths.supportQnA());
  }

  onClickModify() {
    const { postId } = this.props.match.params;
    this.props.history.push(routePaths.supportQnAModifyPost(postId));
  }

  getCategoryName(categoryId: string): string {
    //
    const { supportService } = this.injected;
    return supportService.getCategoryName(categoryId);
  }

  onChangeQnaProps(name: string, value: any): void {
    //
    const { supportService } = this.injected;
    supportService.changeQnaProps(name, value);
  }

  async onClickRegisterSatisfaction(): Promise<void> {
    //
    const { supportService } = this.injected;
    const { qna } = supportService;

    if(qna.answer.satisfactionPoint === 0 || qna.answer.satisfactionPoint === null || qna.answer.satisfactionPoint === undefined) {
      this.setState({ alertWinOpen: true, isBlankTarget: getPolyglotText('????????? ??????????????????', 'support-qna-satis-star')});
      return;
    }

    await supportService.registerSatisfaction(qna.question.id, QnAModel.asSatisfactionCdo(qna));
    this.setState({ alertWinOpenSuccess: true, successMessage: getPolyglotText('????????? ????????? ????????? ????????? ???????????????.', 'support-qna-satis-thx')});

    await this.init();
  }

  render() {
    //
    const { confirmWinOpen, alertWinOpen, isBlankTarget, isEdit, alertWinOpenSuccess, successMessage } = this.state;
    const { supportService } = this.injected;
    const { qna, finalOperator, getStateToString } = supportService
    const { filesMap } = this.state;

    return (
      <>
        <div className="post-view qna qna-admin">
          <QnaDetailView
            getCategoryName={this.getCategoryName}
            onClickList={this.onClickList}
            getStateToString={getStateToString}
            qna={qna}
            finalOperator={finalOperator}
            filesMap={filesMap}
          />
          {
            qna.question.state === QnaState.AnswerCompleted && (
              <div className="ui segment full">
                <div className="content-admin-write">
                  <Form>
                    <QnaAnswerView
                      qna={qna}
                      filesMap={filesMap}
                    />
                    <QnaAnswerSatisfactionView
                      onChangeQnaProps={this.onChangeQnaProps}
                      onClickRegisterSatisfaction={this.onClickRegisterSatisfaction}
                      qna={qna}
                    />
                  </Form>
                </div>
              </div>
            ) || null
          }
        <Segment className="full">
          <Container>
            <div className="actions bottom">
              {isEdit && (
                <Button
                  icon
                  className="left post edit"
                  onClick={() => this.onClickModify()}
                >
                  <Icon className="edit24" />{' '}
                  <PolyglotText
                    id="support-QnaRead-??????"
                    defaultString="Edit"
                  />
                </Button>
              )}
            </div>
            <AlertWin
              title=""
              message={isBlankTarget}
              open={alertWinOpen}
              handleClose={this.handleCloseAlertWin}
            />
            <AlertWin
              title=" "
              message={successMessage}
              open={alertWinOpenSuccess}
              handleClose={this.handleCloseAlertWinSuccess}
            />
            <ConfirmWin
              message={getPolyglotText(
                '?????? ???????????????????',
                'support-QnaRead-??????mg'
              )}
              open={confirmWinOpen}
              handleClose={this.handleCloseConfirmWin}
              handleOk={this.handleOKConfirmWin}
              title={getPolyglotText('?????? ??????', 'support-QnaRead-????????????')}
              buttonYesName={getPolyglotText('OK', 'support-QnaRead-ok??????')}
              buttonNoName={getPolyglotText(
                'Cancel',
                'support-QnaRead-????????????'
              )}
            />
          </Container>
        </Segment>
        </div>
      </>
    );
  }
}

export default withRouter(QnaDetailContainer);
