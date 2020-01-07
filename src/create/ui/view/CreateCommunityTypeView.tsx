import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import * as React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { SearchFilter } from 'shared';
import { PersonalCubeModel } from '../../../personalcube/personalcube';

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
            value={SearchFilter.SearchOn}
            checked={personalCube && personalCube.searchFilter === SearchFilter.SearchOn}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
          <Radio
            className="base"
            label="비공개"
            name="radioGroup"
            value={SearchFilter.SearchOff}
            checked={personalCube && personalCube.searchFilter === SearchFilter.SearchOff}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('searchFilter', data.value)}
          />
        </Form.Field>
      </>
    );
  }
}

export default CreateCommunityTypeView;

