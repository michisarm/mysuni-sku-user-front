import React from 'react';
import { reactAutobind, mobxHelper, ReactComponent } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Accordion, Icon, Radio, Segment } from 'semantic-ui-react';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { PostModel } from '../../model';
import { CategoryService, PostService } from '../../stores';
import {
  getPolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import SharedService from '../../../shared/present/logic/SharedService';
import Pagination from '../../../shared/components/Pagination';

interface Props extends RouteComponentProps {

}

interface State {
  // offset: number;
  categoryIndex: number;
  isLoading: boolean;
  searchKey: string;
  focus: boolean;
  activeIndex: number;
}

interface Injected {
  postService: PostService;
  categoryService: CategoryService;
  sharedService: SharedService;
}

@inject(mobxHelper.injectFrom('board.postService', 'board.categoryService','shared.sharedService'))
@observer
@reactAutobind
class FaqListContainer extends ReactComponent<Props, State, Injected> {
  //
  paginationKey = 'FAQ';
  state = {
    // offset: 0,
    categoryIndex: 0,
    isLoading: false,
    searchKey: '',
    focus: false,
    activeIndex: -1,
  };

  componentDidMount() {
    //
    this.findFaqCategoris();
  }

  onChangeSearchKey(event : any) {
    //
    this.setState({
      searchKey: event.target.value,
    });
  }

  onClickInput() {
    this.setState({ focus: true });
  }

  onBlurInput() {
    this.setState({ focus: false });
  }

  async findFaqCategoris() {
    //
    this.setState({ isLoading: true });

    const categoryService = this.injected.categoryService;
    const postService = this.injected.postService;

    postService.clearPosts();
    await categoryService.findCategoriesByBoardId('FAQ');

    const { categorys } = categoryService;

    if (!categorys || categorys.length < 1) {
      return;
    }
    const { post } = postService;

    categorys.map((category, index) => {
      if (category.categoryId === post.category.id) {
        this.setState({ categoryIndex: index });
      }
    });

    if (post.category.id) {
      const { categoryIndex } = this.state;
      this.setCagetory(categoryIndex, post.category.id);
    } else {
      this.findFaqPosts(categorys[0].categoryId);
    }
  }

  async findFaqPosts(categoryId: string) {
    //
    const { sharedService, postService } = this.injected;
    const pageModel = sharedService.getPageModel(this.paginationKey);

    postService.clearPosts();

    await postService
      .findPostsByCategoryId(categoryId,  pageModel.offset, 10)
      .then((res) => {
        sharedService.setCount(this.paginationKey, res.totalCount);
        this.setState({ isLoading: false });
      });
  }

  setCagetory(index: number, categoryId: string) {
    //
    const postService = this.injected.postService;
    this.setState({ isLoading: true });

    this.setState({
      categoryIndex: index,
    });

    postService.clearPosts();
    this.findFaqPosts(categoryId);
  }

  onChangeCategory(e: any, { index, value }: any) {
    //
    this.setCagetory(index, value);
    this.setState({activeIndex: -1});
  }

  onClickPost(index: number) {
    //
    // this.props.history.push(routePaths.supportFAQPost(postId));
    const { activeIndex } = this.state;
    const targetIndex = index === activeIndex ? -1 : index;
    this.setState({ activeIndex: targetIndex })
  }

  // onClickListMore() {
  //   //
  //   const { categorys } = this.injected.categoryService;
  //   const { categoryIndex } = this.state;
  //   this.setState({ isLoading: true });
  //
  //   this.findFaqPosts(categorys[categoryIndex].categoryId);
  // }

  onClearSearchKey(e: any) {
    //
    this.setState({ searchKey: '' });
    this.onSearch(e);
  }

  onSearch(e: any) {
    //
    const { searchKey } = this.state;

  }

  renderPostRow(post: PostModel, index: number) {
    //
    const { activeIndex } = this.state;
    return (
      // <a
      //   key={index}
      //   target="_blank"
      //   className={classNames('row', { important: post.pinned })}
      //   onClick={() => this.onClickPost(post.postId)}
      // >
      //   <span className="cell title">
      //     <span className="inner">
      //       {/* <span className="ellipsis">{post.title && parsePolyglotString(post.title)}</span> */}
      //       <span className="ellipsis">
      //         {parsePolyglotString(
      //           post.title,
      //           getDefaultLang(post.langSupports)
      //         )}
      //       </span>
      //     </span>
      //   </span>
      // </a>
      <>
        <Accordion.Title active={activeIndex === index} onClick={() => this.onClickPost(index)}>
          <div className="faq-icon">Q.</div>
          <div className="txt-wrap">
            {post.title && parsePolyglotString(post.title)}
          </div>
          <Icon className="dropdown icon" />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <div
            dangerouslySetInnerHTML={{
              __html: post.contents && parsePolyglotString(post.contents.contents),
            }}
          />
        </Accordion.Content>
      </>
    );
  }

  render() {
    //
    const { categorys } = this.injected.categoryService;
    const { posts } = this.injected.postService;
    const { categoryIndex, isLoading, searchKey, focus } = this.state;
    const result = posts.results;
    const totalCount = posts.totalCount;

    return (
      <>
        <Pagination name={this.paginationKey} onChange={() => this.findFaqPosts(categorys[categoryIndex].categoryId)}>
        {isLoading ? (
          <div className="support-list-wrap faq">
            <div className="cate-wrap">
              <div className="radio-wrap">
                {categorys.length > 0 &&
                  categorys.map((category, index) => (
                    <Radio
                      key={index}
                      className="base"
                      name="radioGroup"
                      index={index}
                      label={parsePolyglotString(category.name)}
                      value={category.categoryId}
                      checked={categoryIndex === index}
                      onChange={this.onChangeCategory}
                    />
                  ))}
              </div>
            </div>

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
          </div>
        ) : (
          <div className="support-list-wrap faq">
            <div className="cate-wrap">
              <div className="radio-wrap">
                {categorys.length > 0 &&
                  categorys.map((category, index) => (
                    <Radio
                      key={index}
                      className="ui radio checkbox base"
                      name="radioGroup"
                      index={index}
                      label={parsePolyglotString(category.name)}
                      value={category.categoryId}
                      checked={categoryIndex === index}
                      onChange={this.onChangeCategory}
                    />
                  ))}
              </div>
            </div>
            <div className="list-top">
              <div className="list-top-left">
                총 0개의 리스트가 있습니다.
              </div>
              <div className="list-top-right">
                <div className="ui input s-search h38">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchKey}
                    onChange={this.onChangeSearchKey}
                    // onKeyPress={this.onKeyPressInput}
                    onClick={this.onClickInput}
                    onBlur={this.onBlurInput}
                  />
                  <Icon className="search-32" onClick={this.onSearch} />
                </div>
              </div>
            </div>
            <div className="faq-list-wrap">
              {result.length === 0 ? (
                <NoSuchContentPanel
                  message={getPolyglotText(
                    '등록된 FAQ가 없습니다.',
                    'support-FAQ-목록없음'
                  )}
                />
              ) : (

                  <Accordion styled>
                    {
                      result.map((post, index) => {
                        return this.renderPostRow(post, index);
                      })
                    }
                  </Accordion>
              )}
            </div>

            {/*{result.length > 0 && result.length < totalCount && (*/}
            {/*  <div className="more-comments" onClick={this.onClickListMore}>*/}
            {/*    <Button icon className="left moreview">*/}
            {/*      <Icon className="moreview" />*/}
            {/*      <PolyglotText*/}
            {/*        id="support-FAQ-더보기"*/}
            {/*        defaultString="list more"*/}
            {/*      />*/}
            {/*    </Button>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        )}
          <Pagination.Navigator />
        </Pagination>
      </>
    );
  }
}

export default withRouter(FaqListContainer);
