import React from 'react';
import { observer } from 'mobx-react';
import { Form } from 'semantic-ui-react';
import CreateInput from '../shared/CreateInput';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

function CreateCubeExposureInfoFormView() {
  const { cubeSdo } = CreateCubeService.instance;

  const onChangeTags = (e: any, data: any) => {
    e.preventDefault();
    const polyglotString = { en: null, ko: data.value, zh: null };
    CreateCubeService.instance.changeCubeSdoProps('tags', polyglotString);
  };

  return (
    <>
      <div className="section-tit">
        <span className="text1">
          <PolyglotText defaultString="노출 정보" id="Create-NM-노출 정보" />
        </span>
      </div>
      <Form.Field>
        <CreateInput
          label={getPolyglotText('Tag 정보', 'Create-NM-Tag정보')}
          placeholder={getPolyglotText(
            'Tag와 Tag는 쉼표(“,”)로 구분합니다.',
            'Create-NM-Tag정보Sub'
          )}
          //asList
          value={parsePolyglotString(cubeSdo.tags)}
          onChange={onChangeTags}
        />
      </Form.Field>
    </>
  );
}

const CreateCubeExposureInfoFormViewDefault = observer(
  CreateCubeExposureInfoFormView
);

export default CreateCubeExposureInfoFormViewDefault;
