import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { MediaService } from '../../../personalcube/media';
import { CubeIntroService } from '../../../personalcube/cubeintro';
import CreateAudioTypeView from '../view/CreateAudioTypeView';
import CreateVideoTypeView from '../view/CreateVideoTypeView';
import CreateWebPageTypeView from '../view/CreateWebPageTypeView';

interface Props extends RouteComponentProps {
  mediaService?: MediaService
  cubeIntroService?: CubeIntroService
  cubeType: string
}

interface States {
  searchFilter: string
}

@inject('mediaService', 'cubeIntroService')
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
    console.log(value);
    const { mediaService } = this.props;
    if (mediaService) mediaService.changeMediaProps(name, value);
    if (mediaService && typeof value === 'object' && nameSub) {
      const stringDate = value.toLocaleDateString().replace('. ', '-').replace('. ', '-').replace('.', '');
      mediaService.changeMediaProps(name, value, nameSub, stringDate);
    }
    /*  if (mediaService) {
        mediaService.changeMediaProps(name, value);
      }*/
  }

  handleChangeSearchFilter(e:any, data: any) {
    console.log(data.value);
    this.setState({ searchFilter: data.value });
  }

  render() {
    const { media } = this.props.mediaService || {} as MediaService;
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
            />
            : null
        }
        {
          cubeType === 'WebPage' || cubeType === 'Documents' ?
            <CreateWebPageTypeView
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
