import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { FileBox, PatronType } from '@nara.drama/depot';
import * as React from 'react';
import { Form, Icon, Radio } from 'semantic-ui-react';
import { SearchFilter } from 'shared';
import { PersonalCubeModel } from 'personalcube/personalcube';
import { OfficeWebModel } from 'personalcube/officeweb';

interface Props {
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void
  officeWeb: OfficeWebModel
  onChangeOfficeWebProps: (name: string, value: string | Date, nameSub?: string) => void
  getFileBoxIdForReference: (fileBoxId: string) => void
  personalCube: PersonalCubeModel
}

@observer
@reactAutobind
class CreateWebPageTypeView extends React.Component<Props> {
  render() {

    const { onChangePersonalCubeProps, officeWeb, onChangeOfficeWebProps, getFileBoxIdForReference, personalCube } = this.props;

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
          <div className="lg-attach">
            <div className="attach-inner">
              <FileBox
                vaultKey={{ keyString: 'sample', patronType: PatronType.Audience }}
                patronKey={{ keyString: 'sample', patronType: PatronType.Audience }}
                onChange={getFileBoxIdForReference}
                id={personalCube && personalCube.contents && personalCube.contents.fileBoxId}
              />
              <div className="bottom">
                <span className="text1"><Icon className="info16" />
                  <span className="blind">information</span>
                  DOC, PPT, PDF, XLS 파일을 등록하실 수 있습니다. / 최대 10Mbyte 용량의 파일을 등록하실 수 있습니다. / 참고자료는 다수의 파일을 등록할 수 있습니다.
                </span>
              </div>
            </div>
          </div>
        </Form.Field>

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

export default CreateWebPageTypeView;

