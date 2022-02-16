import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { CollegeService } from 'college/stores';
import mainRoutePaths from 'main/routePaths';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ContentLayout } from 'shared';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';
import routePaths from '../../../routePaths';
import ChannelLecturesContainer from '../logic/ChannelLecturesContainer';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';

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

  onClickCurriculum() {
    //
    const { collegeService } = this.props;
    const { college, channel } = collegeService;

    let linkUrl = '';
    if (college.name.ko === 'AI') {
      linkUrl =
        parsePolyglotString(
          channel.name,
          getDefaultLang(channel.langSupports)
        ) === 'AI/DT Literacy'
          ? '/certification/badge/badge-detail/BADGE-2t'
          : mainRoutePaths.introductionCollegeAI(
              parsePolyglotString(
                channel.name,
                getDefaultLang(channel.langSupports)
              )
            );
    } else if (college.name.ko === 'DT') {
      linkUrl =
        parsePolyglotString(
          channel.name,
          getDefaultLang(channel.langSupports)
        ) === 'DT Biz.& Implementation'
          ? mainRoutePaths.introductionCollegeDT('DT Biz. & Implementation')
          : mainRoutePaths.introductionCollegeDT(
              parsePolyglotString(
                channel.name,
                getDefaultLang(channel.langSupports)
              )
            );
    } else if (college.name.ko === 'Management') {
      linkUrl =
        parsePolyglotString(
          channel.name,
          getDefaultLang(channel.langSupports)
        ) === '营销/品牌'
          ? mainRoutePaths.introductionCollegeManagement('市场/品牌')
          : mainRoutePaths.introductionCollegeManagement(
              parsePolyglotString(
                channel.name,
                getDefaultLang(channel.langSupports)
              )
            );
    } else {
      linkUrl =
        college.name.en === 'Innovation & Design'
          ? mainRoutePaths.introductionCollege('Innovation & Design')
          : mainRoutePaths.introductionCollege(
              parsePolyglotString(
                college.name,
                getDefaultLang(college.langSupports)
              )
            );
    }

    this.props.history.push(linkUrl);
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
          onClickCurriculum={this.onClickCurriculum}
        />
        <ChannelLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(ChannelLecturesPage);
