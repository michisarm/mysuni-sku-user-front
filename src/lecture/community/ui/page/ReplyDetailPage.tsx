import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ReplyDetail } from '@sku/personalcube';
import { CollegeService } from 'college/stores';
import { ContentLayout } from 'shared';
import routePaths from '../../../routePaths';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

interface Props
  extends RouteComponentProps<{
    collegeId: string;
    cubeId: string;
    lectureCardId: string;
    postId: string;
    replyId: string;
  }> {
  collegeService: CollegeService;
}

@inject(mobxHelper.injectFrom('college.collegeService'))
@reactAutobind
@observer
class ReplyDetailPage extends React.Component<Props> {
  //
  componentDidMount() {
    //
    this.init();
  }

  init() {
    const { match, collegeService } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
  }

  routeTo(url: string) {
    const { collegeId, cubeId, lectureCardId } = this.props.match.params;
    this.props.history.push(
      `/lecture/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}${url}`
    );
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
          {
            text: `${parsePolyglotString(
              college.name,
              getDefaultLang(college.langSupports)
            )}`,
            path: routePaths.collegeLectures(college.collegeId),
          },
          {
            text: `${parsePolyglotString(
              college.name,
              getDefaultLang(college.langSupports)
            )} Lecture`,
            path: routePaths.lectureCardOverviewPrev(
              college.collegeId,
              cubeId,
              lectureCardId
            ),
          },
          { text: `Detail Reply` },
        ]}
      >
        <section className="content community">
          <div className="post-view-wrap">
            <ReplyDetail
              replyId={replyId || ''}
              onEdit={() =>
                this.routeTo(`/posts/${postId}/reply/${replyId}/edit`)
              }
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
