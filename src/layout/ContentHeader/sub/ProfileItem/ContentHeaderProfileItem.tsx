import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';

import { Button, Icon } from 'semantic-ui-react';
import myTrainingRoutePaths from 'myTraining/routePaths';
import ProfilPhotoChangeModal from '../../../../myTraining/ui/logic/ProfilPhotoChangeModal';
import DashBoardSentenceContainer from '../DashBoardSentence/ui/logic/DashBoardSentenceContainer';
import Image from '../../../../shared/components/Image';

interface Props extends RouteComponentProps {
  image: string;
  name: string;
  company: string;
  department: string;
  imageEditable?: boolean;
  myPageActive?: boolean;
  onEditImage?: () => void;
  type?: string;
}

@reactAutobind
class ContentHeaderProfileItem extends PureComponent<Props> {
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
      image,
      imageEditable,
      name,
      myPageActive,
      company,
      department,
      type,
    } = this.props;
    return (
      <>
        {/* <div className="personal-inner"> */}
        <div className="profile">
          <div className="pic">
            <Image src={image} alt="Profile" />
          </div>
          {/* {myPageActive && (
            <button onClick={this.onClickMyPage}>
              <Icon className="my20" />
              <span className="blind">my</span>
            </button>
          )} */}
          {imageEditable && (
            <ProfilPhotoChangeModal
              name={name}
              company={company}
              department={department}
              trigger={
                <Button icon className="img-icon">
                  <Icon className="photo-edit" />
                </Button>
              }
            />
          )}
        </div>
        {/* </div> */}
        <div className="text-info">
          <div className="name">{name}님,</div>
          <div className="part">
            {type === 'Recommend' && <p>나의 관심 채널을 확인해볼까요?</p>}
            {type === 'Learning' && <p>오늘도 지식이 쑥쑥 자라나고 있어요.</p>}
            {type === 'Create' && <p>나만의 학습 콘텐츠를 만들어 보세요.</p>}
            {type !== 'Recommend' &&
              type !== 'Learning' &&
              type !== 'Create' && <DashBoardSentenceContainer />}
            {/* <span>{company}</span><br /><span>{department}</span> */}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ContentHeaderProfileItem);
