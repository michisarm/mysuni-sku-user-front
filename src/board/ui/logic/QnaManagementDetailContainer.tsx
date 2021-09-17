import React from 'react';
import {
  ReactComponent,
  mobxHelper,
  reactAutobind,
} from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { SupportService } from '../../stores';
import QnaManagementDetailView from '../view/QnaManagementDetailView';
import depot from '@nara.drama/depot';
import { QnaState } from '../../model/vo/QnaState';
import { initUserIdentity } from '../../../shared/model/UserIdentity';
import { Button, Container, Icon, Segment } from 'semantic-ui-react';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { AlertWin, ConfirmWin } from '../../../shared';
import routePaths from '../../routePaths';
import OperatorModel from '../../model/vo/OperatorModel';

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

    await supportService.findAllCategories();
    const qna = await supportService.findQnaById(qnaId);
    this.getFileIds();

    if (qna.answer.modifier) {
      this.setFinalOperator(qna.answer.modifier);
    }
    if (qna.latestOperatorSentEmail) {
      this.setSendEmailOperator(qna.latestOperatorSentEmail.receiver);
    }

    if (qna.question.state !== QnaState.AnswerCompleted) {
      this.setState({ isUpdatable: true });
      supportService.changeQnaProps(
        'question.state',
        QnaState.QuestionReceived
      );
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

    modifiedAnswer(qna.answer.id).then(() => {
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
    } = supportService;

    return (
      <>
        <QnaManagementDetailView
          qna={qna}
          isUpdatable={isUpdatable}
          categoriesMap={categoriesMap}
          filesMap={filesMap}
          answerFilesMap={answerFilesMap}
          finalOperator={finalOperator}
          emailOperator={emailOperator}
          onClickList={this.onClickList}
          getFileBoxIdForReference={this.getFileBoxIdForReference}
          changeQnaProps={changeQnaProps}
        />
        <Segment className="full">
          <Container>
            <div className="actions bottom">
              {!isUpdatable ? (
                <Button
                  icon
                  className="left post edit"
                  onClick={() => {
                    changeQnaProps('question.state', QnaState.QuestionReceived);
                    this.setState({ isUpdatable: true });
                  }}
                >
                  <Icon className="edit24" />
                  <PolyglotText
                    id="support-QnaRead-수정"
                    defaultString="Edit"
                  />
                </Button>
              ) : (
                <Button
                  icon
                  className="left post edit"
                  onClick={this.onClickSave}
                >
                  <Icon className="edit24" />
                  Save
                </Button>
              )}
              <Button
                icon
                className="left post list2"
                onClick={this.onClickList}
              >
                <Icon className="list24" />
                <PolyglotText id="support-QnaRead-목록" defaultString="List" />
              </Button>
            </div>
          </Container>
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
      </>
    );
  }
}

export default withRouter(QnaManagementDetailContainer);
