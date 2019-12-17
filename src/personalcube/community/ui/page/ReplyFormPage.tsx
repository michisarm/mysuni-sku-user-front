
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { ReplyForm } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout } from 'shared';

interface Props extends RouteComponentProps<{ cubeId: string, postId: string, replyId: string }>{
}

@reactAutobind
class ReplyFormPage extends React.Component<Props> {
  //
  routeTo() {
    const { cubeId, postId } = this.props.match.params;
    this.props.history.push(`/community/${cubeId}/posts${postId && postId !== 'new' ? `/${postId}` : ''}`);
  }

  routeToList() {
    const { cubeId } = this.props.match.params;
    this.props.history.push(`/community/${cubeId}/posts`);
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
