
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { PostDetail } from '@sku/personalcube';
import { CollegeService } from 'college';
import { ContentLayout } from 'shared';
import routePaths from '../../../routePaths';


interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string, postId: string }>{
  collegeService: CollegeService,
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
))
@reactAutobind
@observer
class PostDetailPage extends React.Component<Props> {
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

  routeTo(url: string) {
    const { collegeId, cubeId, lectureCardId } = this.props.match.params;
    this.props.history.push(`/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}${url}`);
  }

  render() {
    //
    const { lectureCardId, cubeId, postId } = this.props.match.params;
    const { collegeService } = this.props;
    const { college } = collegeService;

    return (
      <ContentLayout
        className="content community"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${college.name} Lecture`, path: routePaths.lectureCardOverviewPrev(college.collegeId, cubeId, lectureCardId) },
          { text: `Detail` },
        ]}
      >
        <section className="content community">
          <div className="post-view-wrap">
            <PostDetail
              postId={postId || ''}
              onEdit={() => this.routeTo(`/posts/${postId}/edit`)}
              onRemove={() => this.routeTo('')}
              onWriteReply={() => this.routeTo(`/posts/${postId}/reply/new`)}
              routeToList={() => this.routeTo('')}
            />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default withRouter(PostDetailPage);
