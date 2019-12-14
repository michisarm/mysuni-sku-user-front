import React from 'react';
import { Button, Form, Icon, Segment, Select } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';
import 'react-quill/dist/quill.snow.css';
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
}

@inject('boardService', 'categoryService', 'postService')
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
    this.onClose('qa');
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
    this.props.history.push(`/books/support/${boardId}`);
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
      <section className="content bg-white">
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Ask a Queation</div>
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
                <div className="ui right-top-count input">{/* .error */}
                  <span className="count"><span className="now">0</span>/<span className="max">100</span></span>
                  <input type="text"
                    placeholder="제목을 입력해주세요."
                    value={post && post.title || ''}
                    onChange={(e: any) => this.onChangePostProps('title', e.target.value)}
                  />
                  {/* 입력값이 있을경우 아이콘 활성화 됨. */}
                  <Icon className="clear link" />
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
                  <div className="ui input file">
                    <input type="text" readOnly />
                    <Icon className="clear link" />
                    <label htmlFor="hidden-new-file" className="ui button">파일찾기</label>
                    <input type="file" id="hidden-new-file" />
                  </div>
                </Form>
              </Form.Field>
              <div className="buttons">
                <Button className="fix line" onClick={() => this.onClose('qa')}>Close</Button>
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
      </section>
    );
  }
}

export default withRouter(QnaRegistContainer);
