import React, { Component } from 'react';
import {
  reactAutobind,
  mobxHelper,
  reactAlert,
  reactConfirm,
} from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Container, Icon, Segment } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import depot, { DepotFileViewModel } from '@nara.drama/depot';

import { ConfirmWin } from 'shared';
import routePaths from '../../routePaths';
import { CategoryService, PostService } from '../../stores';
import BoardDetailContentHeaderView from '../view/BoardDetailContentHeaderView';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService;
  categoryService?: CategoryService;
}

interface States {
  isEdit: boolean;
  confirmWinOpen: boolean;
  filesMap: Map<string, any>;
}

@inject(mobxHelper.injectFrom('board.postService', 'board.categoryService'))
@observer
@reactAutobind
class QnaDetailContainer extends Component<Props, States> {
  //
  constructor(props: Props) {
    //
    super(props);
    this.state = {
      isEdit: false,
      confirmWinOpen: false,
      filesMap: new Map<string, any>(),
    };
  }

  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, categoryService } = this.props;

    if (postService && categoryService) {
      Promise.resolve()
        .then(() => postService.findPostByPostId(postId))
        .then(() => {
          if (postService.post.category.id) {
            categoryService.findCategoryByCategoryId(
              postService.post.category.id
            );
          }
        })
        .then(() => this.getFileIds());
    }
  }

  componentWillUnmount(): void {
    const { postService } = this.props;
    postService!.clearPost();
  }

  getFileIds() {
    //
    const { post } = this.props.postService || ({} as PostService);
    const referenceFileBoxId = post && post.contents && post.contents.depotId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) this.findFiles('reference', referenceFileBoxId);
    });
  }

  findFiles(type: string, fileBoxId: string) {
    const { filesMap } = this.state;
    depot.getDepotFiles(fileBoxId).then((files) => {
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
    const { post } = this.props.postService || ({} as PostService);
    Promise.resolve().then(() => {
      post.deleted = true;
      if (postService) {
        postService.deletePost(postId, post).then(() => {
          window.location.href =
            process.env.PUBLIC_URL + routePaths.supportQnA();
        });
      }
    });
    //this.onClickList();
  }

  deleteQnaDetail() {
    //
    this.setState({
      confirmWinOpen: true,
    });
  }

  /*
  Q&A 수정
  */
  modifyQnaDetail() {
    //
    const { params } = this.props.match;

    reactConfirm({
      title: getPolyglotText('수정 안내', 'support-QnaRead-수정안내'),
      message: getPolyglotText('수정 하시겠습니까?', 'support-QnaRead-수정mg'),
      warning: true,
      onOk: () => this.handleModifyOKConfirmWin(),
    });
  }

  // modifyQnaDetail() {
  //   //
  //   this.setState({
  //     modifyWinOpen: true,
  //   });
  // }

  // handleModifyCloseConfirmWin() {
  //   //
  //   this.setState({
  //     modifyWinOpen: false,
  //   });
  // }

  handleModifyOKConfirmWin() {
    //
    const { postService } = this.props;
    const { postId } = this.props.match.params;
    const { post } = this.props.postService || ({} as PostService);
    Promise.resolve().then(() => {
      if (postService) postService.modifyPost(postId, post);
    });
    this.onClickList();
    this.setState({ isEdit: false });
  }

  onClickList() {
    this.props.history.push(routePaths.supportQnA());
  }

  onClickModify() {
    const { postId } = this.props.match.params;
    this.props.history.push(routePaths.supportQnAModifyPost(postId));
  }

  render() {
    //
    const { confirmWinOpen, isEdit } = this.state;
    const { post } = this.props.postService!;
    const { category } = this.props.categoryService!;
    const { filesMap } = this.state;

    return (
      <>
        <div className="post-view qna">
          <BoardDetailContentHeaderView
            deletable
            title={post.title}
            time={post.time}
            subField={<span className="category">{category.name}</span>}
            onClickList={this.onClickList}
            onClickDelete={this.deleteQnaDetail}
            // onClickModify={this.onClickModify}
          />

          {post.contents && (
            <div className="content-area">
              <div className="content-inner">
                <ReactQuill
                  theme="bubble"
                  value={post.contents.contents || ''}
                  readOnly
                />
                <div className="file">
                  <span>
                    <PolyglotText
                      id="support-QnaRead-첨부파일"
                      defaultString="첨부파일 :"
                    />
                  </span>
                  <br />
                  {(filesMap &&
                    filesMap.get('reference') &&
                    filesMap
                      .get('reference')
                      .map((foundedFile: DepotFileViewModel, index: number) => (
                        <div>
                          <a href="#" className="link" key={index}>
                            <span
                              className="ellipsis"
                              onClick={(e) => {
                                depot.downloadDepotFile(foundedFile.id);
                                e.preventDefault();
                              }}
                            >
                              {'    ' + foundedFile.name + '     '}
                            </span>
                            <br />
                          </a>
                          <br />
                        </div>
                      ))) ||
                    ''}
                </div>
                <br />
              </div>
            </div>
          )}
        </div>
        <Segment className="full">
          <Container>
            <div className="actions bottom">
              {isEdit && (
                <Button
                  icon
                  className="left post edit"
                  onClick={() => this.onClickModify()}
                >
                  <Icon className="edit24" />{' '}
                  <PolyglotText
                    id="support-QnaRead-수정"
                    defaultString="Edit"
                  />
                </Button>
              )}

              <Button
                icon
                className="left post delete"
                onClick={() => this.deleteQnaDetail()}
              >
                <Icon className="del24" />{' '}
                <PolyglotText
                  id="support-QnaRead-삭제"
                  defaultString="Delete"
                />
              </Button>
              <Button
                icon
                className="left post list2"
                onClick={this.onClickList}
              >
                <Icon className="list24" />{' '}
                <PolyglotText id="support-QnaRead-목록" defaultString="List" />
              </Button>
            </div>

            <ConfirmWin
              message={getPolyglotText(
                '삭제 하시겠습니까?',
                'support-QnaRead-삭제mg'
              )}
              open={confirmWinOpen}
              handleClose={this.handleCloseConfirmWin}
              handleOk={this.handleOKConfirmWin}
              title={getPolyglotText('삭제 안내', 'support-QnaRead-삭제안내')}
              buttonYesName={getPolyglotText('OK', 'support-QnaRead-ok버튼')}
              buttonNoName={getPolyglotText(
                'Cancel',
                'support-QnaRead-취소버튼'
              )}
            />
          </Container>
        </Segment>
      </>
    );
  }
}

export default withRouter(QnaDetailContainer);
