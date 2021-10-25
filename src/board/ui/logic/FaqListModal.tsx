import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  reactAutobind,
  ReactComponent,
  mobxHelper,
} from '@nara.platform/accent';
import {
  Accordion,
  Button,
  Form,
  Icon,
  Input,
  Modal,
  Radio,
  Segment,
} from 'semantic-ui-react';
import { PostModel } from '../../model';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import PostService from '../../present/logic/PostService';
import CategoryService from '../../present/logic/CategoryService';
import SharedService from '../../../shared/present/logic/SharedService';
import { Loadingpanel, NoSuchContentPanel } from '../../../shared';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import Pagination from '../../../shared/components/Pagination';
import SearchSdo from '../../model/sdo/SearchSdo';

interface Props {}

interface State {
  open: boolean;
  isLoading: boolean;
  activeIndex: number;
  searchKey: string;
  categoryIndex: number;
  focus: boolean;
}

interface Injected {
  postService: PostService;
  categoryService: CategoryService;
  sharedService: SharedService;
}

@inject(
  mobxHelper.injectFrom(
    'board.postService',
    'board.categoryService',
    'shared.sharedService'
  )
)
@observer
@reactAutobind
class FaqListModal extends ReactComponent<Props, State, Injected> {
  //
  paginationKey = 'FAQ-modal';
  paginationSearchKey = 'FAQ-modal-Search';
  state = {
    open: false,
    categoryIndex: 0,
    isLoading: false,
    focus: false,
    searchKey: '',
    activeIndex: -1,
  };

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false, searchKey: '' });
  }

  componentDidMount() {
    //
    this.init();
  }

  init() {
    this.findFaqCategoris();
    this.findFaqPosts('');
  }

  setCagetory(index: number, categoryId: string) {
    //
    const postService = this.injected.postService;
    this.setState({ isLoading: true });

    this.setState({
      categoryIndex: index,
      searchKey: '',
    });

    postService.clearPosts();
    this.findFaqPosts(categoryId);
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

    if (keyword && keyword !== '') {
      let pageModel = sharedService.getPageModel(this.paginationKey);

      if (pageModel.limit === 20) {
        sharedService.setPageMap(this.paginationKey, pageModel.offset, 10);
        pageModel = sharedService.getPageModel(this.paginationKey);
      }

      await postService
        .searchFaq(SearchSdo.fromKeyword(keyword, pageModel.offset, 10))
        .then((res) => {
          sharedService.setCount(this.paginationKey, res.totalCount);
          this.setState({ categoryIndex: -1 });
        });
    } else if (categoryId == null || categoryId == '') {
      let pageModel = sharedService.getPageModel(this.paginationKey);

      if (pageModel.limit === 20) {
        sharedService.setPageMap(this.paginationKey, pageModel.offset, 10);
        pageModel = sharedService.getPageModel(this.paginationKey);
      }
      await postService
        .searchFaq(SearchSdo.fromKeyword('', pageModel.offset, 10))
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
        .findPostsByCategoryId(categoryId, pageModel.offset, 10)
        .then((res) => {
          sharedService.setCount(this.paginationKey, res.totalCount);
        });
    }
    this.setState({ activeIndex: -1, isLoading: false });
  }

  onClickPost(index: number) {
    //
    const { activeIndex } = this.state;
    const targetIndex = index === activeIndex ? -1 : index;
    this.setState({ activeIndex: targetIndex });
  }

  onChangeCategory(e: any, { index, value }: any) {
    //
    const { sharedService } = this.injected;

    sharedService.setPageMap(this.paginationKey, 0, 10);
    this.setCagetory(index, value);
    this.setState({ activeIndex: -1, searchKey: '' });
  }

  onChangeSearchKey(event: any, data: any) {
    //
    this.setState({
      searchKey: data.value,
    });
  }

  onKeyPressed(event: any) {
    if (event.key === 'Enter') {
      const { sharedService } = this.injected;
      sharedService.setPageMap(this.paginationKey, 0, 10);

      this.findFaqPosts('', this.state.searchKey);
    }
  }

  onClickInput() {
    this.setState({ focus: true });
  }

  onBlurInput() {
    this.setState({ focus: false });
  }

  onSearch(e: any) {
    //
    const { searchKey } = this.state;
  }

  renderPostRow(post: PostModel, index: number) {
    //
    const { activeIndex } = this.state;
    return (
      <React.Fragment key={index}>
        <Accordion.Title
          active={activeIndex === index}
          onClick={() => this.onClickPost(index)}
        >
          <div className="faq-icon">Q.</div>
          <div className="txt-wrap">
            {post.title && parsePolyglotString(post.title)}
          </div>
          <Icon className="dropdown icon" />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                post.contents && parsePolyglotString(post.contents.contents),
            }}
          />
        </Accordion.Content>
      </React.Fragment>
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
        label={getPolyglotText('전체', 'Certification-mabd-sl전체')}
        value=""
        checked={categoryIndex === -1}
        onChange={this.onChangeCategory}
      />
    );

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
      ))
    );
    return categoryRadio;
  }

  render() {
    //
    const { categoryIndex, isLoading, open, searchKey } = this.state;
    const { postService, categoryService, sharedService } = this.injected;
    const { posts } = postService;
    const { categorys } = categoryService;
    const result = posts.results;
    const paginationKey = this.paginationKey;
    const { count } = sharedService.getPageModel(paginationKey);

    return (
      <Modal
        className="base w1000 qna-write-modal"
        open={open}
        onOpen={this.onOpen}
        onClose={this.onClose}
        trigger={
          <Button className="faq-info">
            <Icon className="info20" />
            {getPolyglotText('혹시 이런 문의일까요?', 'support-faq-modal-btn')}
          </Button>
        }
        onMount={this.init}
      >
        <Modal.Header>
          {getPolyglotText('자주 찾는 질문', 'support-faq-modal-header')}
        </Modal.Header>
        <Modal.Content className="faq-modal-cont-area">
          <Pagination
            name={paginationKey}
            onChange={() =>
              this.findFaqPosts(
                categoryIndex != -1 ? categorys[categoryIndex].categoryId : '',
                searchKey
              )
            }
          >
            {isLoading ? (
              <>
                <div className="support-list-wrap faq modal-faq-container">
                  <div className="cate-wrap">
                    <div className="radio-wrap">
                      {this.renderCategoryRadio()}
                    </div>
                  </div>
                  <div className="list-top">
                    <div className="list-top-left">
                      <div
                        className="section-count"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `총 <span>{count}</span>개의 리스트가 있습니다.`,
                            'support-common-목록수',
                            {
                              count: count.toString(),
                            }
                          ),
                        }}
                      />
                    </div>
                    <div className="list-top-right">
                      <div className="ui input s-search h38">
                        <Form.Field
                          control={Input}
                          type="text"
                          placeholder={getPolyglotText(
                            `검색어를 입력하세요.`,
                            'support-faq-search-ph'
                          )}
                          value={searchKey}
                          onChange={(e: any, data: any) =>
                            this.onChangeSearchKey(e, data)
                          }
                          onKeyPress={(e: any, data: any) =>
                            this.onKeyPressed(e)
                          }
                          onClick={this.onClickInput}
                          onBlur={this.onBlurInput}
                        />
                        <Icon className="search-32" onClick={this.onSearch} />
                      </div>
                    </div>
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
              </>
            ) : (
              <>
                <div className="support-list-wrap faq modal-faq-container">
                  <div className="cate-wrap">
                    <div className="radio-wrap">
                      {this.renderCategoryRadio()}
                    </div>
                  </div>
                  <div className="list-top">
                    <div className="list-top-left">
                      <div
                        className="section-count"
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `총 <span>{count}</span>개의 리스트가 있습니다.`,
                            'support-common-목록수',
                            {
                              count: count.toString(),
                            }
                          ),
                        }}
                      />
                    </div>
                    <div className="list-top-right">
                      <div className="ui input s-search h38">
                        <Form.Field
                          control={Input}
                          type="text"
                          placeholder={getPolyglotText(
                            `검색어를 입력하세요.`,
                            'support-faq-search-ph'
                          )}
                          value={searchKey}
                          onChange={(e: any, data: any) =>
                            this.onChangeSearchKey(e, data)
                          }
                          onKeyPress={(e: any, data: any) =>
                            this.onKeyPressed(e)
                          }
                          onClick={this.onClickInput}
                          onBlur={this.onBlurInput}
                        />
                        <Icon className="search-32" onClick={this.onSearch} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scrolling-60vh faq-list-wrap">
                  {result.length === 0 ? (
                    <NoSuchContentPanel
                      message={getPolyglotText(
                        '등록된 FAQ가 없습니다.',
                        'support-FAQ-목록없음'
                      )}
                    />
                  ) : (
                    <Accordion styled>
                      {result.map((post, index) => {
                        return this.renderPostRow(post, index);
                      })}
                    </Accordion>
                  )}
                </div>
                <Pagination.Navigator styled />
              </>
            )}
          </Pagination>
        </Modal.Content>
        <Modal.Actions>
          <Button className="w190 pop d" onClick={this.onClose}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FaqListModal;
