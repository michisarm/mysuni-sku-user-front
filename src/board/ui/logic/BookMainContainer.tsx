import React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { RouteComponentProps } from 'react-router';

import { Icon, Menu, Sticky } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import QnaTabContainer from './QnaTabContainer';
import FaqTabContainer from './FaqTabContainer';
import NoticeTabContainer from './NoticeTabContainer';
import HelpContainer from './HelpContainer';
import { CategoryService, PostService } from '../../index';

interface Props extends RouteComponentProps<{ boardId: string }> {
  postService?: PostService
  categoryService?: CategoryService
}

interface States {
  tabIndex: number,
  activeItem: string,
  faqCategoryId: string,
  faqTabIndex: number,
  accordIndex: number,
  qnaTabIndex: number,
  disabled: boolean,
  answered: boolean,
  end: number,
}

@inject(mobxHelper.injectFrom(
  'board.postService',
  'board.categoryService',
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
      qnaTabIndex: 0,
      disabled: false,
      answered: false,
      end: 0,
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
      this.findQnaCategories();
    }
  }

  handleItemClick(e: any, { name }: any) {
    //
    const { postService } = this.props;
    if (postService) {
      this.setState({ activeItem: name, faqCategoryId: '', faqTabIndex: 0 });
    }
    this.props.history.push(`/board/support/${name}`);

    if (name === 'Notice') {
      this.findNoticePinnedPosts();
    } else if (name === 'FAQ') {
      this.findFaqCategoris();
    } else if (name === 'Q&A') {
      this.findQnaCategories();
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
            this.findFaqPosts(categorys[0].categoryId, 10);
          }
        });
    }
  }

  findQnaCategories() {
    const { categoryService, postService } = this.props;

    if (categoryService && postService) {
      Promise.resolve()
        .then(() => postService.clearPosts())
        .then(() => categoryService.findCategoriesByBoardId('QNA'))
        .then(() => {
          const { categorys } = this.props.categoryService || {} as CategoryService;
          if (categorys && categorys.length > 0) {
            this.findQnaPosts('', categorys[0].categoryId, 10);
          }
        });
    }
  }

  findNoticePinnedPosts() {
    const { postService } = this.props;

    if (postService) {
      Promise.resolve()
        .then(() => postService.clearPosts())
        .then(() => postService.findPostsByBoardIdAndPinned('NTC', 0, 5))
        .then(() => {
          let count = postService.pinnedPosts.totalCount;
          if (count > 5) count = 5;
          this.findNoticePosts(10 - count);
        });
    }
  }

  findNoticePosts(end: number) {
    const { postService } = this.props;
    this.setState({ disabled: true });

    if (postService) {
      postService.findNoticePosts(0, end)
        .then(() => {
          if (end >= postService.posts.totalCount) this.setState({ disabled: true });
          else this.setState({ end: end + 10, disabled: false });
        });
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

          if (end >= totalCount) this.setState({ disabled: true });
          else if (end < totalCount) this.setState({ end: end + 10, disabled: false });
        });
    }
  }

  findQnaPosts(answered: any, categoryId: string, end: number) {
    //
    const { postService } = this.props;
    this.setState({ answered, disabled: true });
    if (postService ) {

      if (answered === 'all' || !String(answered).length) {
        postService.findPostsByCategoryIdAndDeleted(categoryId, false, 0, end)
          .then(() => {
            if (end >= postService.posts.totalCount) this.setState({ disabled: true });
            else this.setState({ end: end + 10, disabled: false });
          });
      } else {
        Promise.resolve()
          .then(() => postService.clearPosts())
          .then(() => {
            postService.findQnaPostsByCategoryIdAndAnswered(categoryId, answered, 0, end)
              .then(() => {
                if (end >= postService.posts.totalCount) this.setState({ disabled: true });
                else this.setState({ end: end + 10, disabled: false });
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
        disabled: false,
        faqCategoryId: value,
      });
    }

    if (postService) {
      Promise.resolve()
        .then(() => postService.clearPosts())
        .then(() => this.findFaqPosts(value, 10));
    }
  }

  handleQnaCategoryTabChange(e: any, { answered, index, value }: any) {
    //
    const { postService } = this.props;
    this.setState({ qnaTabIndex: index, disabled: false });

    if (postService) {
      Promise.resolve()
        .then(() => postService.clearPosts())
        .then(() => this.findQnaPosts(answered, value, 10));
    }
  }

  routeToQnaRegist() {
    this.props.history.push('/board/support-qna');
  }

  routeToFaqDetail(postId: string) {
    this.props.history.push(`/board/support/faq-detail/${postId}`);
  }

  routeToQnaDetail(postId: string) {
    this.props.history.push(`/board/support/qna-detail/${postId}`);
  }

  routeToNoticeDetail(postId: string) {
    this.props.history.push(`/board/support/notice-detail/${postId}`);
  }

  routeToAnsweredDetail(postId: string) {
    this.props.history.push(`/board/support/answered-detail/${postId}`);
  }

  render() {
    //
    const { activeItem, faqCategoryId, faqTabIndex, accordIndex, qnaTabIndex, disabled, end, answered } = this.state;
    const { postService, categoryService } = this.props;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: `Support` },
          { text: `${activeItem}`, path: `/board/support/${activeItem}` },
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
                  02)6323-9002
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
                findNoticePosts={this.findNoticePosts}
                routeToNoticeDetail ={this.routeToNoticeDetail}
                disabled={disabled}
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
                disabled={disabled}
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
                handleQnaCategoryTabChange={this.handleQnaCategoryTabChange}
                disabled={disabled}
                end={end}
                answered={answered}
                qnaTabIndex={qnaTabIndex}
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
