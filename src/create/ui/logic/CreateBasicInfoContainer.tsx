import React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Form, Icon, Select, Step } from 'semantic-ui-react';
import { PersonalCubeModel } from 'personalcube/personalcube';
import { CollegeService } from 'college';
import SelectType from '../../../shared/model/SelectType';
import FirstCategoryModal from '../view/FirstCategoryModal';
import SecondCategoryModal from '../view/SecondCategoryModal';


interface Props {
  personalCubeId: string
  onChangePersonalCubeProps: (name: string, value: string | {}) => void
  //changePersonalCubeProps: (name: string, value: string | {}) => void
  collegeService?: CollegeService
  personalCube: PersonalCubeModel
}

interface States {
  firstCategoryModalOpen: boolean
  secondCategoryModalOpen: boolean
}

@inject('collegeService')
@observer
@reactAutobind
class CreateBasicInfoContainer extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = {
      firstCategoryModalOpen: false,
      secondCategoryModalOpen: false,
    };
  }

  componentDidMount() {
    //
    this.clearColleges();
    this.findAllColleges();
  }

  findAllColleges() {
    //
    const { collegeService } = this.props;
    if (collegeService) collegeService.findAllColleges();
  }

  clearColleges() {
    //
    const { collegeService } = this.props;
    if (collegeService) {
      collegeService.clearMainCollege();
      collegeService.clearSubCollege();
    }
  }

  onChangeFirstCategoryModalOpen(firstCategoryModalOpen: boolean) {
    this.setState({ firstCategoryModalOpen });
  }

  onChangeSecondCategoryModalOpen(secondCategoryModalOpen: boolean) {
    this.setState({ secondCategoryModalOpen });
  }

  render() {
    const {
      personalCubeId, onChangePersonalCubeProps, personalCube,
    } = this.props;
    const { firstCategoryModalOpen, secondCategoryModalOpen } = this.state;
    const { colleges, mainCollege: selectedMainCollege, subCollege: selectedSubCollege } = this.props.collegeService || {} as CollegeService;

    return (
      <>
        <div className="section-tit">
          <span className="text1">기본정보</span>
          <div className="right-step">
            <Step.Group className="number-step">
              <Step active>
                <Step.Content>
                  <span className="number"><span className="blind">1</span></span>
                  <Step.Title>기본정보 및 노출정보</Step.Title>
                </Step.Content>
              </Step>
              <Step>
                <Step.Content>
                  <span className="number"><span className="blind">2</span></span>
                  <Step.Title>교육정보 및 부가정보</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </div>
        </div>
        <Form.Field>
          <label className="necessary">강좌명</label>
          <div className="ui right-top-count input">{/* .error class 추가시 error ui 활성 */}
            <span className="count"><span className="now">0</span>/<span className="max">100</span></span>
            <input type="text"
              placeholder="제목을 입력해주세요."
              value={personalCube && personalCube.name || ''}
              onChange={(e: any) => onChangePersonalCubeProps('name', e.target.value)}
            />
            <Icon className="clear link" />
            <span className="validation">You can enter up to 100 characters.</span>
          </div>
        </Form.Field>
        <Form.Field>
          <label className="necessary">카테고리 선택</label>
          <div>
            <div className="table-css type5">
              <div className="row">
                {/*<div className="cell v-middle">
                  <span className="text1">대표 카테고리</span>*/}
                <FirstCategoryModal
                  onChangePersonalCubeProps={onChangePersonalCubeProps}
                  personalCube={personalCube}
                  colleges={colleges}
                  open={firstCategoryModalOpen}
                  handleChangeOpen={this.onChangeFirstCategoryModalOpen}
                  selectedMainCollege={selectedMainCollege}
                />
                {/*</div>
                <div className="cell v-middle">
                  <span className="text1">대표  카테고리를 선택해주세요.</span>
                </div>*/}
              </div>
            </div>
            <div className="table-css type5">
              <div className="row">
                {/* <div className="cell v-middle">
                  <span className="text1">서브 카테고리</span>*/}
                <SecondCategoryModal
                  personalCube={personalCube}
                  open={secondCategoryModalOpen}
                  handleChangeOpen={this.onChangeSecondCategoryModalOpen}
                  onChangePersonalCubeProps={onChangePersonalCubeProps}
                  colleges={colleges}
                  selectedSubCollege={selectedSubCollege}
                />
                {/*</div>
                <div className="cell v-middle">
                  <span className="text1">서브 카테고리를 선택해주세요.</span>
                </div>*/}
              </div>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          {
            personalCubeId ?
              <>
                <label className="necessary">교육형태</label>
                <div className="select-box">
                  <input
                    value={personalCube && personalCube.contents && personalCube.contents.type || ''}
                    readOnly
                  />
                </div>
              </>
              :
              <>
                <label className="necessary">교육형태</label>
                <div className="select-box">
                  <Select
                    placeholder="Select"
                    className="dropdown selection"
                    value={personalCube && personalCube.contents && personalCube.contents.type || ''}
                    options={SelectType.cubeType}
                    onChange={(e: any, data: any) => {
                      onChangePersonalCubeProps('contents.type', data.value);
                    }}
                  />
                </div>
              </>
          }

        </Form.Field>
      </>
    );
  }
}
export default CreateBasicInfoContainer;
