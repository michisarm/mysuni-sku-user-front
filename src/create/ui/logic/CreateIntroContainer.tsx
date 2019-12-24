import * as React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import CreateIntroView from '../view/CreateIntroView';
import { CubeIntroService, InstructorModel } from '../../../personalcube/cubeintro';
import { ContentsProviderService } from '../../../college';
import CreateMediaContainer from './CreateMediaContainer';

interface Props extends RouteComponentProps<{cubeType: string}>{
  cubeIntroService?: CubeIntroService
  contentsProviderService?: ContentsProviderService
  personalCubeId?: string
}

interface States{
  hour: number
  minute: number
}

@inject('cubeIntroService', 'contentsProviderService')
@observer
@reactAutobind
class CreateIntroContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = { hour: 0, minute: 0 };
  }

  componentDidMount() {
    //
    console.log(1);
    const { cubeIntroService, personalCubeId } = this.props;
    if (cubeIntroService && !personalCubeId) {
      cubeIntroService.clearCubeIntro();
    }
  }

  onChangeCubeIntroProps(name: string, value: string | number | {}) {
    //
    const { cubeIntroService } = this.props;
    if (cubeIntroService) cubeIntroService.changeCubeIntroProps(name, value);
  }

  setHourAndMinute(name: string, value: number) {
    //
    Promise.resolve()
      .then(() => {
        if (name === 'hour') this.setState({ hour: value });
        if (name === 'minute') this.setState({ minute: value });
      })
      .then(() => this.setLearningTime());
  }

  setLearningTime() {
    //
    const { hour, minute } = this.state;
    const numberHour = Number(hour);
    const numberMinute = Number(minute);
    const newMinute = numberHour * 60 + numberMinute;
    this.onChangeCubeIntroProps('learningTime', newMinute);
  }

  onHandleInstructorModalOk(selectedInstructor: InstructorModel) {
    //
    const { cubeIntroService } = this.props;
    if (cubeIntroService) {
      /* cubeIntroService.changeCubeIntroProps('description.instructor.employeeId', selectedInstructor.employeeId);
      cubeIntroService.changeCubeIntroProps('description.instructor.email', selectedInstructor.memberSummary.email);
      cubeIntroService.changeCubeIntroProps('description.instructor.name', selectedInstructor.memberSummary.name);
      cubeIntroService.changeCubeIntroProps('description.instructor.company', selectedInstructor.memberSummary.department);
      cubeIntroService.changeCubeIntroProps('description.instructor.category', selectedInstructor.specialtyEnName);
      cubeIntroService.changeCubeIntroProps('description.instructor.internal', selectedInstructor.internal);
*/
      cubeIntroService.changeInstructorListModalOpen(false);
    }
  }

  routeToBasicList() {
    //
    this.props.history.push(`/personalcube/create-detail`);
  }


  render() {

    const {
      cubeIntro, changeManagerListModalOpen, instructorListModalOpen,
    } = this.props.cubeIntroService || {} as CubeIntroService;
    const { hour, minute } = this.state;
    //const cubeType = personalCube && personalCube.contents && personalCube.contents.type;
    const { cubeType } = this.props.match.params;
    return (
      <section className="content bg-white">
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
              <CreateIntroView
                cubeIntro={cubeIntro}
                onChangeCubeIntroProps={this.onChangeCubeIntroProps}
                setHourAndMinute={this.setHourAndMinute}
                hour={hour}
                minute={minute}
                cubeType={cubeType}
                changeManagerListModalOpen={changeManagerListModalOpen}
                instructorListModalOpen={instructorListModalOpen}
                onHandleInstructorModalOk={this.onHandleInstructorModalOk}
              />
              <CreateMediaContainer
                cubeType={cubeType}
              />
              {/*{
                cubeType === 'Community' ?
                  <CreateMediaContainer
                    cubeType={cubeType}
                  />
                  :
                  ''
              }*/}
              {/* {
                cubeType === 'Video'
                  <CreateVideoTypeView
                    handleChangeSearchFilter={this.handleChangeSearchFilter}
                    searchFilter={searchFilter}
                  />
                  : null
              }
              {
                cubeType === 'Audio' ?
                  <CreateAudioTypeView
                    handleChangeSearchFilter={this.handleChangeSearchFilter}
                    onChangeCubeIntroProps={this.onChangeCubeIntroProps}
                    searchFilter={searchFilter}
                  />
                  : null
              }
*/}
              <div className="buttons">
                <Button className="fix line" onClick={this.routeToBasicList}>Cancel</Button>
                <Button className="fix line">Save</Button>
                <Button className="fix line">Previous</Button>
                <Button className="fix bg">Next</Button>
              </div>
            </Form>
          </div>
        </Segment>
      </section>
    );
  }
}

export default withRouter(CreateIntroContainer);
