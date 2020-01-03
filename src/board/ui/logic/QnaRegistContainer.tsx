import React from 'react';
import { Button, Form, Icon, Segment, Select } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps } from 'react-router';
import 'react-quill/dist/quill.snow.css';
import { ContentLayout, mobxHelper } from 'shared';
import { FileBox, PatronType } from '@nara.drama/depot';
import classNames from 'classnames';
import { BoardService, CategoryService, PostService } from '../../index';
import ConfirmWin from '../../../shared/ui/logic/ConfirmWin';
import AlertWin from '../../../shared/ui/logic/AlertWin';
import { PostModel } from '../../model/PostModel';
import Editor from './Editor';

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
}

@inject(mobxHelper.injectFrom(
  'board.boardService',
  'board.categoryService',
  'board.postService',
))
@observer
@reactAutobind
class QnaRegistContainer extends React.Component<Props, States> {
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
    };
  }

  componentDidMount(): void {
    //
    const { categoryService, postService } = this.props;
    if (postService && categoryService) {
      Promise.resolve()
        .then(() => {
          if (postService) postService.clearPost();
        })
        .then(() => {
          if (categoryService) categoryService.findCategoriesByBoardId('QNA');
        })
        .then(() => postService.changePostProps('boardId', 'QNA'));
    }
  }

  onChangerContentsProps(name: string, value: string) {
    //
    const { postService } = this.props;
    if (postService) postService.onChangerContentsProps(name, value);
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
    const { postService } = this.props;
    const { post } = this.props.postService || {} as PostService;

    if (postService) postService.registerPost(post);
    this.onClose('Q&A');
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
    if (postService) postService.changePostProps(name, value);
  }

  onClose(boardId: string) {
    this.props.history.push(`/board/support/${boardId}`);
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
    if (postService && post.contents) postService.onChangerContentsProps('contents.depotId', fileBoxId);
  }

  render() {
    //
    const { categorys } = this.props.categoryService || {} as CategoryService;
    const { post } = this.props.postService || {} as PostService;
    const { alertWinOpen, isBlankTarget, confirmWinOpen } = this.state;
    const questionType: any = [];

    categorys.forEach((data, index) => {
      questionType.push({ key: index, value: data.categoryId, text: data.name });
    }
    );

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
                <div className={classNames('ui right-top-count input', { focus: this.state.focus, write: this.state.write })}>
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
                      this.setState({ write: e.target.value });
                      this.onChangePostProps('title', e.target.value);
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
                    <div className="ui right-top-count input">
                      <span className="count">
                        <span className="now">0</span>/<span className="max">1000</span>
                      </span>
                      <Editor
                        post={post}
                        onChangeContentsProps={this.onChangerContentsProps}
                      />
                      <span className="validation">You can enter up to 1000 characters.</span>
                    </div>
                  </div>
                </div>
              </Form.Field>
              <Form.Field>
                <label>첨부파일</label>
                <Form>
                  <div className="lg-attach">
                    <div className="attach-inner">
                      <FileBox
                        patronType={PatronType.Audience}
                        patronKeyString="sampleAudience"
                        onChange={this.getFileBoxIdForReference}
                        pavilionId="samplePavilion"
                        id={post && post.contents && post.contents.depotId || ''}
                      />
                      <div className="bottom">
                        <span className="text1"><Icon className="info16" />
                          <span className="blind">information</span>
                          문서 및 이미지 파일을 업로드 가능합니다.
                        </span>
                      </div>
                    </div>
                  </div>
                </Form>
              </Form.Field>
              <div className="buttons">
                <Button className="fix line" onClick={() => this.onClose('Q&A')}>Close</Button>
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
          buttonYesName="저장"
          buttonNoName="취소"
        />
      </ContentLayout>
    );
  }
}

export default QnaRegistContainer;
