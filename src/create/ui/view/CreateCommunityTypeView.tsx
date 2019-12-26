import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import * as React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { SearchFilter } from 'shared-model';

interface Props {
  handleChangeSearchFilter:(e: any, data: any) => void
  searchFilter: string
  onChangeMediaProps: (name: string, value: string | Date, nameSub?: string) => void
}

@observer
@reactAutobind
class CreateCommunityTypeView extends React.Component<Props> {
  //
  render() {

    const { handleChangeSearchFilter, searchFilter } = this.props;

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
            onChange={handleChangeSearchFilter}
            checked = {searchFilter === SearchFilter.SearchOn}
          />
          <Radio
            className="base"
            label="비공개"
            name="radioGroup"
            value={SearchFilter.SearchOff}
            onChange={handleChangeSearchFilter}
            checked = {searchFilter === SearchFilter.SearchOff}
          />
        </Form.Field>
      </>
    );
  }
}

export default CreateCommunityTypeView;

