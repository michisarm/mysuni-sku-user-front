import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { Form } from 'semantic-ui-react';
import CreateInput from '../shared/CreateInput';

interface CubeBasicFormContainerProps {
  createCubeService?: CreateCubeService;

}

function CubeBasicFormContainer({
  createCubeService,
}: CubeBasicFormContainerProps) {
  

  const onChangeName = () => {

  };


  const onChangeCubeType = () => {

  };

  const onConfirmMainChannel = () => {

  };

  const onConfirmSubChannel = () => {

  };

  return (
    <>
      <Form.Field>
        <CreateInput
          required
          label="강좌명"
          placeholder="제목을 입력해주세요."
          value={personalCube.name}
          sizeLimited
          maxSize={100}
          invalidMessage="You can enter up to 100 characters."
          onChange={this.onChangeName}
        />
      </Form.Field>

      <Form.Field>
        <label className="necessary">채널선택</label>

        <div>
          <ChannelFieldRow>
            <div className="cell v-middle">
              <span className="text1">메인채널</span>

              <MainChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    채널선택
                  </Button>
                }
                defaultSelectedChannel={personalCube.category.channel}
                onConfirmChannel={this.onConfirmMainChannel}
              />
            </div>
            <div className="cell v-middle">
              {!personalCube.category.channel.id ? (
                <span className="text1">메인채널을 선택해주세요.</span>
              ) : (
                <span className="text2">
                  {personalCube.category.college.name} &gt;{' '}
                  {personalCube.category.channel.name}
                </span>
              )}
            </div>
          </ChannelFieldRow>
          <ChannelFieldRow>
            <div className="cell v-middle">
              <span className="text1">서브채널</span>

              <SubChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    채널선택
                  </Button>
                }
                collegeType={collegeType}
                targetCollegeId={selectedCollegeId}
                defaultSelectedCategoryChannels={personalCube.subCategories}
                onConfirmCategoryChannels={this.onConfirmSubChannel}
              />
            </div>
            <div className="cell v-middle">
              {subCategoriesGroupByCollege.length < 1 ? (
                <span key="select-sub-category" className="text1">
                  서브채널을 선택해주세요.
                </span>
              ) : (
                subCategoriesGroupByCollege.map((categoryChannels, index) => (
                  <span className="text2" key={`channels-${index}`}>
                    {categoryChannels[0].college.name}
                    {` > `}
                    {categoryChannels
                      .map(categoryChannel => categoryChannel.channel.name)
                      .join(', ')}
                  </span>
                ))
              )}
            </div>
          </ChannelFieldRow>
        </div>
      </Form.Field>

      <Form.Field>
        <label className="necessary">교육형태</label>
        <div className="select-box">
          {contentNew ? (
            <Select
              className="dropdown selection"
              value={personalCube.contents.type || 'None'}
              options={SelectOptions.cubeType}
              onChange={this.onChangeContentsType}
            />
          ) : (
            <input readOnly value={personalCube.contents.type || ''} />
          )}
        </div>
      </Form.Field>
    </>
  );
}

export default inject(mobxHelper.injectFrom(

  ))(observer(CubeBasicFormContainer));