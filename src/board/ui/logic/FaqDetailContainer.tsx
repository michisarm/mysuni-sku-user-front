import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Icon, Segment } from 'semantic-ui-react';
import ReactQuill from 'react-quill';

import routePaths from '../../routePaths';
import { CategoryService, PostService } from '../../stores';
import BoardDetailContentHeaderView from '../view/BoardDetailContentHeaderView';

interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService;
  categoryService?: CategoryService;
}

@inject(mobxHelper.injectFrom('board.postService', 'board.categoryService'))
@observer
@reactAutobind
class FaqDetailContainer extends Component<Props> {
  //
  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, categoryService } = this.props;

    postService!.findPostByPostId(postId).then(() => {
      const categoryId = postService!.post.category.id;
      if (categoryId) {
        categoryService!.findCategoryByCategoryId(categoryId);
      }
    });
  }

  onClickList() {
    this.props.history.push(routePaths.supportFAQ());
  }

  render() {
    //
    const { post } = this.props.postService!;

    return (
      <>
        <div className="post-view">
          <BoardDetailContentHeaderView
            title={post.title}
            time={post.time}
            onClickList={this.onClickList}
          />

          {post.contents && (
            <div className="content-area">
              <div className="content-inner  ql-snow">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: post.contents.contents }}
                />
              </div>
            </div>
          )}
        </div>

        <Segment className="full">
          <div className="actions bottom">
            <Button icon className="left post list2" onClick={this.onClickList}>
              <Icon className="list24" /> List
            </Button>
          </div>
        </Segment>
      </>
    );
  }
}

export default withRouter(FaqDetailContainer);
