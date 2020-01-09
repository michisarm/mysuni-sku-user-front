
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Icon, Image } from 'semantic-ui-react';
import myTrainingRoutePaths from 'myTraining/routePaths';


interface Props extends RouteComponentProps {
  image: string,
  name: string,
  teams: string[],
  imageEditable?: boolean,
  myPageActive?: boolean,
  onEditImage?: () => void,
}

@reactAutobind
class ContentHeaderProfileItem extends Component<Props> {
  //
  static defaultProps = {
    imageEditable: false,
    myPageActive: false,
    onEditImage: () => {},
  };

  onClickMyPage() {
    this.props.history.push(myTrainingRoutePaths.myPage());
  }

  render() {
    //
    const {
      image, imageEditable, name, myPageActive, teams,
      onEditImage,
    } = this.props;

    return (
      <>
        <div className="profile">
          <div className="pic">
            <Image src={image} alt="Profile" />
          </div>
          { imageEditable && (
            <Button icon className="img-icon" onClick={onEditImage}>
              <Icon className="photo-edit" />
            </Button>
          )}
        </div>
        <div className="text-info">
          <div className="name">
            {name}
            { myPageActive && (
              <Button className="orange-arrow2" onClick={this.onClickMyPage}>My page</Button>
            )}
          </div>
          <div className="part">
            {teams.map((team, index) => (
              <span key={`profile_team_${index}`}>{team}</span>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ContentHeaderProfileItem);
