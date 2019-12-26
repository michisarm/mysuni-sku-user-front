
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { mobxHelper } from 'shared';
import { FavoriteChannelChangeModal } from 'shared-component';
import { CollegeService, CollegeModel, ChannelModel } from 'college';
import { SkProfileService, StudySummary } from 'profile';
import CategoryView from '../view/CategoryView';



interface Props extends RouteComponentProps {
  collegeService?: CollegeService,
  skProfileService?: SkProfileService,
}

interface State {
  categoryOpen: boolean,
  activeCollege?: CollegeModel,
}

@inject(mobxHelper.injectFrom('shared.collegeService', 'skProfileService'))
@reactAutobind
@observer
class CategoryContainer extends Component<Props, State> {
  //
  modal: any = React.createRef();

  state = {
    categoryOpen: false,
    activeCollege: undefined,
  };

  componentDidMount() {
    //
    const { collegeService } = this.props;

    collegeService!.findAllColleges();
    this.findStudySummary();
  }

  findStudySummary() {
    const { skProfileService } = this.props;

    skProfileService!.findStudySummary();
  }

  onClickCategory() {
    //
    this.setState((state) => ({
      categoryOpen: !state.categoryOpen,
    }));
  }

  onActiveCollege(e: any, college: CollegeModel) {
    //
    const { collegeService } = this.props;

    this.setState({
      activeCollege: college,
    });
    collegeService!.setChannels(college.channels);
  }

  onClickChannel(e: any, channel?: ChannelModel) {
    //
    const { activeCollege } = this.state;
    const active: CollegeModel = activeCollege as any;

    if (!channel) {
      this.props.history.push(`/lecture/college/${active.collegeId}/channels`);
    }
    else if (active.collegeId && channel.id) {
      this.props.history.push(`/lecture/college/${active.collegeId}/channel/${channel.id}`);
    }
    this.setState({
      categoryOpen: false,
    });
  }

  onModalOpen() {
    this.modal.onOpenModal();
    this.onClickCategory();
  }

  render() {
    //
    const { collegeService } = this.props;
    const { categoryOpen, activeCollege } = this.state;
    const { skProfileService } = this.props;

    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    return (
      <>
        <CategoryView
          open={categoryOpen}
          colleges={collegeService!.colleges}
          activeCollege={activeCollege}
          channels={collegeService!.channels}
          onClick={this.onClickCategory}
          onActiveCollege={this.onActiveCollege}
          onClickChannel={this.onClickChannel}
          onModalOpen={this.onModalOpen}
        />
        <FavoriteChannelChangeModal
          ref={modal => this.modal = modal}
          favorites={channels}
          onConfirmCallback={this.findStudySummary}
        />
      </>
    );
  }
}

export default withRouter(CategoryContainer);
