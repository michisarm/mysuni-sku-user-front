
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Form, Radio } from 'semantic-ui-react';
import { SearchFilterType } from 'shared/model';
import { PersonalCubeModel } from '../../../personalcube/model';

interface Props {
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void
  onChangeMediaProps: (name: string, value: string | Date, nameSub?: string) => void
  personalCube: PersonalCubeModel
}

@observer
@reactAutobind
class CreateCommunityTypeView extends React.Component<Props> {
  //
  render() {

    const { onChangePersonalCubeProps, personalCube } = this.props;

    return (
      <>
        <hr className="dividing" />

        <div className="section-tit">
          <span className="text1">부가정보</span>
        </div>
        <Form.Field>
          <label className="necessary">학습카드 공개여부</label>
          <Radio
            className="base"
            label="공개"
            name="radioGroup"
            value={SearchFilterType.SearchOn}
            checked={personalCube && personalCube.searchFilter === SearchFilterType.SearchOn}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
          <Radio
            className="base"
            label="비공개"
            name="radioGroup"
            value={SearchFilterType.SearchOff}
            checked={personalCube && personalCube.searchFilter === SearchFilterType.SearchOff}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
        </Form.Field>
      </>
    );
  }
}

export default CreateCommunityTypeView;

