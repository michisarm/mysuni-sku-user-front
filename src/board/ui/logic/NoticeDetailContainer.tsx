import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { CommentList } from '@nara.drama/feedback';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Button, Icon, Segment } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { PostService } from '../../../board';


interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService;
}

@inject(mobxHelper.injectFrom(
  'board.postService',
))
@observer
@reactAutobind
class NoticeDetailContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService } = this.props;
    if (postService) postService.findPostByPostId(postId);
  }

  onClose(boardId: string) {
    this.props.history.push(`/board/support/${boardId}`);
  }

  getFeedbackId(feedbackId: string) {
    const { postService } = this.props;
    if (postService) {
      const { post } = postService!;
      postService.changePostProps('commentFeedbackId', feedbackId);
      postService.modifyPost(post.id, post)
        .then(() => postService!.findPostByPostId(post.id));
    }
  }

  render() {
    //
    const { post } = this.props.postService || {} as PostService;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Support' },
          { text: 'Notice' },
        ]}
      >
        <div className="post-view-wrap">
          <div className="post-view">
            {
              post && (
                <div className="title-area">
                  <div className="title-inner">
                    <div className="title">{post.title}</div>
                    <div className="user-info">
                      <span className="date">{post.time && moment(post.time).format('YYYY.MM.DD')}</span>
                    </div>
                    <div className="actions">
                      <Button icon className="left postset commu-list16" onClick={() => this.onClose('Notice')}><Icon className="commu-list16" />List</Button>
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
              <Button icon className="left post list2" onClick={() => this.onClose('Notice')}>
                <Icon className="list24" /> List
              </Button>
            </div>
          </Segment>
        </div>
      </ContentLayout>
    );
  }
}

export default NoticeDetailContainer;
