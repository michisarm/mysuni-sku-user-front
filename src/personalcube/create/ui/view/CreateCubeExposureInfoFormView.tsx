import React from 'react';
import { observer } from 'mobx-react';
import { Form } from 'semantic-ui-react';
import CreateInput from '../shared/CreateInput';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';


function CreateCubeExposureInfoFormView() {
  const { cubeSdo } = CreateCubeService.instance;

  const onChangeTags = (e: any, data: any) => {
    e.preventDefault();
    CreateCubeService.instance.changeCubeSdoProps('tags', data.value);
  };

  return (
    <>
      <div className="section-tit">
        <span className="text1">노출 정보</span>
      </div>
      <Form.Field>
        <CreateInput
          label="Tag 정보"
          placeholder="Tag와 Tag는 쉼표(“,”)로 구분합니다."
          asList
          value={cubeSdo.tags}
          onChange={onChangeTags}
        />
      </Form.Field>
    </>
  );
}


const CreateCubeExposureInfoFormViewDefault = observer(CreateCubeExposureInfoFormView);

export default CreateCubeExposureInfoFormViewDefault;