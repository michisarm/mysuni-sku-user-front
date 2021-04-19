import React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import { SearchFilterType } from 'shared/model';
import { depotHelper } from 'shared';
import { Form, Icon, Radio } from 'semantic-ui-react';
import { PersonalCubeModel } from 'personalcube/personalcube/model';
import { OfficeWebModel } from 'personalcube/officeweb/model';

interface Props {
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void;
  officeWeb: OfficeWebModel;
  onChangeOfficeWebProps: (
    name: string,
    value: string | Date,
    nameSub?: string
  ) => void;
  getFileBoxIdForReference: (fileBoxId: string) => void;
  personalCube: PersonalCubeModel;
  getFileBoxIdForEducation: (fileBoxId: string) => void;
}

@observer
@reactAutobind
class CreateDocumentTypeView extends React.Component<Props> {
  //
  render() {
    const {
      onChangePersonalCubeProps,
      officeWeb,
      getFileBoxIdForEducation,
      getFileBoxIdForReference,
      personalCube,
    } = this.props;

    return (
      <>
        <hr className="dividing" />

        <div className="section-tit">
          <span className="text1">부가정보</span>
        </div>
        <Form.Field>
          <label className="necessary">교육자료</label>
          <div className="line-attach">
            <div className="attach-inner">
              <FileBox
                id={(officeWeb && officeWeb.fileBoxId) || ''}
                vaultKey={{
                  keyString: 'sku-depot',
                  patronType: PatronType.Pavilion,
                }}
                patronKey={{
                  keyString: 'sku-denizen',
                  patronType: PatronType.Denizen,
                }}
                validations={[
                  {
                    type: ValidationType.Duplication,
                    validator: depotHelper.duplicationValidator,
                  },
                ]}
                onChange={getFileBoxIdForEducation}
              />
              <div className="info-text">
                <Icon className="info16" />
                <span className="blind">infomation</span>
                DOC, PPT, PDF, XLS 파일을 등록하실 수 있습니다. / 최대 10Mbyte
                용량의 파일을 등록하실 수 있습니다.
              </div>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <label>참고자료</label>
          <div className="lg-attach">
            <div className="attach-inner">
              <FileBox
                vaultKey={{
                  keyString: 'sku-depot',
                  patronType: PatronType.Pavilion,
                }}
                patronKey={{
                  keyString: 'sku-denizen',
                  patronType: PatronType.Denizen,
                }}
                validations={[
                  {
                    type: ValidationType.Duplication,
                    validator: depotHelper.duplicationValidator,
                  },
                ]}
                onChange={getFileBoxIdForReference}
                id={
                  personalCube &&
                  personalCube.contents &&
                  personalCube.contents.fileBoxId
                }
              />
              <div className="bottom">
                <span className="text1">
                  <Icon className="info16" />
                  <span className="blind">information</span>
                  DOC, PPT, PDF, XLS 파일을 등록하실 수 있습니다. / 최대 10Mbyte
                  용량의 파일을 등록하실 수 있습니다. / 참고자료는 다수의 파일을
                  등록할 수 있습니다.
                </span>
              </div>
            </div>
          </div>
        </Form.Field>
      </>
    );
  }
}

export default CreateDocumentTypeView;
