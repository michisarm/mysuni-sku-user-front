import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import {
  mobxHelper,
  reactAutobind,
  ReactComponent,
} from '@nara.platform/accent';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Form, Icon, Segment, Select } from 'semantic-ui-react';
import { AlertWin, ConfirmWin, depotHelper } from 'shared';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import QnAModel from '../../model/QnAModel';
import QuestionSdo from '../../model/sdo/QuestionSdo';
import SupportService from '../../present/logic/SupportService';
import routePaths from '../../routePaths';
import { BoardService } from '../../stores';
import FaqListModal from './FaqListModal';

interface Props
  extends RouteComponentProps<{ sourceType: string; sourceId: string }> {
  boardService?: BoardService;
  skProfileService?: SkProfileService;
}

interface States {
  alertWinOpen: boolean;
  confirmWinOpen: boolean;
  confirmRouteWinOpen: boolean;
  isBlankTarget: string;
  focus: boolean;
  write: string;
  fieldName: string;
  length: number;
}

interface Injected {
  supportService: SupportService;
}

@inject(
  mobxHelper.injectFrom(
    'board.boardService',
    'board.supportService',
    'profile.skProfileService'
  )
)
@observer
@reactAutobind
class QnaRegisterContainer extends ReactComponent<Props, States, Injected> {
  //
  state = {
    alertWinOpen: false,
    confirmWinOpen: false,
    confirmRouteWinOpen: false,
    isBlankTarget: '',
    focus: false,
    write: '',
    fieldName: '',
    length: 0,
  };

  componentDidMount(): void {
    this.init();
  }

  async init() {
    const { supportService } = this.injected;
    await supportService.findAllCategories();
    supportService.clearQna();

    if (this.props.match.params.sourceId) {
      this.onChangeQnAProps('question.mainCategoryId', 'CATEGORY-1');
      this.onChangeQnAProps('question.subCategoryId', 'CATEGORY-a');
    }
  }

  componentWillUnmount(): void {
    //
    const { supportService } = this.injected;
    supportService.clearQna();
  }

  handleCloseAlertWin() {
    //
    this.setState({
      alertWinOpen: false,
    });
  }

  handleCloseConfirmWin() {
    //
    this.setState({
      confirmWinOpen: false,
    });
  }

  handleCloseRouteConfirmWin() {
    //
    this.setState({
      confirmRouteWinOpen: false,
    });
  }

  async handleOKConfirmWin() {
    //
    const { supportService } = this.injected;
    const { sourceId } = this.props.match.params;
    const { qna } = supportService;

    this.onClose();
    await supportService.registerQuestion(
      QnAModel.asQuestionSdo(qna, sourceId)
    );
    this.props.history.push(routePaths.supportQnA());
  }

  async handleOKRouteConfirmWin() {
    //
    this.setState({ confirmRouteWinOpen: false });
    this.props.history.push(routePaths.supportQnA());
  }

  onChangeQnAProps(name: string, value: any) {
    //
    const { supportService } = this.injected;
    supportService.changeQnaProps(name, value);
  }

  onClose() {
    this.setState({ confirmWinOpen: false, confirmRouteWinOpen: false });
  }

  routeToQnAList() {
    this.setState({ confirmRouteWinOpen: true });
  }

  onHandleSave() {
    //
    const { supportService } = this.injected;
    const { qna } = supportService;
    const { sourceId } = this.props.match.params;

    if (
      QuestionSdo.isBlank(QnAModel.asQuestionSdo(qna, sourceId)) === 'success'
    ) {
      this.setState({ confirmWinOpen: true });
    } else {
      this.setState({
        isBlankTarget: QuestionSdo.isBlank(
          QnAModel.asQuestionSdo(qna, sourceId)
        ),
        alertWinOpen: true,
      });
    }
  }

  getFileBoxIdForReference(fileBoxId: string) {
    //
    // if (!fileBoxId) {
    const { supportService } = this.injected;
    supportService.changeQnaProps('question.depotId', fileBoxId);
  }

  render() {
    //
    const {
      focus,
      write,
      fieldName,
      alertWinOpen,
      isBlankTarget,
      confirmWinOpen,
      confirmRouteWinOpen,
    } = this.state;

    const { supportService } = this.injected;
    const { getMainCategorySelect, getSubCategorySelect } = supportService;
    const { qna } = supportService;

    console.log(qna);

    return (
      <>
        <Segment className="full qna-write-content">
          <div className="apl-form-wrap support">
            <Form>
              <Form.Field>
                <label>
                  <span className="label-text">
                    <PolyglotText
                      id="support-QnaWrite-문의유형"
                      defaultString="문의유형"
                    />
                  </span>
                  <FaqListModal />
                </label>
                <div className="select-box">
                  <Select
                    placeholder={getPolyglotText(
                      '분류를 선택해주세요',
                      'support-QnaWrite-분류선택'
                    )}
                    className="trig-pop-faq"
                    options={getMainCategorySelect()}
                    value={qna.question.mainCategoryId}
                    onChange={(e: any, data: any) =>
                      this.onChangeQnAProps(
                        'question.mainCategoryId',
                        data.value
                      )
                    }
                  />
                  <Select
                    placeholder={getPolyglotText(
                      '분류를 선택해주세요',
                      'support-QnaWrite-분류선택'
                    )}
                    // className="ui selection dropdown"
                    options={getSubCategorySelect(qna.question.mainCategoryId)}
                    value={qna.question.subCategoryId}
                    onChange={(e: any, data: any) =>
                      this.onChangeQnAProps(
                        'question.subCategoryId',
                        data.value
                      )
                    }
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <label>
                  <PolyglotText
                    id="support-QnaWrite-제목"
                    defaultString="제목"
                  />
                </label>
                <div
                  className={classNames('ui right-top-count input', {
                    focus,
                    write,
                    error: fieldName === 'title',
                  })}
                >
                  <span className="count">
                    <span className="now">{qna.question.title.length}</span>/
                    <span className="max">100</span>
                  </span>
                  <input
                    type="text"
                    placeholder={getPolyglotText(
                      '제목을 입력해주세요.',
                      'support-QnaWrite-제목입력'
                    )}
                    onClick={() => this.setState({ focus: true })}
                    onBlur={() => this.setState({ focus: false })}
                    value={qna.question.title}
                    onChange={(e: any) => {
                      if (e.target.value.length > 100) {
                        this.setState({ fieldName: 'title' });
                      } else {
                        const value = e.target.value;
                        this.setState({ write: value, fieldName: '' });
                        this.onChangeQnAProps('question.title', value);
                      }
                    }}
                  />
                  <Icon
                    className="clear link"
                    onClick={(e: any) => {
                      this.setState({ write: '' });
                      this.onChangeQnAProps('question.title', '');
                    }}
                  />
                  <span className="validation">
                    <PolyglotText
                      id="support-QnaWrite-백자안내"
                      defaultString="You can enter up to 100 characters."
                    />
                  </span>
                </div>
              </Form.Field>
              <Form.Field>
                <label>
                  <PolyglotText
                    id="support-QnaWrite-내용"
                    defaultString="내용"
                  />
                </label>
                <div className="ui editor-wrap">
                  <div className="ui form">
                    <div
                      className={classNames('ui right-top-count input', {
                        error: this.state.fieldName === 'question.content',
                      })}
                    >
                      {/* .error class 추가시 error ui 활성 */}
                      <span className="count">
                        <span className="now">
                          {qna.question.content.length}
                        </span>
                        /<span className="max">1000</span>
                      </span>
                      <textarea
                        value={qna.question.content}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length > 1000) {
                            this.setState({ fieldName: 'question.content' });
                          } else {
                            this.onChangeQnAProps('question.content', value);
                            this.setState({
                              fieldName: '',
                            });
                          }
                        }}
                      />

                      <span className="validation">
                        <PolyglotText
                          id="support-QnaWrite-천자안내"
                          defaultString="You can enter up to 1000 characters."
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Form.Field>
              <Form.Field>
                <label>
                  <PolyglotText
                    id="support-QnaWrite-첨부파일"
                    defaultString="첨부파일"
                  />
                </label>
                {/*<Form>*/}
                <div className="lg-attach">
                  <div className="attach-inner">
                    <FileBox
                      id={(qna && qna.question && qna.question.depotId) || ''}
                      vaultKey={{
                        keyString: 'qna-sample',
                        patronType: PatronType.Audience,
                      }}
                      patronKey={{
                        keyString: 'qna-sample',
                        patronType: PatronType.Audience,
                      }}
                      validations={[
                        {
                          type: ValidationType.Duplication,
                          validator: depotHelper.duplicationValidator,
                        },
                      ]}
                      onChange={this.getFileBoxIdForReference}
                    />
                    <div className="bottom">
                      {/*<span className="text1"><Icon className="info16" />*/}
                      {/*<span className="blind">information</span>*/}
                      {/*문서 및 이미지 파일을 업로드 가능합니다.*/}
                      {/*</span>*/}
                    </div>
                  </div>
                </div>
                {/*</Form>*/}
              </Form.Field>
              <div className="buttons">
                <Button className="fix line" onClick={this.routeToQnAList}>
                  {/*<PolyglotText*/}
                  {/*  id="support-QnaWrite-닫기"*/}
                  {/*  defaultString="Close"*/}
                  {/*/>*/}
                  {getPolyglotText('목록', 'support-qna-list-btn')}
                </Button>
                <Button className="fix bg" onClick={this.onHandleSave}>
                  {/*<PolyglotText*/}
                  {/*  id="support-QnaWrite-제출"*/}
                  {/*  defaultString="Submit"*/}
                  {/*/>*/}
                  {getPolyglotText('등록', 'support-qnamgt-등록')}
                </Button>
              </div>
            </Form>
          </div>
        </Segment>
        <AlertWin
          target={isBlankTarget}
          open={alertWinOpen}
          handleClose={this.handleCloseAlertWin}
        />
        <ConfirmWin
          message={getPolyglotText(
            '저장하시겠습니까?',
            'support-QnaWrite-저장mg'
          )}
          open={confirmWinOpen}
          title={getPolyglotText('저장안내', 'support-QnaWrite-저장tt')}
          buttonYesName={getPolyglotText('OK', 'support-QnaWrite-ok')}
          buttonNoName={getPolyglotText('Cancel', 'support-QnaWrite-cancel')}
          handleClose={this.handleCloseConfirmWin}
          handleOk={this.handleOKConfirmWin}
        />
        {/* TODO:다국어처리 필요 */}
        <ConfirmWin
          message={getPolyglotText(
            '목록으로 이동하시겠습니까? 작성한 내용이 저장되지 않습니다.',
            'support-QnaWrite-목록mg'
          )}
          open={confirmRouteWinOpen}
          title={getPolyglotText('안내', 'support-QnaWrite-목록tt')}
          buttonYesName={getPolyglotText('OK', 'support-QnaWrite-ok')}
          buttonNoName={getPolyglotText('Cancel', 'support-QnaWrite-cancel')}
          handleClose={this.handleCloseRouteConfirmWin}
          handleOk={this.handleOKRouteConfirmWin}
        />
      </>
    );
  }
}

export default withRouter(QnaRegisterContainer);
