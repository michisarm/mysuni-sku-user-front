import React from 'react';
import { Button, Container, Icon, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps } from 'react-router';
import ReactQuill from 'react-quill';
import { CategoryService, PostService } from '../../index';
import ConfirmWin from '../../../shared/ui/logic/ConfirmWin';

interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService
  categoryService?: CategoryService
}

interface States {
  confirmWinOpen: boolean
}

@inject('postService', 'categoryService')
@observer
@reactAutobind
class QnaDetailContainer extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    //
    super(props);
    this.state = {
      confirmWinOpen: false,
    };
  }

  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, categoryService } = this.props;

    if (postService && categoryService ) {
      Promise.resolve()
        .then(() => postService.findPostByPostId(postId))
        .then(() => {
          if (postService.post.category.id) categoryService.findCategoryByCategoryId(postService.post.category.id);
        });
    }
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
    const { postId } = this.props.match.params;
    const { post } = this.props.postService || {} as PostService;
    Promise.resolve()
      .then(() => {
        post.deleted = true;
        if (postService) postService.modifyPost(postId, post);
      });
    this.onClose('Q&A');
  }

  deleteQnaDetail() {
    //
    this.setState({
      confirmWinOpen: true,
    });
  }

  onClose(boardId: string) {
    this.props.history.push(`/board/support/${boardId}`);
  }

  render() {
    //
    const { confirmWinOpen } = this.state;
    const { post } = this.props.postService || {} as PostService;
    const { category } = this.props.categoryService || {} as CategoryService;

    return (
      <section className="content support">
        <div className="post-view-wrap">
          <div className="post-view qna">
            {
            post && (
              <div className="title-area">
                <div className="title-inner">
                  <div className="title">
                    {post.title}
                  </div>
                  <div className="user-info">
                    <span className="category">{category.name}</span>
                    <span className="date">{post.time && new Date(post.time).toLocaleString()}</span>
                  </div>
                  <div className="actions">
                    <Button icon className="left postset delete"><Icon name="delete" onClick={() => this.deleteQnaDetail()} />Delete</Button>
                    <Button icon className="left postset commu-list16" onClick={() => this.onClose('Q&A')}><Icon className="commu-list16" />List</Button>
                  </div>
                </div>
              </div>
            )
          }
            {
            post && post.contents && (
              <div className="content-area">
                <div className="content-inner">
                  <ReactQuill
                    theme="bubble"
                    value={post && post.contents && post.contents.contents || ''}
                    readOnly
                  />
                  <div className="file">
                    <span>첨부파일 :</span> <a href="#" className="link"><span className="ellipsis">다운로드 Width값 700px 이후로는 말줌임 표시 부탁드립니다. Mobile_App_UI_UX_GUI_Design_Tutorials.pptx</span></a>
                  </div>
                </div>
              </div>
            )
          }
          </div>
          <Segment className="full">
            <Container>
              <div className="actions bottom">
                <Button icon className="left post delete" onClick={() => this.deleteQnaDetail()}>
                  <Icon className="del24" /> Delete
                </Button>
                <Button icon className="left post list2" onClick={() => this.onClose('Q&A')}>
                  <Icon className="list24" /> List
                </Button>
              </div>
              <ConfirmWin
                message="삭제하시겠습니까?"
                open={confirmWinOpen}
                handleClose={this.handleCloseConfirmWin}
                handleOk={this.handleOKConfirmWin}
                title="삭제안내"
                buttonYesName="저장"
                buttonNoName="취소"
              />
            </Container>
          </Segment>

        </div>
      </section>
    );
  }
}

export default QnaDetailContainer;
