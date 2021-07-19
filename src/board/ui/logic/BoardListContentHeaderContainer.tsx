import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Icon } from 'semantic-ui-react';

import routePaths from '../../routePaths';
import { PostService } from '../../stores';
import BoardListContentHeaderHelpView from '../view/BoardListContentHeaderHelpView';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps<{ boardId: string }> {
  postService?: PostService;
}

@inject(mobxHelper.injectFrom('board.postService'))
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
              <div className="title">
                <PolyglotText
                  id="support-spif-타이틀"
                  defaultString="Support"
                />
              </div>
              <div className="text">
                <PolyglotText
                  id="support-spif-상세궁금"
                  defaultString="mySUNI에 대한 궁금증을 풀어드립니다."
                />
                <br />
                <PolyglotText
                  id="support-spif-상세설명"
                  defaultString="Help Desk"
                />
                <span className="dash" />
                <Icon className="supporttel16" />
                <span className="blind">
                  <PolyglotText
                    id="support-spif-tel"
                    defaultString="support tel"
                  />
                </span>
                <PolyglotText
                  id="support-spif-전화번호"
                  defaultString="02-6323-9002"
                />
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
