import React from 'react';
import { observer } from 'mobx-react';
import { FileBox, ValidationType } from '@nara.drama/depot';
import { depotHelper } from 'shared';
import {  PatronType } from '@nara.platform/accent';
import { Form, Icon } from 'semantic-ui-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';


function CreateDocumentTypeView() {
  const { cubeSdo } = CreateCubeService.instance;

  const onChangeEducationFileBoxId = (id: string) => {
    CreateCubeService.instance.changeCubeSdoProps('materialSdo.officeWebSdo.fileBoxId', id);
  };

  const onChangeFileboxId = (id: string) => {
    CreateCubeService.instance.changeCubeSdoProps('fileBoxId', id);
  }

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
              id={cubeSdo.materialSdo?.officeWebSdo.fileBoxId}
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
              onChange={onChangeEducationFileBoxId}
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
              onChange={onChangeFileboxId}
              id={cubeSdo.fileBoxId}
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

const CreateDocumentTypeViewDefault = observer(CreateDocumentTypeView);

export default CreateDocumentTypeViewDefault;