
import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import classNames from 'classnames';
import moment from 'moment';
import { CommentService } from '@nara.drama/feedback';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { NoSuchContentPanel } from 'shared';
import { PostModel } from '../../model';
import { PostService } from '../../stores';
import routePaths from '../../routePaths';



interface Props extends RouteComponentProps {
  commentService?: CommentService
  postService?: PostService
}

interface State {
  offset: number
  feedbackIds: string[]
}

@inject(mobxHelper.injectFrom(
  'shared.commentService',
  'board.postService',
))
@observer
@reactAutobind
class NoticeListContainer extends Component<Props, State> {
  //
  BOARD_ID = 'NTC';

  PINNED_SIZE = 5;

  PAGE_SIZE = 10;

  state = {
    offset: 0,
    feedbackIds: [],
  };


  constructor(props: Props) {
    //
    super(props);
    this.props.postService!.clearPosts();
  }

  componentDidMount() {
    //
    this.findNoticePinnedPosts();
  }

  async findNoticePinnedPosts() {
    //
    const postService = this.props.postService!;

    const pinnedPosts = await postService.findPostsByBoardIdAndPinned(this.BOARD_ID, 0, this.PINNED_SIZE);
    const feedbackIds = pinnedPosts.results.map(post => post.commentFeedbackId);

    this.setState({ feedbackIds }, () => {
      //
      let count = pinnedPosts.totalCount;

      if (count > 5) {
        count = 5;
      }
      this.findNoticePosts(10 - count);
    });
  }

  async findNoticePosts(offset: number) {
    //
    const postService = this.props.postService!;
    const commentService = this.props.commentService!;

    const posts = await postService.findNoticePosts(0, offset);

    let feedbackIds = [ ...this.state.feedbackIds ];
    feedbackIds = feedbackIds.concat(posts.results.map((post: PostModel) => post.commentFeedbackId));

    this.setState({ offset: offset + this.PAGE_SIZE });
    commentService!.countByFeedbackIds(feedbackIds);
  }

  isNewPost(time: number) {
    //
    return time > 0 && new Date(time) > new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
  }

  onClickPost(postId: string) {
    //
    this.props.history.push(routePaths.supportNoticePost(postId));
  }

  renderPostRow(post: PostModel, index: number, pinned: boolean = false) {
    //
    const { commentCountMap } = this.props.commentService!;
    const count = commentCountMap.get(post.commentFeedbackId) || 0;

    return (
      <a
        key={index}
        target="_blank"
        className={classNames({
          row: true,
          important: post.pinned,
          new: this.isNewPost(post.time),
        })}
        onClick={() => this.onClickPost(post.postId)}
      >
        <span className="cell title">
          <span className="inner">
            <span className="ellipsis">{post.title}</span>
            { count > 0 && (
              <span className="rep-num">[<strong>{count}</strong>]</span>
            )}
          </span>
        </span>
        <span className="cell view">{post.readCount}명 읽음</span>
        <span className="cell date">{post.time && moment(post.time).format('YYYY.MM.DD')}</span>
      </a>
    );
  }

  render() {
    //
    const { postService } = this.props;
    const { offset } = this.state;
    const pinnedPosts = postService!.pinnedPosts.results;
    const posts = postService!.posts.results;
    const postTotalCount = postService!.posts.totalCount;

    if (pinnedPosts.length === 0 && posts.length === 0) {
      return (
        <Segment className="full">
          <NoSuchContentPanel message="등록된 Notice가 없습니다." />
        </Segment>
      );
    }

    return (
      <Segment className="full">
        <div className="support-list-wrap">
          <div className="su-list notice">
            { pinnedPosts.map((pinnedPost, index) =>
              this.renderPostRow(pinnedPost, index, true)
            )}

            { posts.map((post, index) =>
              this.renderPostRow(post, index)
            )}
          </div>

          {(( pinnedPosts.length > 0 || posts.length > 0 ) && posts.length < postTotalCount) && (
            <div className="more-comments" onClick={() => this.findNoticePosts(offset)}>
              <Button icon className="left moreview">
                <Icon className="moreview" />list more
              </Button>
            </div>
          )}
        </div>
      </Segment>
    );
  }
}

export default withRouter(NoticeListContainer);
