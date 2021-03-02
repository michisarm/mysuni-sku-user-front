
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Icon, Image } from 'semantic-ui-react';
import myTrainingRoutePaths from 'myTraining/routePaths';
import ProfilPhotoChangeModal from '../../../../myTraining/ui/logic/ProfilPhotoChangeModal';
import DashBoardSentenceContainer from '../DashBoardSentence/ui/logic/DashBoardSentenceContainer';


interface Props extends RouteComponentProps {
  image: string,
  name: string,
  company: string,
  department: string,
  imageEditable?: boolean,
  myPageActive?: boolean,
  onEditImage?: () => void,
}

@reactAutobind
class ContentHeaderProfileItem extends PureComponent<Props> {
  //
  static defaultProps = {
    imageEditable: false,
    myPageActive: false,
    onEditImage: () => { },
  };

  onClickMyPage() {
    this.props.history.push(myTrainingRoutePaths.myPage());
  }

  render() {
    //
    const {
      image, imageEditable, name, myPageActive, company, department,
    } = this.props;
    return (
      <>
        {/* <div className="personal-inner"> */}
        <div className="profile">
          <div className="pic">
            <Image src={image} alt="Profile" />
          </div>
          {myPageActive && (
            <button onClick={this.onClickMyPage}>
              <Icon className="my20" />
              <span className="blind">my</span>
            </button>
          )}
          {imageEditable && (
            <ProfilPhotoChangeModal
              name={name}
              company={company}
              department={department}
              trigger={<Button icon className="img-icon"><Icon className="photo-edit" /></Button>}
            />
          )}
        </div>
        {/* </div> */}
        <div className="text-info">
          <div className="name">
            {name}님,11
          </div>
          <div className="part">
          <DashBoardSentenceContainer/>
            {/* <span>{company}</span><br /><span>{department}</span> */}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ContentHeaderProfileItem);
