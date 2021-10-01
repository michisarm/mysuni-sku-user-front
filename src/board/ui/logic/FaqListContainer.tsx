import React from 'react';
import { reactAutobind, mobxHelper, ReactComponent } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Accordion, Form, Icon, Input, Radio, Segment } from 'semantic-ui-react';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { PostModel } from '../../model';
import { CategoryService, PostService } from '../../stores';
import {
  getPolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import SharedService from '../../../shared/present/logic/SharedService';
import Pagination from '../../../shared/components/Pagination';
import SearchSdo from '../../model/sdo/SearchSdo';

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
  paginationSearchKey = 'FAQ-Search'
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
    this.findFaqPosts("");
  }

  onChangeSearchKey(event: any, data : any) {
    //
    this.setState({
      searchKey: data.value,
    });
  }

  onKeyPressed(event: any) {
    if(event.key === 'Enter') {
      this.findFaqPosts('', this.state.searchKey);
    }
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
    this.setState({ isLoading: false, categoryIndex: -1 });
  }

  async findFaqPosts(categoryId: string, keyword?: string) {
    //
    const { sharedService, postService } = this.injected;
    postService.clearPosts();

    this.setState({ isLoading: true });

    if(keyword && keyword !== '') {
      let pageModel = sharedService.getPageModel(this.paginationSearchKey);

      if (pageModel.limit === 20) {
        sharedService.setPageMap(this.paginationSearchKey, pageModel.offset, 10);
        pageModel = sharedService.getPageModel(this.paginationSearchKey);
      }

      await postService.searchFaq(SearchSdo.fromKeyword(keyword, pageModel.offset, 10)).then((res) => {
        sharedService.setCount(this.paginationSearchKey, res.totalCount);
        this.setState({ categoryIndex: -1 });
      });
    } else if(categoryId == null || categoryId == '') {
      let pageModel = sharedService.getPageModel(this.paginationKey);

        if (pageModel.limit === 20) {
          sharedService.setPageMap(this.paginationKey, pageModel.offset, 10);
          pageModel = sharedService.getPageModel(this.paginationKey);
        }
        await postService
          .searchFaq(SearchSdo.fromKeyword("", pageModel.offset, 10))
          .then((res) => {
            sharedService.setCount(this.paginationKey, res.totalCount);
          });
    } else {
      let pageModel = sharedService.getPageModel(this.paginationKey);

      if (pageModel.limit === 20) {
        sharedService.setPageMap(this.paginationKey, pageModel.offset, 10);
        pageModel = sharedService.getPageModel(this.paginationKey);
      }
      await postService
        .findPostsByCategoryId(categoryId,  pageModel.offset, 10)
        .then((res) => {
          sharedService.setCount(this.paginationKey, res.totalCount);
        });
    }
    this.setState({ activeIndex: -1, isLoading: false });
  }

  setCagetory(index: number, categoryId: string) {
    //
    const { postService, categoryService } = this.injected;
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

  renderPostRow(post: PostModel, index: number) {
    //
    const { activeIndex } = this.state;
    return (
      <>
        <Accordion.Title active={activeIndex === index} onClick={() => this.onClickPost(index)}>
          <div className="faq-icon">Q.</div>
          <div className="txt-wrap">
            {post.title && parsePolyglotString(post.title)}
          </div>
          <Icon className="dropdown icon" />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          {/*{parsePolyglotString(post.contents.contents)}*/}
          1
          2
          3
          {/*<p>*/}
          {/*  {parsePolyglotString(post.contents.contents)}*/}
          {/*</p>*/}
          {/*<div*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: post.contents && parsePolyglotString(post.contents.contents),*/}
          {/*  }}*/}
          {/*/>*/}
        </Accordion.Content>
      </>
    );
  }

  renderCategoryRadio() {
    //
    const { categoryIndex } = this.state;
    const { categoryService } = this.injected;
    const { categorys } = categoryService;

    const categoryRadio = [];
    categoryRadio.push(
      <Radio
        key="-1"
        className="base"
        name="radioGroup"
        index={-1}
        label="전체"
        value=""
        checked={categoryIndex === -1}
        onChange={this.onChangeCategory}
      />
    )

    categoryRadio.push(
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
    )))
    return categoryRadio;
  }

  render() {
    //
    const { sharedService, categoryService, postService } = this.injected;
    const { categorys } = categoryService;
    const { posts } = postService;
    const { categoryIndex, isLoading, searchKey, focus } = this.state;
    const result = posts.results;
    const paginationKey = searchKey === '' ? this.paginationKey : this.paginationSearchKey;
    const { count } = searchKey === '' ? sharedService.getPageModel(paginationKey) : sharedService.getPageModel(paginationKey);

    return (
      <>
        <Pagination name={paginationKey} onChange={() => this.findFaqPosts(categoryIndex != -1 ? categorys[categoryIndex].categoryId : '', searchKey)}>
        {isLoading ? (
          <div className="support-list-wrap faq">
            <div className="cate-wrap">
              <div className="radio-wrap">
                {this.renderCategoryRadio()}
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
                {this.renderCategoryRadio()}
              </div>
            </div>
            <div className="list-top">
              <div className="list-top-left">
                총 <strong>{`${count}개`}</strong>의 리스트가 있습니다.
              </div>
              <div className="list-top-right">
                <div className="ui input s-search h38">
                  <Form.Field
                    control={Input}
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchKey}
                    onChange={(e: any, data: any) => this.onChangeSearchKey(e, data)}
                    onKeyPress={(e: any, data: any) => this.onKeyPressed(e)}
                    onClick={this.onClickInput}
                    onBlur={this.onBlurInput}
                  />
                  <Icon className="search-32" onClick={() => this.findFaqPosts('', searchKey)} />
                </div>
              </div>
            </div>
            <div className="faq-list-wrap">
              {result.length === 0 ? (
                <NoSuchContentPanel
                  message={getPolyglotText(
                    '검색 결과가 없습니다.',
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
            <Pagination.Navigator styled/>
          </div>
        )}
        </Pagination>
      </>
    );
  }
}

export default withRouter(FaqListContainer);
