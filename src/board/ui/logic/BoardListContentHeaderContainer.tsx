import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

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

  // TODO Title 번역 후에 맞는 ID로 수정
  renderSupportTitle() {
    //
    const { boardId } = this.props.match.params;

    if (boardId === 'Notice') {
      //
      return (
        <>
          <div className="title">
            <PolyglotText
              id="support-spif-Notice타이틀"
              defaultString="Notice"
            />
          </div>
          <div className="text">
            <PolyglotText
              id="support-notice-탭설명"
              defaultString="mySUNI의 신규 콘텐츠, 기능 추가, 이벤트 등 새로운 소식을 안내드립니다."
            />
          </div>
        </>
      );
    } else if (boardId === 'FAQ') {
      //
      return (
        <>
          <div className="title">
            <PolyglotText id="support-spif-FAQ타이틀" defaultString="FAQ" />
          </div>
          <div className="text">
            <PolyglotText
              id="support-faq-탭설명"
              defaultString="mySUNI에 대한 자주 찾는 질문들을 확인하실 수 있습니다."
            />
          </div>
        </>
      );
    } else if (boardId === 'Q&A') {
      //
      return (
        <>
          <div className="title">
            <PolyglotText id="support-qna-탭명" defaultString="1:1 문의" />
          </div>
          <div className="text">
            <PolyglotText
              id="support-qna-탭설명"
              defaultString="mySUNI에 대한 궁금증을 풀어드립니다."
            />
          </div>
        </>
      );
    } else {
      //
      return (
        <>
          <div className="title">
            <PolyglotText id="support-qnamgt-탭명" defaultString="문의관리" />
          </div>
          <div className="text">
            <PolyglotText
              id="support-qnamgt-탭설명"
              defaultString="문의에 대한 답변을 등록하실 수 있습니다."
            />
          </div>
        </>
      );
    }
  }

  render() {
    //
    const { faqPosts } = this.props.postService!;
    const { boardId } = this.props.match.params;

    return (
      <div className="main-info-area">
        <div className="support-info">
          <div className="title-area">
            <div className="line-wrap">{this.renderSupportTitle()}</div>
          </div>
          {boardId !== 'Q&AMgt' && (
            <div className="tit-right-area">
              <BoardListContentHeaderHelpView
                faqTotalCount={faqPosts.totalCount}
                faqPosts={faqPosts.results}
                routeToFaqDetail={this.routeToFaqDetail}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(BoardListContentHeaderContainer);
