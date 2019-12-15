import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Form, Segment } from 'semantic-ui-react';
import { PersonalCubeService } from 'personalcube/personalcube';
import { ContentLayout } from 'shared';
import CreateBasicInfoContainer from './CreateBasicInfoContainer';
import CreateExposureInfoContainer from './CreateExposureInfoContainer';


interface Props extends RouteComponentProps<{cubeId: string}>{
  personalCubeService?: PersonalCubeService

}

@inject('personalCubeService')
@observer
@reactAutobind
class CreateDetailContainer extends React.Component<Props> {

  onChangePersonalCubeProps(name: string, value: string | {}) {
    //
    const { personalCubeService } = this.props;
    let getTagList = [];
    if (personalCubeService && name === 'tagInfo.tag' && typeof value === 'string') {
      getTagList = value.split(',');
      personalCubeService.changeCubeProps('tagInfo.tags', getTagList);
    }
    if (personalCubeService && name !== 'tagInfo.tags') personalCubeService.changeCubeProps(name, value);
  }

  changePersonalCubeProps(name: string, value: string | {}) {
    //
    const { personalCubeService } = this.props;
    if (personalCubeService ) personalCubeService.changePersonalCubeProps(name, value);
    console.log(name);
    console.log(value);
  }

  render() {
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    return (
      <ContentLayout className="bg-white">
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Create</div>
            <div className="apl-notice">
              내가 갖고 있는 지식을 강좌로 만들 수 있습니다.<br />관리자의 확인 절차를 거쳐 다른 University 사용자에게 전파해보세요.
            </div>
          </div>
        </div>
        <Segment className="full">
          <div className="apl-form-wrap create">
            <Form>
              <CreateBasicInfoContainer
                //cubeId={cubeId}
                personalCube={personalCube}
                onChangePersonalCubeProps={this.onChangePersonalCubeProps}
                changePersonalCubeProps={this.changePersonalCubeProps}
              />
              <CreateExposureInfoContainer
                personalCube={personalCube}
                onChangePersonalCubeProps={this.onChangePersonalCubeProps}
                changePersonalCubeProps={this.changePersonalCubeProps}
                //tags={tags}
              />
            </Form>
          </div>
        </Segment>
      </ContentLayout>
    );
  }
}

export default CreateDetailContainer;
