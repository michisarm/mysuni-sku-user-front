import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { CollegeService } from 'college/stores';
import routePaths from '../../../routePaths';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import ChannelLecturesContainer from '../logic/ChannelLecturesContainer';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

interface Props
  extends RouteComponentProps<{ collegeId: string; channelId: string }> {
  collegeService: CollegeService;
}

@inject(mobxHelper.injectFrom('college.collegeService'))
@reactAutobind
@observer
class ChannelLecturesPage extends Component<Props> {
  //
  componentDidMount() {
    //
    this.findCollegeAndChannel();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (
      prevProps.match.params.collegeId !== this.props.match.params.collegeId ||
      prevProps.match.params.channelId !== this.props.match.params.channelId
    ) {
      this.findCollegeAndChannel();
    }
  }

  findCollegeAndChannel() {
    //
    const { match, collegeService } = this.props;

    collegeService.findCollegeAndChannel(
      match.params.collegeId,
      match.params.channelId
    );
  }

  render() {
    //
    const { collegeService } = this.props;
    const { college, channel } = collegeService;

    return (
      <ContentLayout
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
              channel.name,
              getDefaultLang(channel.langSupports)
            )}`,
          },
        ]}
      >
        <ChannelLecturesHeaderView
          channel={collegeService.channel}
          college={collegeService.college}
        />
        <ChannelLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
