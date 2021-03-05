import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { Button, Icon, Radio, Segment } from 'semantic-ui-react';
import { NoSuchContentPanel, Loadingpanel } from 'shared';
import { PostModel } from '../../model';
import { CategoryService, PostService } from '../../stores';
import routePaths from '../../routePaths';

interface Props extends RouteComponentProps {
  postService?: PostService;
  categoryService?: CategoryService;
}

interface State {
  offset: number;
  categoryIndex: number;
  isLoading: boolean;
}

@inject(mobxHelper.injectFrom('board.postService', 'board.categoryService'))
@observer
@reactAutobind
class FaqListContainer extends React.Component<Props, State> {
  //
  state = {
    offset: 0,
    categoryIndex: 0,
    isLoading: false,
  };

  componentDidMount() {
    //
    this.findFaqCategoris();
  }

  async findFaqCategoris() {
    //
    const categoryService = this.props.categoryService!;
    const postService = this.props.postService!;

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
      this.findFaqPosts(categorys[0].categoryId, 10);
    }
  }

  async findFaqPosts(categoryId: string, offset: number) {
    //
    this.setState({ isLoading: true });

    const postService = this.props.postService!;

    postService.clearPosts();

    let totalCount = 0;
    await postService.findPostsByCategoryId(categoryId, 0, offset).then(res => {
      totalCount = res.totalCount;
      this.setState({ isLoading: false });
    });

    if (offset < totalCount) {
      this.setState({ offset: offset + 10 });
    }
  }

  setCagetory(index: number, categoryId: string) {
    //
    const postService = this.props.postService!;

    this.setState({
      categoryIndex: index,
    });

    postService.clearPosts();
    this.findFaqPosts(categoryId, 10);
  }

  onChangeCategory(e: any, { index, value }: any) {
    //
    this.setCagetory(index, value);
  }

  onClickPost(postId: string) {
    //
    this.props.history.push(routePaths.supportFAQPost(postId));
  }

  onClickListMore() {
    //
    const { categorys } = this.props.categoryService!;
    const { offset, categoryIndex } = this.state;

    this.findFaqPosts(categorys[categoryIndex].categoryId, offset);
  }

  renderPostRow(post: PostModel, index: number) {
    //
    return (
      <a
        key={index}
        target="_blank"
        className={classNames('row', { important: post.pinned })}
        onClick={() => this.onClickPost(post.postId)}
      >
        <span className="cell title">
          <span className="inner">
            <span className="ellipsis">{post.title}</span>
          </span>
        </span>
      </a>
    );
  }

  render() {
    //
    const { categorys } = this.props.categoryService!;
    const { posts } = this.props.postService!;
    const { categoryIndex, isLoading } = this.state;
    const result = posts.results;
    const totalCount = posts.totalCount;

    return (
      <>
        {result.length === 0 ? (
          <NoSuchContentPanel message="등록된 FAQ가 없습니다." />
        ) : (
          <div className="support-list-wrap">
            <div className="list-top">
              <div className="radio-wrap">
                {categorys.length > 0 &&
                  categorys.map((category, index) => (
                    <Radio
                      key={index}
                      className="base"
                      name="radioGroup"
                      index={index}
                      label={category.name}
                      value={category.categoryId}
                      checked={categoryIndex === index}
                      onChange={this.onChangeCategory}
                    />
                  ))}
              </div>
            </div>
            {!isLoading && (
              <div className="su-list faq">
                {result.map((post, index) => this.renderPostRow(post, index))}
              </div>
            )}
            <Loadingpanel loading={isLoading} />
            {result.length > 0 && result.length < totalCount && (
              <div className="more-comments" onClick={this.onClickListMore}>
                <Button icon className="left moreview">
                  <Icon className="moreview" />
                  list more
                </Button>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(FaqListContainer);
