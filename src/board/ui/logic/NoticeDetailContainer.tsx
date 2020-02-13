
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { CommentList } from '@nara.drama/feedback';
import { Button, Icon, Segment } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import routePaths from '../../routePaths';
import { PostService } from '../../stores';
import BoardDetailContentHeaderView from '../view/BoardDetailContentHeaderView';


interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService;
}

interface State {
  filesMap: Map<string, any>
}

@inject(mobxHelper.injectFrom(
  'board.postService',
))
@observer
@reactAutobind
class NoticeDetailContainer extends React.Component<Props, State> {
  //
  state = {
    filesMap: new Map<string, any>(),
  };


  constructor(props: Props) {
    //
    super(props);
    props.postService!.clearPost();
  }

  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const postService = this.props.postService!;

    postService.findPostByPostId(postId)
      .then(() => this.getFileIds());
  }

  onClickList() {
    this.props.history.push(routePaths.supportNotice());
  }

  getFileIds() {
    //
    const { post } = this.props.postService!;
    const referenceFileBoxId = post && post.contents && post.contents.depotId;

    if (referenceFileBoxId) {
      this.findFiles('reference', referenceFileBoxId);
    }
  }

  async findFiles(type: string, fileBoxId: string) {
    //
    const { filesMap } = this.state;

    const files = await depot.getDepotFiles(fileBoxId);

    filesMap.set(type, files);
    const newMap = new Map(filesMap.set(type, files));
    this.setState({ filesMap: newMap });
  }

  getFeedbackId(feedbackId: string) {
    //
    const postService = this.props.postService!;
    const { post } = postService!;

    postService.changePostProps('commentFeedbackId', feedbackId);
    postService.modifyPost(post.id, post)
      .then(() => postService!.findPostByPostId(post.id));
  }

  render() {
    //
    const { post } = this.props.postService!;
    const { filesMap } = this.state;

    return (
      <>
        <div className="post-view">
          <BoardDetailContentHeaderView
            post={post}
            onClickList={this.onClickList}
          />

          {
            post && post.contents && (
              <div className="content-area">
                <div className="content-inner">
                  <ReactQuill
                    readOnly
                    theme="bubble"
                    value={post && post.contents && post.contents.contents || ''}
                  />
                </div>
                <div className="file">
                  <span>첨부파일 : </span>
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
            )
          }
        </div>

        <Segment className="full">
          <div className="comment-area">
            <CommentList
              feedbackId={post && post.commentFeedbackId || ''}
              getFeedbackId={this.getFeedbackId}
              hideCamera
            />
          </div>
          <div className="actions bottom">
            <Button icon className="left post list2" onClick={this.onClickList}>
              <Icon className="list24" /> List
            </Button>
          </div>
        </Segment>
      </>
    );
  }
}

export default withRouter(NoticeDetailContainer);
