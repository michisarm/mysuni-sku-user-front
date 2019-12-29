import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { MediaService } from '../../../personalcube/media';
import { CubeIntroService } from '../../../personalcube/cubeintro';
import { OfficeWebService } from '../../../personalcube/officeweb';
import { PersonalCubeService } from '../../../personalcube/personalcube';
import CreateAudioTypeView from '../view/CreateAudioTypeView';
import CreateVideoTypeView from '../view/CreateVideoTypeView';
import CreateWebPageTypeView from '../view/CreateWebPageTypeView';
import CreateDocumentTypeView from '../view/CreateDocumentTypeView';
import CreateCommunityTypeView from '../view/CreateCommunityTypeView';

interface Props extends RouteComponentProps {
  mediaService?: MediaService
  officeWebService?: OfficeWebService
  cubeIntroService?: CubeIntroService
  personalCubeService?: PersonalCubeService
  cubeType: string
}

interface States {
  searchFilter: string
}

@inject('mediaService', 'cubeIntroService', 'officeWebService', 'personalCubeService')
@observer
@reactAutobind
class CreateMediaContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = { searchFilter: 'SearchOff' };
  }

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

  handleChangeSearchFilter(e:any, data: any) {
    this.setState({ searchFilter: data.value });
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
    const { searchFilter } = this.state;
    const { cubeType } = this.props;
    return (
      <>
        {
          cubeType === 'Video' ?
            <CreateVideoTypeView
              media={media}
              handleChangeSearchFilter={this.handleChangeSearchFilter}
              onChangeMediaProps={this.onChangeMediaProps}
              searchFilter={searchFilter}
              getFileBoxIdForReference ={this.getFileBoxIdForReference}
              personalCube={personalCube}
            />
            : null
        }
        {
          cubeType === 'Audio' ?
            <CreateAudioTypeView
              media={media}
              handleChangeSearchFilter={this.handleChangeSearchFilter}
              onChangeMediaProps={this.onChangeMediaProps}
              searchFilter={searchFilter}
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
              handleChangeSearchFilter={this.handleChangeSearchFilter}
              searchFilter={searchFilter}
              getFileBoxIdForReference ={this.getFileBoxIdForReference}
              personalCube={personalCube}
            />
            : null
        }
        {
          cubeType === 'Documents' ?
            <CreateDocumentTypeView
              handleChangeSearchFilter={this.handleChangeSearchFilter}
              onChangeOfficeWebProps={this.onChangeOfficeWebProps}
              officeWeb={officeWeb}
              searchFilter={searchFilter}
              getFileBoxIdForReference ={this.getFileBoxIdForReference}
              personalCube={personalCube}
            />
            : null
        }
        {
          cubeType === 'Community' ?
            <CreateCommunityTypeView
              handleChangeSearchFilter={this.handleChangeSearchFilter}
              onChangeMediaProps={this.onChangeMediaProps}
              searchFilter={searchFilter}
            />
            : null
        }
      </>
    );
  }
}

export default withRouter(CreateMediaContainer);
