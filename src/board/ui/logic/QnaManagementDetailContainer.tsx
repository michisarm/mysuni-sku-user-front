import React from 'react';
import {
  mobxHelper,
  reactAutobind,
  ReactComponent,
} from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { SupportService } from '../../stores';
import QnaManagementDetailView from '../view/QnaManagementDetailView';
import depot from '@nara.drama/depot';
import { QnaState } from '../../model/vo/QnaState';
import { Button, Form, Segment } from 'semantic-ui-react';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { AlertWin, ConfirmWin } from '../../../shared';
import routePaths from '../../routePaths';
import OperatorModel from '../../model/vo/OperatorModel';
import QnaManagementAnswerView from '../view/QnaManagementAnswerView';

interface Param {
  //
  qnaId: string;
}

interface Props extends RouteComponentProps<Param> {
  //
}

interface State {
  filesMap: Map<string, any>;
  answerFilesMap: Map<string, any>;
  isUpdatable: boolean;
  title: string;
  message: string;
  open: string;
  isDelete: boolean;
}

interface Injected {
  supportService: SupportService;
}

@inject(mobxHelper.injectFrom('board.supportService'))
@observer
@reactAutobind
class QnaManagementDetailContainer extends ReactComponent<
  Props,
  State,
  Injected
> {
  //
  state: State = {
    filesMap: new Map<string, any>(),
    answerFilesMap: new Map<string, any>(),
    isUpdatable: false,
    title: '',
    message: '',
    open: '',
    isDelete: false,
  };

  componentDidMount() {
    //
    this.init();
  }

  async init() {
    //
    const { qnaId } = this.props.match.params;
    const { supportService } = this.injected;

    await supportService.findAllCategories();
    const qna = await supportService.findQnaById(qnaId);
    this.getFileIds();

    if (qna.answer.modifier) {
      this.setFinalOperator(qna.answer.modifier);
    }
    if (qna.latestOperatorSentEmail) {
      this.setSendEmailOperator(qna.latestOperatorSentEmail.receiver);
    }

    if (qna.question.state === QnaState.AnswerWaiting) {
      this.setState({ isUpdatable: true });
    }
  }

  getFileIds() {
    //
    const { qna } = this.injected.supportService;
    const referenceFileBoxId = qna && qna.question && qna.question.depotId;
    const answerFileBoxId = qna && qna.answer && qna.answer.depotId;

    Promise.resolve().then(() => {
      this.findFiles('reference', referenceFileBoxId, answerFileBoxId);
    });
  }

  findFiles(type: string, fileBoxId: string, answerFileBoxId: string) {
    const { filesMap, answerFilesMap } = this.state;
    if (fileBoxId) {
      depot.getDepotFiles(fileBoxId).then((files) => {
        filesMap.set(type, files);
        const newMap = new Map(filesMap.set(type, files));
        this.setState({ filesMap: newMap });
      });
    }

    if (answerFileBoxId) {
      depot.getDepotFiles(answerFileBoxId).then((files) => {
        answerFilesMap.set(type, files);
        const newMap = new Map(answerFilesMap.set(type, files));
        this.setState({ answerFilesMap: newMap });
      });
    }
  }

  setFinalOperator(id: string) {
    //
    const { supportService } = this.injected;

    supportService
      .findOperatorById(id)
      .then((response) =>
        supportService.setFinalOperator(response || new OperatorModel())
      );
  }

  setSendEmailOperator(id: string) {
    //
    const { supportService } = this.injected;

    supportService
      .findOperatorById(id)
      .then((response) =>
        supportService.setEmailOperator(response || new OperatorModel())
      );
  }

  getFileBoxIdForReference(fileBoxId: string) {
    //
    const { changeQnaProps } = this.injected.supportService;
    changeQnaProps('answer.depotId', fileBoxId);
  }

  onClickList() {
    this.props.history.push(routePaths.supportQnAMgt());
  }

  onClickSave() {
    //
    const { qna } = this.injected.supportService;

    if (qna.answer.content === '') {
      // this.setState({ message: '필수 항목을 입력해주세요', open: 'alert' });
      this.setState({
        message: getPolyglotText(
          '필수 항목을 입력해주세요',
          'support-common-필수항목'
        ),
        open: 'alert',
      });
      return;
    }

    const title = getPolyglotText('등록 안내', 'support-QnaRead-등록안내');

    const message = qna.checkMail
      ? getPolyglotText(
          '문의자에게 메일을 발송 하시겠습니까?',
          'support-qnamgt-메일발송mg'
        )
      : getPolyglotText('등록 하시겠습니까?', 'support-QnaRead-등록mg');

    this.setState({ title, message, open: 'confirm', isDelete: false });
  }

  onSave() {
    //
    const { qna, modifiedAnswer } = this.injected.supportService;

    modifiedAnswer(qna.question.id).then(() => {
      this.reRenderQna().then(() => {
        this.setState({ open: '', isUpdatable: false });
      });
    });
  }

  onClickDelete() {
    //
    const title = getPolyglotText('삭제 안내', 'support-QnaRead-삭제안내');
    const message = getPolyglotText(
      '삭제 하시겠습니까?',
      'support-QnaRead-삭제mg'
    );

    this.setState({ title, message, open: 'confirm', isDelete: true });
  }

  onDelete() {
    //
    const qnaId = this.props.match.params.qnaId;
    const { removeQuestion } = this.injected.supportService;

    removeQuestion(qnaId).then(() => {
      this.onClickList();
    });
  }

  async reRenderQna() {
    //
    const { qnaId } = this.props.match.params;
    const { findQnaById } = this.injected.supportService;

    const qna = await findQnaById(qnaId);
    const referenceFileBoxId = qna && qna.question && qna.question.depotId;
    const answerFileBoxId = qna && qna.answer && qna.answer.depotId;

    Promise.resolve().then(() => {
      this.findFiles('reference', referenceFileBoxId, answerFileBoxId);
    });

    if (qna.answer.modifier) {
      this.setFinalOperator(qna.answer.modifier);
    }

    if (qna.latestOperatorSentEmail) {
      this.setSendEmailOperator(qna.latestOperatorSentEmail.receiver);
    }
  }

  renderState(state: QnaState) {
    //
    const { getStateToString } = this.injected.supportService;

    return (
      <strong className={QnaState.AnswerCompleted ? 'stat done' : 'stat wait'}>
        {getStateToString(state)}
      </strong>
    );
  }

  render() {
    //
    const { supportService } = this.injected;
    const {
      filesMap,
      isUpdatable,
      answerFilesMap,
      open,
      message,
      title,
      isDelete,
    } = this.state;
    const {
      qna,
      categoriesMap,
      changeQnaProps,
      finalOperator,
      emailOperator,
      getStateToString,
      getChannelToString,
    } = supportService;

    return (
      <>
        <div className="post-view qna qna-admin">
          <QnaManagementDetailView
            qna={qna}
            categoriesMap={categoriesMap}
            filesMap={filesMap}
            renderState={this.renderState}
            getChannelToString={getChannelToString}
            onClickList={this.onClickList}
            onClickDelete={this.onClickDelete}
          />

          <Segment className="full">
            {qna.answer && (
              <div className="content-admin-write">
                <Form>
                  <QnaManagementAnswerView
                    isUpdatable={isUpdatable}
                    qna={qna}
                    finalOperator={finalOperator}
                    emailOperator={emailOperator}
                    answerFilesMap={answerFilesMap}
                    changeQnaProps={changeQnaProps}
                    getFileBoxIdForReference={this.getFileBoxIdForReference}
                    getStateToString={getStateToString}
                  />
                </Form>
              </div>
            )}
            <div className="supt-bottom">
              <div className="bttn-area">
                <Button className="fix line" onClick={this.onClickList}>
                  {getPolyglotText('목록', 'support-qnamgt-목록')}
                </Button>
                {!isUpdatable ? (
                  <Button
                    className="fix bg"
                    onClick={() => {
                      changeQnaProps('question.state', QnaState.AnswerWaiting);
                      this.setState({ isUpdatable: true });
                    }}
                  >
                    {getPolyglotText('수정', 'support-qnamgt-수정')}
                  </Button>
                ) : (
                  <Button className="fix bg" onClick={this.onClickSave}>
                    {getPolyglotText('등록', 'support-qnamgt-등록')}
                  </Button>
                )}
              </div>
            </div>
          </Segment>
          <ConfirmWin
            message={message}
            open={open === 'confirm'}
            handleClose={() => this.setState({ open: '' })}
            handleOk={isDelete ? this.onDelete : this.onSave}
            title={title}
            buttonYesName={getPolyglotText('OK', 'support-QnaRead-ok버튼')}
            buttonNoName={getPolyglotText('Cancel', 'support-QnaRead-취소버튼')}
          />
          <AlertWin
            message={message}
            open={open === 'alert'}
            handleClose={() => this.setState({ open: '' })}
          />
        </div>
      </>
    );
  }
}

export default withRouter(QnaManagementDetailContainer);
