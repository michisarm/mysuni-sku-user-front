import React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { PostService } from '../../index';

interface Props {
  postService?: PostService
  disabled: boolean
  end: number
  findNoticePosts: (end: number) => void
  routeToNoticeDetail: (postId: string) => void
}

@inject('postService')
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
                    <a target="_blank" className="row important new" key={index}>
                      <span className="cell title">
                        <span className="inner">
                          <span className="ellipsis" onClick={() => routeToNoticeDetail(pinnedPost.postId)}>{pinnedPost.title}</span>
                        </span>
                      </span>
                      <span className="cell view">{pinnedPost.readCount}명 읽음</span>
                      <span className="cell date">{pinnedPost.time && new Date(pinnedPost.time).toLocaleDateString()}</span>
                    </a>
                  );
                } else {
                  return (
                    <a target="_blank" className="row important" key={index}>
                      <span className="cell title">
                        <span className="inner">
                          <span className="ellipsis" onClick={() => routeToNoticeDetail(pinnedPost.postId)}>{pinnedPost.title}</span>
                          {/*<Link to={`/books/notice-detail/${pinnedPost.postId}`}>{pinnedPost.title}</Link>*/}
                        </span>
                      </span>
                      <span className="cell view">{pinnedPost.readCount}명 읽음</span>
                      <span className="cell date">{pinnedPost.time && new Date(pinnedPost.time).toLocaleDateString()}</span>
                    </a>
                  );
                }
              }) || ''
            }
              {
            result && result.length && result.map((post, index) => {
              if (post && post.pinned === true) {
                return (
                  <a target="_blank" className="row important" key={index}>
                    <span className="cell title">
                      <span className="inner">
                        <span className="ellipsis" onClick={() => routeToNoticeDetail(post.postId)}>{post.title}</span>
                      </span>
                    </span>
                    <span className="cell view">{post.readCount}명 읽음</span>
                    <span className="cell date">{post.time && new Date(post.time).toLocaleDateString()}</span>
                  </a>
                );
              } else if (post.time && new Date(post.time) > new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) {
                return (
                  <a target="_blank" className="row new" key={index}>
                    <span className="cell title">
                      <span className="inner">
                        <span className="ellipsis" onClick={() => routeToNoticeDetail(post.postId)}>{post.title}</span>
                      </span>
                    </span>
                    <span className="cell view">{post.readCount}명 읽음</span>
                    <span className="cell date">{post.time && new Date(post.time).toLocaleDateString()}</span>
                  </a>
                );
              } else {
                return (
                  <a target="_blank" className="row" key={index}>
                    <span className="cell title">
                      <span className="inner">
                        <span className="ellipsis" onClick={() => routeToNoticeDetail(post.postId)}>{post.title}</span>
                      </span>
                    </span>
                    <span className="cell view">{post.readCount}명 읽음</span>
                    <span className="cell date">{post.time && new Date(post.time).toLocaleDateString()}</span>
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
              <div className="more-comments">
                <Button icon className="left moreview">
                  <Icon className="moreview" disabled={disabled} onClick={() => findNoticePosts(end)} />list more
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
