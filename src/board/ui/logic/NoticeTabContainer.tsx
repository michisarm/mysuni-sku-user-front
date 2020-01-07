import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon, Segment } from 'semantic-ui-react';
import { PostService } from '../../../board';
import { DatePeriod } from '../../../shared';

interface Props {
  postService?: PostService
  disabled: boolean
  end: number
  findNoticePosts: (end: number) => void
  routeToNoticeDetail: (postId: string) => void
}

@inject(mobxHelper.injectFrom(
  'board.postService',
))
@observer
@reactAutobind
class NoticeTabContainer extends React.Component<Props> {

  render() {
    //
    const { posts, pinnedPosts } = this.props.postService || {} as PostService;
    const { findNoticePosts, disabled, end, routeToNoticeDetail } = this.props;
    const result = posts.results;
    const pinnedResult = pinnedPosts.results;

    return (
      <Segment className="full">
        <div className="support-list-wrap">
          <div className="su-list notice">
            <>
              {
              pinnedResult && pinnedResult.length && pinnedResult.map((pinnedPost, index) => {
                if (pinnedPost.time && new Date(pinnedPost.time) > new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) {
                  return (
                    <a target="_blank" className="row important new" key={index} onClick={() => routeToNoticeDetail(pinnedPost.postId)}>
                      <span className="cell title">
                        <span className="inner">
                          <span className="ellipsis">{pinnedPost.title}</span>
                        </span>
                      </span>
                      <span className="cell view">{pinnedPost.readCount}명 읽음</span>
                      <span className="cell date">{pinnedPost.time && DatePeriod.changeDateToStringSupport(new Date(pinnedPost.time))}</span>
                    </a>
                  );
                } else {
                  return (
                    <a target="_blank" className="row important" key={index} onClick={() => routeToNoticeDetail(pinnedPost.postId)}>
                      <span className="cell title">
                        <span className="inner">
                          <span className="ellipsis">{pinnedPost.title}</span>
                          {/*<Link to={`/books/notice-detail/${pinnedPost.postId}`}>{pinnedPost.title}</Link>*/}
                        </span>
                      </span>
                      <span className="cell view">{pinnedPost.readCount}명 읽음</span>
                      <span className="cell date">{pinnedPost.time && DatePeriod.changeDateToStringSupport(new Date(pinnedPost.time))}</span>
                    </a>
                  );
                }
              }) || ''
            }
              {
            result && result.length && result.map((post, index) => {
              if (post && post.pinned === true) {
                return (
                  <a target="_blank" className="row important" key={index} onClick={() => routeToNoticeDetail(post.postId)}>
                    <span className="cell title">
                      <span className="inner">
                        <span className="ellipsis">{post.title}</span>
                      </span>
                    </span>
                    <span className="cell view">{post.readCount}명 읽음</span>
                    <span className="cell date">{post.time && DatePeriod.changeDateToStringSupport(new Date(post.time))}</span>
                  </a>
                );
              } else if (post.time && new Date(post.time) > new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) {
                return (
                  <a target="_blank" className="row new" key={index} onClick={() => routeToNoticeDetail(post.postId)}>
                    <span className="cell title">
                      <span className="inner">
                        <span className="ellipsis">{post.title}</span>
                      </span>
                    </span>
                    <span className="cell view">{post.readCount}명 읽음</span>
                    <span className="cell date">{post.time && DatePeriod.changeDateToStringSupport(new Date(post.time))}</span>
                  </a>
                );
              } else {
                return (
                  <a target="_blank" className="row" key={index} onClick={() => routeToNoticeDetail(post.postId)}>
                    <span className="cell title">
                      <span className="inner">
                        <span className="ellipsis">{post.title}</span>
                      </span>
                    </span>
                    <span className="cell view">{post.readCount}명 읽음</span>
                    <span className="cell date">{post.time && DatePeriod.changeDateToStringSupport(new Date(post.time))}</span>
                  </a>
                );
              }
            }) || ''
            }
            </>
          </div>
          {
            pinnedResult && pinnedResult.length === 0 && result && result.length === 0 && (
              <Segment className="full">
                <div className="no-cont-wrap">
                  <i className="icon no-contents80"><span className="blind">콘텐츠 없음</span></i>
                  <div className="text">등록된 Notice가 없습니다.</div>
                </div>
              </Segment>
            )
          }
          {
            ( pinnedResult && pinnedResult.length || result && result.length ) && (
              <div className="more-comments" onClick={() => findNoticePosts(end)}>
                <Button icon
                  className="left moreview"
                  disabled={disabled}
                >
                  <Icon className="moreview" />list more
                </Button>
              </div>
            ) || ''
          }
        </div>
      </Segment>

    );
  }
}

export default NoticeTabContainer;
