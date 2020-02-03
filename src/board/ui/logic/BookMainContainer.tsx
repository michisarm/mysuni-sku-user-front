
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { CommentService } from '@nara.drama/feedback';
import { Icon, Menu, Sticky } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import routePaths from '../../routePaths';
import { CategoryService, PostService } from '../..';
import { PostModel } from '../../model/PostModel';
import QnaTabContainer from './QnaTabContainer';
import FaqTabContainer from './FaqTabContainer';
import NoticeTabContainer from './NoticeTabContainer';
import HelpContainer from './HelpContainer';


interface Props extends RouteComponentProps<{ boardId: string }> {
  postService?: PostService
  categoryService?: CategoryService
  commentService?: CommentService
}

interface States {
  tabIndex: number,
  activeItem: string,
  faqCategoryId: string,
  faqTabIndex: number,
  accordIndex: number,
  answered: any,
  end: number,
  feedbackIds: string[]
}

@inject(mobxHelper.injectFrom(
  'board.postService',
  'board.categoryService',
  'shared.commentService',
))
@observer
@reactAutobind
export class BookMainContainer extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabIndex: 0,
      activeItem: '',
      faqCategoryId: '',
      faqTabIndex: 0,
      accordIndex: 0,
      answered: '',
      end: 0,
      feedbackIds: [],
    };
  }

  componentDidMount(): void {
    //
    const { postService } = this.props;
    if (postService) postService.findFaqPinnedPosts();
    this.init();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
      this.init();
    }
  }

  init() {
    //
    const { boardId } = this.props.match.params;

    if (boardId === 'Notice' || boardId === '') {

      this.setState({ tabIndex: 0, activeItem: boardId });
      this.findNoticePinnedPosts();
    } else if (boardId === 'FAQ') {

      this.setState({ tabIndex: 1, activeItem: boardId  });
      this.findFaqCategoris();
    } else if (boardId === 'Q&A') {
      this.setState({ tabIndex: 2, activeItem: boardId });
      //this.findQnaCategories();
      this.findQnaPosts('all', 10);
    }
  }

  handleItemClick(e: any, { name }: any) {
    //
    const { history } = this.props;

    this.setState({ activeItem: name, faqCategoryId: '', faqTabIndex: 0 });
    history.push(routePaths.supportTab(name));

    if (name === 'Notice') {
      this.findNoticePinnedPosts();
    } else if (name === 'FAQ') {
      this.findFaqCategoris();
    } else if (name === 'Q&A') {
      //this.findQnaCategories();
      this.findQnaPosts('all', 10);
    }
  }

  findFaqCategoris() {
    const { categoryService, postService } = this.props;

    if (categoryService && postService) {
      Promise.resolve()
        .then(() => postService.clearPosts())
        .then(() => categoryService.findCategoriesByBoardId('FAQ'))
        .then(() => {
          const { categorys } = this.props.categoryService || {} as CategoryService;
          if (categorys && categorys.length > 0) {
            const { post } = this.props.postService || {} as PostService;

            categorys.map((category, index) => {
              if (category.categoryId === post.category.id) {
                this.setState({ faqTabIndex: index });
              }
            });
            if (post.category.id) {
              this.handleFaqCategoryTabChange('', { index: this.state.faqTabIndex, value: post.category.id });
            } else {
              this.findFaqPosts(categorys[0].categoryId, 10);
            }
          }
        });
    }
  }

  async findNoticePinnedPosts() {
    const { postService } = this.props;

    if (postService) {
      postService.clearPosts();
      const pinnedPosts = await postService.findPostsByBoardIdAndPinned('NTC', 0, 5);
      const feedbackIds = pinnedPosts.results.map((post: PostModel) => post.commentFeedbackId);
      this.setState({ feedbackIds }, () => {
        let count = pinnedPosts.totalCount;
        if (count > 5) count = 5;
        this.findNoticePosts(10 - count);
      });
    }
  }

  async findNoticePosts(end: number) {
    const { postService, commentService } = this.props;

    if (postService) {
      const posts = await postService.findNoticePosts(0, end);
      this.setState({ end: end + 10 });
      let feedbackIds = [ ...this.state.feedbackIds ];
      feedbackIds = feedbackIds.concat(posts.results.map((post: PostModel) => post.commentFeedbackId));
      commentService!.countByFeedbackIds(feedbackIds);
    }
  }

  findFaqPosts(categoryId: string, end: number) {
    const { postService } = this.props;

    if (postService) {
      Promise.resolve()
        .then(() => postService.clearPosts())
        .then(() => postService.findPostsByCategoryId(categoryId, 0, end))
        .then(() => {
          const { posts } = this.props.postService || {} as PostService;
          const totalCount = posts.totalCount;

          if (end < totalCount) this.setState({ end: end + 10 });
        });
    }
  }

  findQnaPosts(answered: any, end:number) {
    const { postService } = this.props;
    if (postService ) {

      if (answered === 'all' || !String(answered).length) {
        postService.findQnaPosts(0, end)
          .then(() => {
            this.setState({ answered, end: end + 10 });
          });
      } else {
        Promise.resolve()
          .then(() => postService.clearPosts())
          .then(() => {
            postService.findQnaPostsByAnswered( answered, 0, end)
              .then(() => {
                this.setState({ answered, end: end + 10 });
              });
          });
      }
    }
  }

  handleFaqCategoryTabChange(e: any, { index, value }: any) {
    //
    const { postService } = this.props;
    if (postService) {
      this.setState({
        faqTabIndex: index,
        faqCategoryId: value,
      });
    }

    if (postService) {
      Promise.resolve()
        .then(() => postService.clearPosts())
        .then(() => this.findFaqPosts(value, 10));
    }
  }

  routeToQnaRegist() {
    this.props.history.push(routePaths.supportQnANewPost());
  }

  routeToFaqDetail(postId: string) {
    this.props.history.push(routePaths.supportFAQPost(postId));
  }

  routeToQnaDetail(postId: string) {
    this.props.history.push(routePaths.supportQnAPost(postId));
  }

  routeToNoticeDetail(postId: string) {
    this.props.history.push(routePaths.supportNoticePost(postId));
  }

  routeToAnsweredDetail(postId: string) {
    this.props.history.push(routePaths.supportQnAAnswer(postId));
  }

  render() {
    //
    const { activeItem, faqCategoryId, faqTabIndex, accordIndex, end, answered } = this.state;
    const { postService, categoryService, commentService } = this.props;
    const { commentCountMap } = commentService!;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: `Support` },
          { text: `${activeItem}`, path: routePaths.supportTab(activeItem) },
        ]}
      >
        <div className="main-info-area">
          <div className="support-info">
            <div className="title-area">
              <div className="line-wrap">
                <div className="title">Support</div>
                <div className="text">mySUNI에 대한 궁금증을 풀어드립니다.<br />Help Desk<span
                  className="dash"
                /><Icon className="supporttel16" /><span className="blind">support tel</span>
                  02-6323-9002
                </div>
              </div>
            </div>
            <HelpContainer
              routeToFaqDetail={this.routeToFaqDetail}
              postService={postService}
            />
          </div>
        </div>
        <div>
          <Sticky className="tab-menu offset0">
            <div className="cont-inner">
              <Menu className="sku">
                <Menu.Item
                  name="Notice"
                  active={activeItem === 'Notice'}
                  onClick={this.handleItemClick}
                > Notice
                  {/*<span className="new">+N</span>*/}
                </Menu.Item>
                <Menu.Item
                  name="FAQ"
                  active={activeItem === 'FAQ'}
                  onClick={this.handleItemClick}
                > FAQ
                </Menu.Item>
                <Menu.Item
                  name="Q&A"
                  active={activeItem === 'Q&A'}
                  onClick={this.handleItemClick}
                > Q&A
                  {/*<span className="new">+N</span>*/}
                </Menu.Item>
              </Menu>
            </div>
          </Sticky>
          {
            activeItem === 'Notice' ?
              <NoticeTabContainer
                commentCountMap={commentCountMap}
                findNoticePosts={this.findNoticePosts}
                routeToNoticeDetail ={this.routeToNoticeDetail}
                end={end}
              />
              : ''
          }
          {
            activeItem === 'FAQ' ?
              <FaqTabContainer
                faqCategoryId={faqCategoryId}
                handleFaqCategoryTabChange={this.handleFaqCategoryTabChange}
                findFaqPosts={this.findFaqPosts}
                faqTabIndex={faqTabIndex}
                accordIndex={accordIndex}
                end={end}
                routeToFaqDetail={this.routeToFaqDetail}
              />
              : ''
          }
          {
            activeItem === 'Q&A' ?
              <QnaTabContainer
                routeToQnaRegist={this.routeToQnaRegist}
                findQnaPosts={this.findQnaPosts}
                categoryService={categoryService}
                end={end}
                answered={answered}
                routeToQnaDetail={this.routeToQnaDetail}
                routeToAnsweredDetail={this.routeToAnsweredDetail}
              />
              : ''
          }
        </div>
      </ContentLayout>
    );
  }
}

export default BookMainContainer;
