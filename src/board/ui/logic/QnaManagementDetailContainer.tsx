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
  message: string;
  open: string;
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
    message: '',
    open: '',
  };

  componentDidMount() {
    //
    this.init();
  }

  async init() {
    //
    const { qnaId } = this.props.match.params;
    const { supportService } = this.injected;

    console.log(qnaId);

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
      this.setState({ message: '필수 항목을 입력해주세요', open: 'alert' });
      return;
    }

    const message = qna.checkMail
      ? '문의자에게 메일을 발송 하시겠습니까?'
      : '답변 정보를 등록 하시겠습니까?';

    this.setState({ message, open: 'confirm' });
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
    const { filesMap, isUpdatable, answerFilesMap, open, message } = this.state;
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
            finalOperator={finalOperator}
            onClickList={this.onClickList}
            renderState={this.renderState}
            getChannelToString={getChannelToString}
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
                  목록
                </Button>
                {!isUpdatable ? (
                  <Button
                    className="fix bg"
                    onClick={() => {
                      changeQnaProps('question.state', QnaState.AnswerWaiting);
                      this.setState({ isUpdatable: true });
                    }}
                  >
                    수정
                  </Button>
                ) : (
                  <Button className="fix bg" onClick={this.onClickSave}>
                    등록
                  </Button>
                )}
              </div>
            </div>
          </Segment>
          <ConfirmWin
            message={message}
            open={open === 'confirm'}
            handleClose={() => this.setState({ open: '' })}
            handleOk={this.onSave}
            title={getPolyglotText('등록 안내', 'support-QnaRead-등록안내')}
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
