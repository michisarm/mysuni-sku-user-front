import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { ContentHeader } from 'shared';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import CreateMovieDetailModal from './CreateMovieDetailModal';
import { EmployeeModel } from '../../../../profile';


interface Props {
  routeToCreateDetail:() => void
  member: EmployeeModel
}

interface States {
  CreateMovieDetailModalOpen:boolean
}

@reactAutobind
class CreateProfileView extends React.Component<Props, States> {

  state = {
    CreateMovieDetailModalOpen: false,
  };

  handleChangeOpen(CreateMovieDetailModalOpen: boolean) {
    this.setState({ CreateMovieDetailModalOpen });
  }

  render() {
    const { routeToCreateDetail, member } = this.props;
    const { CreateMovieDetailModalOpen } = this.state;
    return (
      <ContentHeader>
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            image={member.photoFilePath || profileImg}
            name={member.name}
            company={member.company}
            department={member.department}
            myPageActive
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell className="create-wrap">
          <Button className="personal line" onClick={routeToCreateDetail}>
            <Icon className="create16" /><span className="blind">create</span>
            <span>Create</span>
          </Button>
          <CreateMovieDetailModal
            open={CreateMovieDetailModalOpen}
            handleChangeOpen={this.handleChangeOpen}
          />
        </ContentHeader.Cell>
      </ContentHeader>
    );
  }

}


export default CreateProfileView;
