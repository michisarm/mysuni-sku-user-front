
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { ReplyDetail } from '@sku/personalcube';
import { CollegeService } from 'college';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout, mobxHelper } from 'shared';
import { inject, observer } from 'mobx-react';
import routePaths from '../../../routePaths';


interface Props extends RouteComponentProps<{ collegeId: string, cubeId: string, lectureCardId: string, postId: string, replyId: string }>{
  collegeService: CollegeService,
}

@inject(mobxHelper.injectFrom(
  'collegeService',
))
@reactAutobind
@observer
class ReplyDetailPage extends React.Component<Props> {
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
    this.props.history.push(`/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}/${url}`);
  }

  render() {
    //
    const { lectureCardId, cubeId, postId, replyId } = this.props.match.params;
    const { collegeService } = this.props;
    const { college } = collegeService;

    return (
      <ContentLayout
        className="content community"
        breadcrumb={[
          { text: `${college.name} College`, path: routePaths.collegeLectures(college.collegeId) },
          { text: `${college.name} Lecture`, path: routePaths.lectureCardOverview(college.collegeId, cubeId, lectureCardId) },
          { text: `Detail Reply` },
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
