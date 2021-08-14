import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Icon } from 'semantic-ui-react';
import { ContentHeader } from 'shared';
import { SkProfileService } from 'profile/stores';

import defaultProfileImg from 'style/../../public/images/all/img-profile-56-px.png';
import routePaths from '../../../routePaths';
import CreateMovieModalContainer from './CreateMovieModalContainer';
import { Area } from 'tracker/model';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
}

@inject(
  mobxHelper.injectFrom('profile.skProfileService')
)
@reactAutobind
@observer
class CreateProfileContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    this.props.skProfileService!.findSkProfile();
  }

  onClickCreate() {
    this.props.history.push(routePaths.createNew());
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;

    return (
      <ContentHeader type="Create" dataArea={Area.CREATE_INFO}>
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            myPageActive
            image={skProfile.photoFilePath || defaultProfileImg}
            name={skProfile.profileViewName}
            company={parsePolyglotString(skProfile.companyName)}
            department={parsePolyglotString(skProfile.departmentName)}
            type="Create"
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="create-wrap">
          <Button className="personal line" onClick={this.onClickCreate}>
            <Icon className="create16" />
            <span className="blind"><PolyglotText defaultString="create" id="Create-mifa-제작" /></span>
            <span>Create</span>
          </Button>
          <CreateMovieModalContainer
            trigger={
              <Button
                className="personal line"
              >
                <Icon className="movie16" />
                <span className="blind">create movie</span>
                <span><PolyglotText defaultString="Create movie" id="Create-mifa-movie제작" /></span>
              </Button>
            }
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }
}

export default withRouter(CreateProfileContainer);
