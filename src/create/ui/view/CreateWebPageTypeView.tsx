import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { FileBox, PatronType } from '@nara.drama/depot';
import * as React from 'react';
import { Form, Icon, Radio } from 'semantic-ui-react';
import { SearchFilter } from 'shared';
import { PersonalCubeModel } from 'personalcube/personalcube';
import { OfficeWebModel } from 'personalcube/officeweb';

interface Props {
  handleChangeSearchFilter:(e: any, data: any) => void
  searchFilter: string
  officeWeb: OfficeWebModel
  onChangeOfficeWebProps: (name: string, value: string | Date, nameSub?: string) => void
  getFileBoxIdForReference: (fileBoxId: string) => void
  personalCube: PersonalCubeModel
}

@observer
@reactAutobind
class CreateWebPageTypeView extends React.Component<Props> {
  render() {

    const { handleChangeSearchFilter, searchFilter, officeWeb, onChangeOfficeWebProps, getFileBoxIdForReference, personalCube } = this.props;

    return (
      <>
        <hr className="dividing" />

        <div className="section-tit">
          <span className="text1">부가정보</span>
        </div>
        <Form.Field>
          <label className="necessary">교육자료</label>
          <div className="ui input h48">
            <input
              type="text"
              name=""
              placeholder="http://"
              value={officeWeb && officeWeb.webPageUrl || ''}
              onChange={(e: any) => onChangeOfficeWebProps('webPageUrl', e.target.value)}
            />
          </div>
          <div className="info-text">
            <Icon className="info16" /><span className="blind">infomation</span>
            Webpage 학습이 제공되는 URL을 입력해주세요.
          </div>
        </Form.Field>

        <Form.Field>
          <label>참고자료</label>
          <FileBox
            patronType={PatronType.Audience}
            patronKeyString="sampleAudience"
            onChange={getFileBoxIdForReference}
            pavilionId="samplePavilion"
            id={personalCube && personalCube.contents && personalCube.contents.fileBoxId}
          />
        </Form.Field>

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

export default CreateWebPageTypeView;

