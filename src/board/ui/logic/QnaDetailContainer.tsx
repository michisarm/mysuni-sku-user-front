import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Button, Container, Icon, Segment } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import { ContentLayout } from 'shared';
import DepotFileViewModel from '@nara.drama/depot/src/depot/ui/model/DepotFileViewModel';
import depot from '@nara.drama/depot';
import { CategoryService, PostService } from '../../index';
import ConfirmWin from '../../../shared/ui/logic/ConfirmWin';


interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService
  categoryService?: CategoryService
}

interface States {
  confirmWinOpen: boolean
  filesMap: Map<string, any>
}

@inject(mobxHelper.injectFrom(
  'board.postService',
  'board.categoryService',
))
@observer
@reactAutobind
class QnaDetailContainer extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    //
    super(props);
    this.state = {
      confirmWinOpen: false,
      filesMap: new Map<string, any>(),
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
        })
        .then(() => this.getFileIds());
    }
  }

  getFileIds() {
    //
    const { post } = this.props.postService || {} as PostService;
    const referenceFileBoxId = post && post.contents && post.contents.depotId;

    Promise.resolve()
      .then(() => {
        if (referenceFileBoxId) this.findFiles('reference', referenceFileBoxId);
      });
  }

  findFiles(type: string, fileBoxId: string) {
    const { filesMap } = this.state;
    depot.getDepotFiles(fileBoxId)
      .then(files => {
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
    const { filesMap } = this.state;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Support' },
          { text: 'Q&A' },
        ]}
      >
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
                    <Button icon className="left postset delete" onClick={() => this.deleteQnaDetail()}><Icon name="delete" />Delete</Button>
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
                    <span>첨부파일 :</span>
                    {
                      filesMap && filesMap.get('reference')
                      && filesMap.get('reference').map((foundedFile: DepotFileViewModel, index: number) => (
                        <a href="#" className="link" key={index}>
                          <span className="ellipsis" onClick={() => depot.downloadDepotFile(foundedFile.id)}>
                            {foundedFile.name}
                          </span>
                        </a>
                      )) || '-'
                    }
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
      </ContentLayout>
    );
  }
}

export default QnaDetailContainer;
