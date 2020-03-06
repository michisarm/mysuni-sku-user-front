
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Icon } from 'semantic-ui-react';
import { ContentHeader } from 'shared';
import { ActionLogService } from 'shared/stores';
import { SkProfileService } from 'profile/stores';

import defaultProfileImg from 'style/../../public/images/all/img-profile-56-px.png';
import routePaths from '../../../routePaths';
import CreateMovieModalContainer from './CreateMovieModalContainer';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService,
  skProfileService?: SkProfileService,
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',
))
@reactAutobind
@observer
class CreateProfileContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    this.props.skProfileService!.findSkProfile();
  }

  onClickCreate() {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: 'Create' });
    this.props.history.push(routePaths.createNew());
  }

  onClickCreateMovie() {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: 'Create movie' });
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;

    return (
      <ContentHeader>
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            myPageActive
            image={skProfile.photoFilePath || defaultProfileImg}
            name={skProfile.member.name}
            company={skProfile.member.company}
            department={skProfile.member.department}
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="create-wrap">
          <Button className="personal line" onClick={this.onClickCreate}>
            <Icon className="create16" /><span className="blind">create</span>
            <span>Create</span>
          </Button>
          <CreateMovieModalContainer
            trigger={(
              <Button className="personal line" onClick={this.onClickCreateMovie}>
                <Icon className="movie16" /><span className="blind">create movie</span>
                <span>Create Movie</span>
              </Button>
            )}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(CreateProfileContainer);
