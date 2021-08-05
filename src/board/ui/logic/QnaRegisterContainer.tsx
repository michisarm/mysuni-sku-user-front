import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import classNames from 'classnames';
import { Button, Form, Icon, Segment, Select } from 'semantic-ui-react';
import { depotHelper, AlertWin, ConfirmWin } from 'shared';
import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';

import routePaths from '../../routePaths';
import { PostModel } from '../../model';
import { BoardService, CategoryService, PostService } from '../../stores';
import { SkProfileService } from 'profile/stores';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props
  extends RouteComponentProps<{ sourceType: string; sourceId: string }> {
  boardService?: BoardService;
  categoryService?: CategoryService;
  skProfileService?: SkProfileService;
  postService?: PostService;
}

interface States {
  alertWinOpen: boolean;
  confirmWinOpen: boolean;
  isBlankTarget: string;
  focus: boolean;
  write: string;
  fieldName: string;
  length: number;
}

@inject(
  mobxHelper.injectFrom(
    'board.boardService',
    'board.categoryService',
    'board.postService',
    'profile.skProfileService'
  )
)
@observer
@reactAutobind
class QnaRegisterContainer extends React.Component<Props, States> {
  //
  state = {
    alertWinOpen: false,
    confirmWinOpen: false,
    isBlankTarget: '',
    focus: false,
    write: '',
    fieldName: '',
    length: 0,
  };

  componentDidMount(): void {
    const { postService, categoryService, skProfileService } = this.props;
    const { skProfile } = skProfileService!;
    const name = patronInfo.getPatronName() || '';
    const { email } = skProfileService!.skProfile;
    // postService.clearPost();
    categoryService!.findCategoriesByBoardId('QNA').then(() => {
      postService!.changePostProps('boardId', 'QNA');
      postService!.changePostProps('writer.name', name);
      postService!.changePostProps('writer.email', email);
      postService!.changePostProps('writer.companyName', skProfile.companyName);
      postService!.changePostProps(
        'writer.companyCode',
        skProfile.companyCode
        // skProfileService!.skProfile.companyName
      );
    });
  }

  componentWillUnmount(): void {
    //
    const { postService } = this.props;
    postService!.clearPost();
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

  handleOKConfirmWin() {
    //
    const { postService, history } = this.props;
    const { post } = postService!;
    const { params } = this.props.match;

    if (params.sourceType !== undefined && params.sourceId !== undefined) {
      post.config.sourceType = params.sourceType;
      post.config.sourceId = params.sourceId;
    }

    postService!
      .registerPost(post)
      .then((postId) =>
        history.push(routePaths.supportQnAPost(postId as string))
      );
    this.onClose();

    if (PostModel.isBlank(post) === 'success') {
      this.setState({ confirmWinOpen: true });
    } else {
      this.setState({
        isBlankTarget: PostModel.isBlank(post),
        alertWinOpen: true,
      });
    }
  }

  onChangePostProps(name: string, value: string | {}) {
    //
    const { postService } = this.props;
    postService!.changePostProps(name, value);
  }

  onClose() {
    this.props.history.push(routePaths.supportQnA());
  }

  onHandleSave() {
    //
    const { post } = this.props.postService!;

    if (PostModel.isBlank(post) === 'success') {
      this.setState({ confirmWinOpen: true });
    } else {
      this.setState({
        isBlankTarget: PostModel.isBlank(post),
        alertWinOpen: true,
      });
    }
  }

  getFileBoxIdForReference(fileBoxId: string) {
    //
    const { postService } = this.props;
    const { post } = postService!;

    if (post.contents) {
      postService!.changePostProps('contents.depotId', fileBoxId);
    }
  }

  render() {
    //
    const { categorys } = this.props.categoryService!;
    const { post } = this.props.postService!;
    const {
      focus,
      write,
      fieldName,
      alertWinOpen,
      isBlankTarget,
      confirmWinOpen,
    } = this.state;
    const questionType: any = [];

    // categorys.map((data, index) => {
    //   questionType.push({ key: index, value: data.categoryId, text: data.name });
    // });

    const currentUrl = window.location.href;

    if (currentUrl.includes('cube') || currentUrl.includes('course')) {
      categorys.map((data, index) => {
        if (
          (data && data.name ? parsePolyglotString(data && data.name) : '') ===
          'Contents'
        ) {
          questionType.push({
            key: index,
            value: data.categoryId,
            text: data.name,
          });
        }
      });
    } else {
      categorys.map((data, index) => {
        questionType.push({
          key: index,
          value: data.categoryId,
          text: data.name,
        });
      });
    }

    return (
      <>
        <Segment className="full">
          <div className="apl-form-wrap support">
            <Form>
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
                    <span className="now">
                      {(post &&
                        post.title &&
                        parsePolyglotString(post.title).length) ||
                        0}
                    </span>
                    /<span className="max">100</span>
                  </span>
                  <input
                    type="text"
                    placeholder={getPolyglotText(
                      '제목을 입력해주세요.',
                      'support-QnaWrite-제목입력'
                    )}
                    onClick={() => this.setState({ focus: true })}
                    onBlur={() => this.setState({ focus: false })}
                    value={
                      post && post.title ? parsePolyglotString(post.title) : ''
                    }
                    onChange={(e: any) => {
                      if (e.target.value.length > 100) {
                        this.setState({ fieldName: 'title' });
                      } else {
                        this.setState({ write: e.target.value, fieldName: '' });
                        this.onChangePostProps('title', e.target.value);
                      }
                    }}
                  />
                  <Icon
                    className="clear link"
                    onClick={(e: any) => {
                      this.setState({ write: '' });
                      this.onChangePostProps('title', e.target.value);
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
                    id="support-QnaWrite-문의유형"
                    defaultString="문의유형"
                  />
                </label>
                <div className="select-box">
                  <Select
                    placeholder={getPolyglotText(
                      '분류를 선택해주세요',
                      'support-QnaWrite-분류선택'
                    )}
                    className="dropdown selection"
                    options={questionType}
                    onChange={(e: any, data: any) =>
                      this.onChangePostProps('category', {
                        id: data.value,
                        name: e.target.innerText,
                      })
                    }
                  />
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
                        error: this.state.fieldName === 'contents.contents',
                      })}
                    >
                      {/* .error class 추가시 error ui 활성 */}
                      <span className="count">
                        <span className="now">{this.state.length}</span>/
                        <span className="max">1000</span>
                      </span>
                      {/*<Editor*/}
                      {/*  post={post}*/}
                      {/*  onChangeContentsProps={this.onChangerContentsProps}*/}
                      {/*/>*/}
                      <textarea
                        value={
                          (post &&
                            post.contents &&
                            post.contents.contents &&
                            parsePolyglotString(post.contents.contents)) ||
                          ''
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length > 1000) {
                            this.setState({ fieldName: 'contents.contents' });
                          } else {
                            this.onChangePostProps('contents.contents', value);
                            this.setState({
                              length: value.length,
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
                <Form>
                  <div className="line-attach width-sm">
                    <div className="attach-inner">
                      <FileBox
                        id={
                          (post && post.contents && post.contents.depotId) || ''
                        }
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
                      {/*<div className="bottom">*/}
                      {/*  <span className="text1"><Icon className="info16" />*/}
                      {/*    <span className="blind">information</span>*/}
                      {/*    문서 및 이미지 파일을 업로드 가능합니다.*/}
                      {/*  </span>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </Form>
              </Form.Field>
              <div className="buttons">
                <Button className="fix line" onClick={this.onClose}>
                  <PolyglotText
                    id="support-QnaWrite-닫기"
                    defaultString="Close"
                  />
                </Button>
                <Button className="fix bg" onClick={this.onHandleSave}>
                  <PolyglotText
                    id="support-QnaWrite-제출"
                    defaultString="Submit"
                  />
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
      </>
    );
  }
}

export default withRouter(QnaRegisterContainer);
