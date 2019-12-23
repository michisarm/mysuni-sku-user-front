
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { ReplyForm } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout } from 'shared';

interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string,  postId: string, replyId: string }>{
}

@reactAutobind
class ReplyFormPage extends React.Component<Props> {
  //
  routeTo() {
    const { collegeId, cubeId, lectureCardId, postId } = this.props.match.params;
    this.props.history.push(`/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/posts${postId && postId !== 'new' ? `/${postId}` : ''}`);
  }

  routeToList() {
    const { collegeId, cubeId, lectureCardId } = this.props.match.params;
    this.props.history.push(`/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}`);
  }

  render() {
    //
    const { postId, replyId } = this.props.match.params;

    return (
      <ContentLayout
        className="content bg-white"
        breadcrumb={[
          { text: `Community` },
        ]}
      >
        <ReplyForm
          postId={postId || ''}
          replyId={replyId && replyId !== 'new' ? replyId : ''}
          onCancel={this.routeTo}
          onSaveCallback={this.routeToList}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(ReplyFormPage);
