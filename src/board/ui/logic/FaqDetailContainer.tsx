import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Button, Icon, Segment } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import { ContentLayout } from 'shared';
import { CategoryService, PostService } from '../../../board';


interface Props extends RouteComponentProps<{ postId: string }> {
  postService?: PostService
  categoryService?: CategoryService
}

@inject(mobxHelper.injectFrom(
  'board.postService',
  'board.categoryService',
))
@observer
@reactAutobind
class FaqDetailContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    const { postId } = this.props.match.params;
    const { postService, categoryService } = this.props;

    if (postService && categoryService) {
      Promise.resolve()
        .then(() => postService.findPostByPostId(postId))
        .then(() => {
          if (postService.post.category.id) categoryService.findCategoryByCategoryId(postService.post.category.id);
        });
    }
  }

  onClose(boardId: string) {
    this.props.history.push(`/board/support/${boardId}`);
  }

  render() {
    //
    const { post } = this.props.postService || {} as PostService;

    return (
      <ContentLayout
        className="support"
        breadcrumb={[
          { text: 'Support' },
          { text: 'FAQ' },
        ]}
      >
        <div className="post-view-wrap">
          <div className="post-view">
            {
              post && (
                <div className="title-area">
                  <div className="title-inner">
                    <div className="title"> {post.title}</div>
                    <div className="user-info">
                      <span className="date">{post.time && new Date(post.time).toLocaleDateString()}</span>
                    </div>
                    <div className="actions">
                      <Button icon className="left postset commu-list16" onClick={() => this.onClose('FAQ')}><Icon
                        className="commu-list16"
                      />List
                      </Button>
                    </div>
                  </div>
                </div>
              )
            }
            {
              post && post.contents && (
                <div className="content-area">
                  <div className="content-inner">
                    <ReactQuill
                      theme="bubble"
                      value={post && post.contents && post.contents.contents || ''}
                      readOnly
                    />
                  </div>
                </div>
              )
            }
          </div>
          <Segment className="full">
            <div className="actions bottom">
              <Button icon className="left post list2" onClick={() => this.onClose('FAQ')}>
                <Icon className="list24" /> List
              </Button>
            </div>
          </Segment>
        </div>

      </ContentLayout>
    );
  }
}

export default FaqDetailContainer;
