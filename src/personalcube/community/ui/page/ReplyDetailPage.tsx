
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { ReplyDetail } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout } from 'shared';

interface Props extends RouteComponentProps<{ cubeId: string, postId: string, replyId: string }>{
}

@reactAutobind
class ReplyDetailPage extends React.Component<Props> {
  //
  routeTo(url: string) {
    const { cubeId } = this.props.match.params;
    this.props.history.push(`/community/${cubeId}/${url}`);
  }

  render() {
    //
    const { postId, replyId } = this.props.match.params;

    return (
      <ContentLayout
        className="content community"
        breadcrumb={[
          { text: `Community` },
        ]}
      >
        <section className="content community">
          <div className="post-view-wrap">
            <ReplyDetail
              replyId={replyId || ''}
              onEdit={() => this.routeTo(`posts/${postId}/reply/${replyId}/edit`)}
              onRemove={() => this.routeTo('posts')}
              routeToList={() => this.routeTo('posts')}
            />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default withRouter(ReplyDetailPage);
