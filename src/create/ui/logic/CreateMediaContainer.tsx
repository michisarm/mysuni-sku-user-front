import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { MediaService, CubeIntroService, OfficeWebService, PersonalCubeService } from 'personalcube';
import CreateAudioTypeView from '../view/CreateAudioTypeView';
import CreateVideoTypeView from '../view/CreateVideoTypeView';
import CreateWebPageTypeView from '../view/CreateWebPageTypeView';
import CreateDocumentTypeView from '../view/CreateDocumentTypeView';
import CreateCommunityTypeView from '../view/CreateCommunityTypeView';

interface Props extends RouteComponentProps {
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void
  mediaService?: MediaService
  officeWebService?: OfficeWebService
  cubeIntroService?: CubeIntroService
  personalCubeService?: PersonalCubeService
  cubeType: string
}

@inject(mobxHelper.injectFrom(
  'personalCube.mediaService',
  'personalCube.cubeIntroService',
  'personalCube.officeWebService',
  'personalCube.personalCubeService',
))
@observer
@reactAutobind
class CreateMediaContainer extends React.Component<Props> {
  // Cube 관리 > create > Audio
  // 교육정보
  onChangeMediaProps(name: string, value: string | Date, nameSub?: string) {
    //
    const { mediaService } = this.props;
    if (mediaService) mediaService.changeMediaProps(name, value);
    if (mediaService && typeof value === 'object' && nameSub) {
      const stringDate = value.toLocaleDateString().replace('. ', '-').replace('. ', '-').replace('.', '');
      mediaService.changeMediaProps(name, value, nameSub, stringDate);
      if (name.indexOf('startDateSub') !== -1) {
        const newName = name.replace('startDateSub', 'endDateSub');
        mediaService.changeMediaProps(newName, value, nameSub, stringDate);
      }
    }
    if (mediaService) {
      mediaService.changeMediaProps(name, value);
    }
  }

  onChangeOfficeWebProps(name: string, value: string | Date | boolean, nameSub?: string) {
    //
    const { officeWebService } = this.props;
    if (officeWebService && typeof value === 'object' && nameSub) {
      const stringDate = value.toLocaleDateString()
        .replace('. ', '-')
        .replace('. ', '-')
        .replace('.', '');
      officeWebService.changeOfficeWebProps(name, value, nameSub, stringDate);
    }
    if (officeWebService) officeWebService.changeOfficeWebProps(name, value);
  }

  getFileBoxIdForReference(fileBoxId: string) {
    //
    const { personalCubeService } = this.props;
    const { personalCube } = personalCubeService || {} as PersonalCubeService;
    if (personalCubeService && personalCube.contents) personalCubeService.changeCubeProps('contents.fileBoxId', fileBoxId);
  }

  render() {
    const { media } = this.props.mediaService || {} as MediaService;
    const { officeWeb } = this.props.officeWebService || {} as OfficeWebService;
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const { cubeType, onChangePersonalCubeProps } = this.props;
    return (
      <>
        {
          cubeType === 'Video' ?
            <CreateVideoTypeView
              media={media}
              onChangePersonalCubeProps={onChangePersonalCubeProps}
              onChangeMediaProps={this.onChangeMediaProps}
              getFileBoxIdForReference ={this.getFileBoxIdForReference}
              personalCube={personalCube}
            />
            : null
        }
        {
          cubeType === 'Audio' ?
            <CreateAudioTypeView
              media={media}
              onChangePersonalCubeProps={onChangePersonalCubeProps}
              onChangeMediaProps={this.onChangeMediaProps}
              getFileBoxIdForReference ={this.getFileBoxIdForReference}
              personalCube={personalCube}
            />
            : null
        }
        {
          cubeType === 'WebPage' ?
            <CreateWebPageTypeView
              onChangeOfficeWebProps={this.onChangeOfficeWebProps}
              officeWeb={officeWeb}
              onChangePersonalCubeProps={onChangePersonalCubeProps}
              getFileBoxIdForReference ={this.getFileBoxIdForReference}
              personalCube={personalCube}
            />
            : null
        }
        {
          cubeType === 'Documents' ?
            <CreateDocumentTypeView
              onChangePersonalCubeProps={onChangePersonalCubeProps}
              onChangeOfficeWebProps={this.onChangeOfficeWebProps}
              officeWeb={officeWeb}
              getFileBoxIdForReference ={this.getFileBoxIdForReference}
              personalCube={personalCube}
            />
            : null
        }
        {
          cubeType === 'Community' ?
            <CreateCommunityTypeView
              onChangePersonalCubeProps={onChangePersonalCubeProps}
              onChangeMediaProps={this.onChangeMediaProps}
              personalCube={personalCube}
            />
            : null
        }
      </>
    );
  }
}

export default withRouter(CreateMediaContainer);
