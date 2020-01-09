
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Review, CommentList } from '@nara.drama/feedback';
import { observer } from 'mobx-react';

interface Props {
  reviewFeedbackId: string
  commentFeedbackId: string
}


interface State {
}

@reactAutobind
@observer
class LectureCommentsContainer extends Component<Props, State> {
  //
  render() {
    //
    const { reviewFeedbackId, commentFeedbackId } = this.props;
    return (
      <div className="contents comment">
        <Review
          feedbackId={reviewFeedbackId}
        />
        <CommentList
          feedbackId={commentFeedbackId}
          hideCamera
        />
      </div>
    );
  }
}

export default LectureCommentsContainer;
