
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { ReplyDetail } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout } from 'shared';

interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string, postId: string, replyId: string }>{
}

@reactAutobind
class ReplyDetailPage extends React.Component<Props> {
  //
  routeTo(url: string) {
    const { collegeId, cubeId, lectureCardId } = this.props.match.params;
    this.props.history.push(`${process.env.PUBLIC_URL}/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/${url}`);
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
              onRemove={() => this.routeTo('')}
              routeToList={() => this.routeTo('')}
            />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default withRouter(ReplyDetailPage);
