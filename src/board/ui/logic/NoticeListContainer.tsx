import React from 'react';
import {
  mobxHelper,
  reactAutobind,
  ReactComponent,
} from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import moment from 'moment';

import { CommentService } from '@nara.drama/feedback';
import { Input, Segment } from 'semantic-ui-react';
import { Loadingpanel } from 'shared';
import { PostModel } from '../../model';
import { PostService } from '../../stores';
import routePaths from '../../routePaths';
import { SharedService } from '../../../shared/stores';
import Pagination from '../../../shared/components/Pagination';
import NoticeListView from '../view/NoticeListView';

interface Props extends RouteComponentProps {}

interface State {
  offset: number;
  feedbackIds: string[];
  isLoading: boolean;
  keyword: string;
}

interface Injected {
  commentService: CommentService;
  postService: PostService;
  sharedService: SharedService;
}

@inject(
  mobxHelper.injectFrom(
    'shared.commentService',
    'shared.sharedService',
    'board.postService'
  )
)
@observer
@reactAutobind
class NoticeListContainer extends ReactComponent<Props, State, Injected> {
  //
  paginationKey = 'Notice';
  state = {
    offset: 0,
    feedbackIds: [],
    isLoading: false,
    keyword: '',
  };

  constructor(props: Props) {
    //
    super(props);
    this.injected.postService!.clearPosts();
  }

  componentDidMount() {
    //
    this.findNoticePosts();
  }

  async findNoticePosts() {
    //
    // this.setState({ isLoading: true });
    const { postService, commentService, sharedService } = this.injected;
    let pageModel = sharedService.getPageModel(this.paginationKey);

    if (pageModel.limit === 20) {
      sharedService.setPageMap(this.paginationKey, pageModel.offset, 10);
      pageModel = sharedService.getPageModel(this.paginationKey);
    }

    const posts = await postService.findNoticePosts(
      pageModel,
      this.state.keyword
    );
    let feedbackIds = [...this.state.feedbackIds];

    feedbackIds = feedbackIds.concat(
      posts.results.map((post: PostModel) => post.commentFeedbackId)
    );

    sharedService.setCount(this.paginationKey, posts.totalCount);
    commentService.countByFeedbackIds(feedbackIds);
    this.setState({ isLoading: false });
  }

  isNewPost(time: number) {
    //
    return (
      time > 0 &&
      moment(time).format('YYYYMMDD') ===
        moment(new Date().getTime()).format('YYYYMMDD')
      // new Date(time) > new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    );
  }

  onClickPost(postId: string) {
    //
    this.props.history.push(routePaths.supportNoticePost(postId));
  }

  render() {
    //
    const { postService, sharedService } = this.injected;
    const { isLoading, keyword } = this.state;
    const pinnedPosts = postService!.pinnedPosts.results;
    const posts = postService!.posts.results;
    const { startNo } = sharedService.getPageModel(this.paginationKey);

    return (
      <>
        <div className="support-list-wrap notice">
          <div className="list-top">
            <div className="list-top-left">
              총 <strong>{postService.posts.totalCount}</strong>개의 리스트가
              있습니다.
            </div>
            <div className="list-top-right">
              <Input
                // icon="icon search-32"
                icon={{
                  className: 'icon search-32',
                  link: true,
                }}
                className="s-search h38"
                value={keyword}
                placeholder="검색어를 입력하세요."
                onChange={(event, data) =>
                  this.setState({ keyword: data.value })
                }
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    this.findNoticePosts();
                  }
                }}
              />
            </div>
          </div>

          {isLoading ? (
            <Segment
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height: 400,
                boxShadow: '0 0 0 0',
                border: 0,
              }}
            >
              <Loadingpanel loading={isLoading} />
            </Segment>
          ) : (
            <>
              <Pagination
                name={this.paginationKey}
                onChange={this.findNoticePosts}
              >
                <div className="qna-admin-list-wrap">
                  <NoticeListView
                    posts={posts}
                    startNo={startNo}
                    onClickPost={this.onClickPost}
                    isNewPost={this.isNewPost}
                  />
                </div>

                <Pagination.Navigator styled />
              </Pagination>
            </>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(NoticeListContainer);
