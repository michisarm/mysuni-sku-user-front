import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Review, CommentList } from '@nara.drama/feedback';
import { observer } from 'mobx-react';

interface Props {
  reviewFeedbackId: string;
  commentFeedbackId: string;
  name: string;
  email: string;
  companyName: string;
  departmentName: string;
}

interface State {}

@reactAutobind
@observer
class LectureCommentsContainer extends Component<Props, State> {
  //
  render() {
    console.log('@@@@@@@@@@@@@@@LectureCommentsContainer@@@@@@@@@@@@');
    //
    const {
      reviewFeedbackId,
      commentFeedbackId,
      name,
      email,
      companyName,
      departmentName,
    } = this.props;
    return (
      <div className="contents comment">
        <Review feedbackId={reviewFeedbackId} />
        <CommentList
          feedbackId={commentFeedbackId}
          hideCamera
          name={name}
          email={email}
          companyName={companyName}
          departmentName={departmentName}
        />
      </div>
    );
  }
}

export default LectureCommentsContainer;
