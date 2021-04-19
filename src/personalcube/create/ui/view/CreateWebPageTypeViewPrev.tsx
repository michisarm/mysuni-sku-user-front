
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import { Form, Icon } from 'semantic-ui-react';
import { depotHelper } from 'shared';
import OfficeWeb from '../../../../lecture/detail/model/OfficeWeb';
import { PersonalCubeModel } from '../../../personalcube/model';

interface Props {
  officeWeb: OfficeWeb;
  getFileBoxIdForReference: (fileBoxId: string) => void
  personalCube: PersonalCubeModel;
}

@observer
@reactAutobind
class CreateWebPageTypeView extends React.Component<Props> {
  render() {

    const {officeWeb, getFileBoxIdForReference, personalCube } = this.props;

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
                validations={[{ type: ValidationType.Duplication, validator: depotHelper.duplicationValidator }]}
                onChange={getFileBoxIdForReference}
                
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
      </>
    );
  }
}

export default CreateWebPageTypeView;

