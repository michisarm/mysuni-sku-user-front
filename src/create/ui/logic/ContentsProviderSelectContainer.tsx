import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { mobxHelper } from 'shared';
import { CubeIntroService } from 'personalcube/cubeintro';
import { MediaService } from 'personalcube/media';
import { ContentsProviderService } from 'college';
import ContentsProviderSelectForCubeIntroView from '../view/ContentsProviderSelectForCubeIntroView';
import ContentsProviderSelectForMediaView from '../view/ContentsProviderSelectForMediaView';



interface Props extends RouteComponentProps {
  cubeIntroService?: CubeIntroService
  contentsProviderService?: ContentsProviderService
  mediaService?: MediaService
  defaultValue?: string
  targetProps?: string
  type: string
}

@inject(mobxHelper.injectFrom(
  'personalCube.cubeIntroService',
  'college.contentsProviderService',
  'personalCube.mediaService',
))
@observer
@reactAutobind
class ContentsProviderSelectContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    const { contentsProviderService } = this.props;
    if (contentsProviderService) {
      this.findAllContentsProviders();
    }
  }

  onSetCubeIntroPropsByJSON(name: string, value: string) {
    //
    const { cubeIntroService } = this.props;
    const newValue = JSON.parse(value);
    if (cubeIntroService) cubeIntroService.changeCubeIntroProps(name, newValue);
  }

  onChangeCubeIntroProps(name: string, value: string) {
    //
    const { cubeIntroService } = this.props;
    if (cubeIntroService) cubeIntroService.changeCubeIntroProps(name, value);
  }

  onSetMediaPropsByJSON(name: string, value: string) {
    //
    const { mediaService } = this.props;
    const newValue = JSON.parse(value);
    if (mediaService) mediaService.changeMediaProps(name, newValue);
  }

  findAllContentsProviders() {
    //
    const { contentsProviderService } = this.props;
    if (contentsProviderService) contentsProviderService.findAllContentsProviders();
  }

  setContentsProvider() {
    const selectContentsProviderType: any = [];
    const { contentsProviders } = this.props.contentsProviderService || {} as ContentsProviderService;
    contentsProviders.forEach((contentsProvider, index) => {
      selectContentsProviderType.push(
        {
          key: contentsProvider.contentsProvider.id,
          text: contentsProvider.contentsProvider.name,
          value: JSON.stringify(contentsProvider.contentsProvider),
        });
    });
    return selectContentsProviderType;
  }

  onChangeMediaProps(name: string, value: string) {
    //
    const { mediaService } = this.props;
    if (mediaService) mediaService.changeMediaProps(name, value);
  }

  renderForCubeIntro() {
    //
    const { defaultValue, targetProps } = this.props;
    const { cubeIntro } = this.props.cubeIntroService || {} as CubeIntroService;
    const etcCp = cubeIntro && cubeIntro.operation && cubeIntro.operation.etcCp;
    const organizer = cubeIntro && cubeIntro.operation && cubeIntro.operation.organizer;
    return (
      <ContentsProviderSelectForCubeIntroView
        defaultValue={defaultValue}
        targetProps={targetProps}
        onSetCubeIntroPropsByJSON={this.onSetCubeIntroPropsByJSON}
        setContentsProvider={this.setContentsProvider}
        onChangeCubeIntroProps={this.onChangeCubeIntroProps}
        organizer={organizer}
        etcCp={etcCp}
      />
    );
  }

  renderForMedia() {
    //
    const { defaultValue, targetProps } = this.props;
    return (
      <ContentsProviderSelectForMediaView
        defaultValue={defaultValue}
        targetProps={targetProps}
        onSetMediaPropsByJSON={this.onSetMediaPropsByJSON}
        setContentsProvider={this.setContentsProvider}
      />
    );
  }


  render() {
    const { type } = this.props;

    if (type === 'media') return this.renderForMedia();
    else return this.renderForCubeIntro();
  }
}

export default withRouter(ContentsProviderSelectContainer);
