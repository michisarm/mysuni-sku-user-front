
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ReplyForm } from '@sku/personalcube';
import { CollegeService } from 'college/stores';
import { ContentLayout } from 'shared';
import routePaths from '../../../routePaths';


interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string,  postId: string, replyId: string }>{
  collegeService: CollegeService,
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
))
@reactAutobind
@observer
class ReplyFormPage extends React.Component<Props> {
  //
  //
  componentDidMount() {
    //
    this.init();
  }

  init() {
    const {
      match, collegeService,
    } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
  }

  routeTo() {
    const { collegeId, cubeId, lectureCardId, postId } = this.props.match.params;
    this.props.history.push(`/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/posts${postId && postId !== 'new' ? `/${postId}` : ''}`);
  }

  routeToList() {
    const { collegeId, cubeId, lectureCardId } = this.props.match.params;
    this.props.history.push(routePaths.lectureCardOverviewPrev(collegeId, cubeId, lectureCardId));
  }

  render() {
    //
    const { lectureCardId, cubeId, postId, replyId } = this.props.match.params;
    const { collegeService } = this.props;
    const { college } = collegeService;

    return (
      <ContentLayout
        className="content bg-white"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${college.name} Lecture`, path: routePaths.lectureCardOverviewPrev(college.collegeId, cubeId, lectureCardId) },
          { text: `Post`, path: `/lecture/college/${college.collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/posts/${postId}` },
          { text: `Detail Reply` },
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
