
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Form, Select } from 'semantic-ui-react';
import { PersonalCubeModel } from 'personalcube/personalcube';
import { CollegeService } from 'college';
import SelectType from '../../../../shared/model/SelectType';
import CreateInput from '../shared/CreateInput';
import FirstCategoryModal from '../view/FirstCategoryModal';
import SecondCategoryModal from '../view/SecondCategoryModal';
import { FormTitle } from '../view/DetailElementsView';


interface Props {
  collegeService?: CollegeService
  personalCubeId: string
  personalCube: PersonalCubeModel
  onChangePersonalCubeProps: (name: string, value: string | {}) => void
}

interface States {
  firstCategoryModalOpen: boolean
  secondCategoryModalOpen: boolean
}

@inject(mobxHelper.injectFrom('college.collegeService'))
@observer
@reactAutobind
class DetailBasicInfoContainer extends Component<Props, States> {
  //
  state = {
    firstCategoryModalOpen: false,
    secondCategoryModalOpen: false,
  };

  componentDidMount() {
    //
    this.clearColleges();
    this.findAllColleges();
  }

  findAllColleges() {
    //
    const collegeService = this.props.collegeService!;
    collegeService!.findAllColleges();
  }

  clearColleges() {
    //
    const collegeService = this.props.collegeService!;

    collegeService!.clearMainCollege();
    collegeService!.clearSubCollege();
  }

  onChangeFirstCategoryModalOpen(firstCategoryModalOpen: boolean) {
    this.setState({ firstCategoryModalOpen });
  }

  onChangeSecondCategoryModalOpen(secondCategoryModalOpen: boolean) {
    this.setState({ secondCategoryModalOpen });
  }

  render() {
    //
    const {
      personalCubeId, onChangePersonalCubeProps, personalCube,
    } = this.props;
    const { firstCategoryModalOpen, secondCategoryModalOpen } = this.state;
    const { colleges, mainCollege: selectedMainCollege, subCollege: selectedSubCollege } = this.props.collegeService!;

    return (
      <>
        <FormTitle
          activeStep={1}
        />

        <Form.Field>
          <CreateInput
            required
            label="강좌명"
            placeholder="제목을 입력해주세요."
            value={personalCube.name}
            sizeLimited
            maxSize={100}
            invalidMessage="You can enter up to 100 characters."
            onChange={(e: any, data: any) => onChangePersonalCubeProps('name', data.value )}
          />
        </Form.Field>
        <Form.Field>
          <label className="necessary">채널선택</label>
          <div>
            <div className="table-css type5">
              <div className="row">
                <FirstCategoryModal
                  onChangePersonalCubeProps={onChangePersonalCubeProps}
                  personalCube={personalCube}
                  colleges={colleges}
                  open={firstCategoryModalOpen}
                  handleChangeOpen={this.onChangeFirstCategoryModalOpen}
                  selectedMainCollege={selectedMainCollege}
                />
              </div>
            </div>
            <div className="table-css type5">
              <div className="row">
                <SecondCategoryModal
                  personalCube={personalCube}
                  open={secondCategoryModalOpen}
                  handleChangeOpen={this.onChangeSecondCategoryModalOpen}
                  onChangePersonalCubeProps={onChangePersonalCubeProps}
                  colleges={colleges}
                  selectedSubCollege={selectedSubCollege}
                />
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
                    value={personalCube && personalCube.contents && personalCube.contents.type || 'Select'}
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
export default DetailBasicInfoContainer;
