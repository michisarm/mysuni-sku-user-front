
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import {  PostDetail } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout } from 'shared';

interface Props extends RouteComponentProps<{ cubeId: string, postId: string }>{
}

@reactAutobind
class PostDetailPage extends React.Component<Props> {
  //
  routeTo(url: string) {
    const { cubeId } = this.props.match.params;
    this.props.history.push(`/community/${cubeId}/${url}`);
  }

  render() {
    //
    const { postId } = this.props.match.params;

    return (
      <ContentLayout
        className="content community"
        breadcrumb={[
          { text: `Community` },
        ]}
      >
        <section className="content community">
          <div className="post-view-wrap">
            <PostDetail
              postId={postId || ''}
              onEdit={() => this.routeTo(`posts/${postId}/edit`)}
              onRemove={() => this.routeTo('posts')}
              onWriteReply={() => this.routeTo(`posts/${postId}/reply/new`)}
              routeToList={() => this.routeTo('posts')}
            />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default withRouter(PostDetailPage);
