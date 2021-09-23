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

import { ConfirmWin } from 'shared';
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

interface Props extends RouteComponentProps<{ postId: string }> {
}

interface States {
  isEdit: boolean;
  confirmWinOpen: boolean;
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
      filesMap: new Map<string, any>(),
    };
  }

  componentDidMount() {
    //
    this.init();
  }

  async init() {
    const { postId } = this.props.match.params;
    const { supportService } = this.injected;

    await supportService.findAllCategories();
    const qna = await supportService.findQnaById(postId);

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

    Promise.resolve().then(() => {
      if (referenceFileBoxId) this.findFiles('reference', referenceFileBoxId);
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
  Q&A 수정
  */
  modifyQnaDetail() {
    //
    const { params } = this.props.match;

    reactConfirm({
      title: getPolyglotText('수정 안내', 'support-QnaRead-수정안내'),
      message: getPolyglotText('수정 하시겠습니까?', 'support-QnaRead-수정mg'),
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
    // Promise.resolve().then(() => {
    //   if (postService) postService.modifyPost(postId, post);
    // });
    this.onClickList();
    this.setState({ isEdit: false });
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

  render() {
    //
    const { confirmWinOpen, isEdit } = this.state;
    const { supportService } = this.injected;
    const { qna, finalOperator } = supportService
    const { filesMap } = this.state;

    return (
      <>
        <div className="post-view qna qna-admin">
          <QnaDetailView
            getCategoryName={this.getCategoryName}
            onClickList={this.onClickList}
            qna={qna}
            finalOperator={finalOperator}
            filesMap={filesMap}
          />
          <div className="ui segment full">
            <div className="content-admin-write">
              <Form>
                <QnaAnswerView
                  qna={qna}
                  filesMap={filesMap}
                />
                <QnaAnswerSatisfactionView qna={qna} />
              </Form>
            </div>
          </div>

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
                    id="support-QnaRead-수정"
                    defaultString="Edit"
                  />
                </Button>
              )}

              <Button
                icon
                className="left post delete"
                onClick={() => this.deleteQnaDetail()}
              >
                <Icon className="del24" />{' '}
                <PolyglotText
                  id="support-QnaRead-삭제"
                  defaultString="Delete"
                />
              </Button>
              <Button
                icon
                className="left post list2"
                onClick={this.onClickList}
              >
                <Icon className="list24" />{' '}
                <PolyglotText id="support-QnaRead-목록" defaultString="List" />
              </Button>
            </div>

            <ConfirmWin
              message={getPolyglotText(
                '삭제 하시겠습니까?',
                'support-QnaRead-삭제mg'
              )}
              open={confirmWinOpen}
              handleClose={this.handleCloseConfirmWin}
              handleOk={this.handleOKConfirmWin}
              title={getPolyglotText('삭제 안내', 'support-QnaRead-삭제안내')}
              buttonYesName={getPolyglotText('OK', 'support-QnaRead-ok버튼')}
              buttonNoName={getPolyglotText(
                'Cancel',
                'support-QnaRead-취소버튼'
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
