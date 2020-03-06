
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Icon } from 'semantic-ui-react';

import routePaths from '../../routePaths';
import { PostService } from '../../stores';
import BoardListContentHeaderHelpView from '../view/BoardListContentHeaderHelpView';


interface Props extends RouteComponentProps<{ boardId: string }> {
  postService?: PostService
}

@inject(mobxHelper.injectFrom(
  'board.postService',
))
@observer
@reactAutobind
export class BoardListContentHeaderContainer extends React.Component<Props> {
  //
  componentDidMount(): void {
    //
    const { postService } = this.props;
    postService!.findFaqPinnedPosts();
  }

  routeToFaqDetail(postId: string) {
    //
    this.props.history.push(routePaths.supportFAQPost(postId));
  }


  render() {
    //
    const { faqPosts } = this.props.postService!;

    return (
      <div className="main-info-area">
        <div className="support-info">
          <div className="title-area">
            <div className="line-wrap">
              <div className="title">Support</div>
              <div className="text">
                mySUNI에 대한 궁금증을 풀어드립니다.<br />
                Help Desk<span className="dash" /><Icon className="supporttel16" /><span className="blind">support tel</span>
                02-6323-9002
              </div>
            </div>
          </div>
          <BoardListContentHeaderHelpView
            faqTotalCount={faqPosts.totalCount}
            faqPosts={faqPosts.results}
            routeToFaqDetail={this.routeToFaqDetail}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(BoardListContentHeaderContainer);
