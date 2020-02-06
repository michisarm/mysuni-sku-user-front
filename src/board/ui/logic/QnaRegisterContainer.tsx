
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { Button, Form, Icon, Segment, Select } from 'semantic-ui-react';
import 'react-quill/dist/quill.snow.css';
import { ContentLayout, depotHelper } from 'shared';
import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import classNames from 'classnames';
import routePaths from '../../routePaths';
import { BoardService, CategoryService, PostService } from '../..';
import ConfirmWin from '../../../shared/ui/logic/ConfirmWin';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import { PostModel } from '../../model/PostModel';
// import Editor from './Editor';


interface Props extends RouteComponentProps<{ boardId: string }> {
  boardService?: BoardService,
  categoryService?: CategoryService,
  postService?: PostService,
}

interface States {
  alertWinOpen: boolean
  confirmWinOpen: boolean
  isBlankTarget: string
  focus: boolean
  write: string
  fieldName: string
  length: number
}

@inject(mobxHelper.injectFrom(
  'board.boardService',
  'board.categoryService',
  'board.postService',
))
@observer
@reactAutobind
class QnaRegisterContainer extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    //
    super(props);
    this.state = {
      alertWinOpen: false,
      confirmWinOpen: false,
      isBlankTarget: '',
      focus: false,
      write: '',
      fieldName: '',
      length: 0,
    };
  }

  componentDidMount(): void {
    //
    const categoryService = this.props.categoryService!;
    const postService = this.props.postService!;
    const name = patronInfo.getPatronName() || '';
    const email = patronInfo.getPatronEmail() || '';

    Promise.resolve()
      .then(() => {
        postService.clearPost();
      })
      .then(() => {
        categoryService.findCategoriesByBoardId('QNA');
      })
      .then(() => postService.changePostProps('boardId', 'QNA'))
      .then(() => postService.changePostProps('writer.name', name))
      .then(() => postService.changePostProps('writer.email', email));
  }

  componentWillUnmount(): void {
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

    postService!.registerPost(post)
      .then((postId) => history.push(routePaths.supportQnAPost(postId as string)));

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
    const { post } = this.props.postService || {} as PostService;

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
    const { post } = postService || {} as PostService;

    if (post.contents) postService!.changePostProps('contents.depotId', fileBoxId);
  }

  render() {
    //
    const { categorys } = this.props.categoryService!;
    const { post } = this.props.postService!;
    const { alertWinOpen, isBlankTarget, confirmWinOpen } = this.state;
    const questionType: any = [];

    categorys.map((data, index) => {
      questionType.push({ key: index, value: data.categoryId, text: data.name });
    });

    return (
      <ContentLayout className="bg-white">
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Ask a Question</div>
            <div className="apl-notice">
              현재 1:1 문의 답변에 평균 7일 ~ 14일 정도 소요될 수 있으며, 확인이 필요한 문의의 경우 20일 이상 지연될 수 있습니다.<br />
              신속하게 답변드릴 수 있도록 최선을 다하겠습니다. 기본적인 문의의 경우 FAQ를 통해 관련 내용을 확인하실 수 있으니 참고 부탁드립니다.
            </div>
          </div>
        </div>

        <Segment className="full">
          <div className="apl-form-wrap support">
            <Form>
              <Form.Field>
                <label>제목</label>
                <div className={classNames('ui right-top-count input', { focus: this.state.focus, write: this.state.write, error: this.state.fieldName === 'title' })}>
                  <span className="count">
                    <span className="now">{post && post.title && post.title.length || 0}</span>/
                    <span className="max">100</span>
                  </span>
                  <input type="text"
                    placeholder="제목을 입력해주세요."
                    onClick={() => this.setState({ focus: true })}
                    onBlur={() => this.setState({ focus: false })}
                    value={post && post.title || ''}
                    onChange={(e: any) => {
                      if (e.target.value.length > 100 ) {
                        this.setState({ fieldName: 'title' });
                      } else {
                        this.setState({ write: e.target.value, fieldName: '' });
                        this.onChangePostProps('title', e.target.value);
                      }
                    }}
                  />
                  <Icon className="clear link"
                    onClick={(e:any) => {
                      this.setState({ write: '' });
                      this.onChangePostProps('title', e.target.value);
                    }}
                  />
                  <span className="validation">You can enter up to 100 characters.</span>
                </div>
              </Form.Field>
              <Form.Field>
                <label>문의유형</label>
                <div className="select-box">
                  <Select placeholder="분류를 선택해주세요"
                    className="dropdown selection"
                    options={questionType}
                    onChange={(e: any, data: any) => this.onChangePostProps('category', {
                      id: data.value,
                      name: e.target.innerText,
                    })}
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <label>내용</label>
                <div className="ui editor-wrap">
                  <div className="ui form">
                    <div className={classNames('ui right-top-count input', { error: this.state.fieldName === 'contents.contents' })}>{/* .error class 추가시 error ui 활성 */}
                      <span className="count">
                        <span className="now">{this.state.length}</span>/<span className="max">1000</span>
                      </span>
                      {/*<Editor*/}
                      {/*  post={post}*/}
                      {/*  onChangeContentsProps={this.onChangerContentsProps}*/}
                      {/*/>*/}
                      <textarea
                        value={post && post.contents && post.contents.contents || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length > 1000) {
                            this.setState({ fieldName: 'contents.contents' });
                          } else {
                            this.onChangePostProps('contents.contents', value);
                            this.setState({ length: value.length, fieldName: '' });
                          }
                        }}
                      />

                      <span className="validation">You can enter up to 1000 characters.</span>
                    </div>
                  </div>
                </div>
              </Form.Field>
              <Form.Field>
                <label>첨부파일</label>
                <Form>
                  <div className="line-attach width-sm">
                    <div className="attach-inner">
                      <FileBox
                        vaultKey={{ keyString: 'qna-sample', patronType: PatronType.Audience }}
                        patronKey={{ keyString: 'qna-sample', patronType: PatronType.Audience }}
                        validations={[{ type: ValidationType.Duplication, validator: depotHelper.duplicationValidator }]}
                        onChange={this.getFileBoxIdForReference}
                        id={post && post.contents && post.contents.depotId || ''}
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
                <Button className="fix line" onClick={this.onClose}>Close</Button>
                <Button className="fix bg" onClick={this.onHandleSave}>Submit</Button>
              </div>
            </Form>
          </div>
        </Segment>
        <AlertWin
          target={isBlankTarget}
          handleClose={this.handleCloseAlertWin}
          open={alertWinOpen}
        />
        <ConfirmWin
          message="저장하시겠습니까?"
          open={confirmWinOpen}
          handleClose={this.handleCloseConfirmWin}
          handleOk={this.handleOKConfirmWin}
          title="저장안내"
          buttonYesName="OK"
          buttonNoName="Cancel"
        />
      </ContentLayout>
    );
  }
}

export default QnaRegisterContainer;
