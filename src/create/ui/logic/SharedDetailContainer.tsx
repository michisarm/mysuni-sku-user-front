import * as React from 'react';
import {ContentLayout, mobxHelper} from 'shared';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import { PersonalCubeService } from '../../../personalcube/personalcube';
import { CubeIntroService } from '../../../personalcube/cubeintro';
import { MediaService } from '../../../personalcube/media';
import { OfficeWebService } from '../../../personalcube/officeweb';
import { BoardService } from '../../../personalcube/board';
import SharedDetailBasicInfoView from '../view/SharedDetailBasicInfoView';
import SharedDetailExposureInfoView from '../view/SharedDetailExposureInfoView';
import SharedDetailIntroView from '../view/SharedDetailIntroView';
import SharedTypeDetailView from '../view/SharedTypeDetailView';
import SharedDetailIntroEditContainer from './SharedDetailIntroEditContainer';

interface Props extends RouteComponentProps<{ personalCubeId: string, cubeType: string, cubeState: string }> {
  personalCubeService?: PersonalCubeService
  cubeIntroService?: CubeIntroService
  mediaService?: MediaService
  boardService?: BoardService
  officeWebService?: OfficeWebService
}

@inject(mobxHelper.injectFrom('personalCube.boardService', 'personalCube.personalCubeService',
  'personalCube.cubeIntroService', 'personalCube.mediaService', 'personalCube.officeWebService'))
@observer
@reactAutobind
class SharedDetailContainer extends React.Component<Props> {
  //
  componentDidMount() {
    const { personalCubeService, cubeIntroService } = this.props;
    const { personalCubeId, cubeType } = this.props.match.params;

    if (personalCubeService && cubeIntroService) {
      personalCubeService.findPersonalCube(personalCubeId)
        .then(() => {
          const cubeIntroId = personalCubeService.personalCube
            && personalCubeService.personalCube.cubeIntro && personalCubeService.personalCube.cubeIntro.id;
          cubeIntroService.findCubeIntro(cubeIntroId);
        })
        .then(() => {
          const contentsId = personalCubeService.personalCube && personalCubeService.personalCube.contents
            && personalCubeService.personalCube.contents.contents && personalCubeService.personalCube.contents.contents.id;
          if (cubeType === 'Audio' || cubeType === 'Video') this.setMedia(contentsId);
          if (cubeType === 'Community') this.setCommunity(contentsId);
          if (cubeType === 'Documents' || cubeType === 'WebPage') this.setOfficeWeb(contentsId);
        });
    }
  }

  setOfficeWeb(contentsId: string) {
    //
    const { officeWebService } = this.props;
    if (officeWebService) officeWebService.findOfficeWeb(contentsId);
  }

  setMedia(contentsId: string) {
    //
    const { mediaService } = this.props;
    if ( mediaService ) mediaService.findMedia(contentsId);
  }

  setCommunity(contentsId: string) {
    //
    const { boardService } = this.props;
    if ( boardService) boardService.findBoard(contentsId);
  }

  routeToCreateList() {
    //
    this.props.history.push(`/personalcube/create`);
  }

  render() {
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const { cubeIntro } = this.props.cubeIntroService || {} as CubeIntroService;
    const { cubeType, cubeState } = this.props.match.params;

    return (
      <ContentLayout className="bg-white">
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Detail</div>
            <div className="apl-notice">
              생성하신 학습에 대한 확인과 수정, 그리고 승인요청을 할수 있습니다.
            </div>
          </div>
        </div>
        <Segment className="full">
          <div className="apl-form-wrap create">
            <Form>
              <SharedDetailBasicInfoView
                personalCube ={personalCube}
              />
              <SharedDetailExposureInfoView
                personalCube={personalCube}
              />

              {
              cubeState === 'OpenApproval' ?
                <SharedDetailIntroView
                  cubeIntro={cubeIntro}
                  cubeType={cubeType}
                />
                :
                <SharedDetailIntroEditContainer
                  cubeIntro={cubeIntro}
                />
            }

              <SharedTypeDetailView
                personalCube={personalCube}
                cubeType={cubeType}
              />
              {
                cubeState === 'OpenApproval' ?
                  <>
                    {/* List 영역에서 저장 상태인 항목 view page 진입 시 */}
                    {/* <div className="buttons editor">
                  <Button className="fix line">Delete</Button>
                  <Button className="fix line">List</Button>
                  <Button className="fix line">Modify</Button>
                  <Button className="fix bg">Shared</Button>
                </div>
                */}
                    <br />
                    {/* // List 영역에서 저장 상태인 항목 view page 진입 시 */}
                    {/* List 영역에서 승인 대기상태인 항목 view page 진입 시 */}
                    <div className="buttons editor">
                      <Button className="fix bg" onClick={this.routeToCreateList}>List</Button>
                    </div>
                    <br />
                    {/* // List 영역에서 승인 대기상태인 항목 view page 진입 시 */}
                    {/* List 영역에서 승인 완료 상태 항목 view page 진입 시 */}
                    {/*<div className="buttons editor">
                  <Button className="fix line">List</Button>
                  <Button className="fix bg">Modify</Button>
                </div>*/}
                  </>
                  :
                  <div className="buttons">
                    <Button className="fix line" onClick={this.routeToCreateList}>Cancel</Button>
                    <Button className="fix bg">Save</Button>
                  </div>
              }

            </Form>
          </div>
        </Segment>
      </ContentLayout>

    );
  }
}
export default SharedDetailContainer;
