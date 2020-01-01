import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { ContentHeader } from 'shared';
import CreateMovieDetailModal from '../view/CreateMovieDetailModal';
import { EmployeeModel } from '../../../profile';

interface Props {
  routeToCreateDetail:() => void
  member: EmployeeModel
}

interface States {
  CreateMovieDetailModalOpen:boolean
}

@reactAutobind
class CreateProfileView extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = {
      CreateMovieDetailModalOpen: false,
    };
  }

  handleChangeOpen(CreateMovieDetailModalOpen: boolean) {
    this.setState({ CreateMovieDetailModalOpen });
  }

  render() {
    const { routeToCreateDetail, member } = this.props;
    const { CreateMovieDetailModalOpen } = this.state;
    return (
      <div className="main-info-area">
        <div className="progress-info-wrap">
          <div className="cell">
            <div className="cell-inner">
              <div className="profile">
                <div className="pic">
                  <ContentHeader.ProfileItem
                    image={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/profile-56-px.png`}
                    name={member.name}
                    teams={[member.company || '', member.department || '']}
                  />
                </div>
              </div>
              <div className="text-info">
                <div className="name">
                  {member.name} <Button className="orange-arrow2">My page</Button>
                </div>
                <div className="part">
                  <span>{member.company}</span><span>{member.department }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cell create-wrap">
            <Button className="personal line" onClick={routeToCreateDetail}>
              <Icon className="create16" /><span className="blind">create</span>
              <span>Create</span>
            </Button>
            <CreateMovieDetailModal
              open={CreateMovieDetailModalOpen}
              handleChangeOpen={this.handleChangeOpen}
            />
            {/* <span>Create Movie</span>*/}
          </div>
        </div>
      </div>
    );
  }

}


export default CreateProfileView;
