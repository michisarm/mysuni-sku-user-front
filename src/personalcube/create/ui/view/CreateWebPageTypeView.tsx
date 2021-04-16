import React from 'react';
import { observer } from 'mobx-react';
import { PatronType } from '@nara.platform/accent';
import { FileBox, ValidationType } from '@nara.drama/depot';
import { depotHelper } from 'shared';
import { Form, Icon } from 'semantic-ui-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';


function CreateWebPageTypeView() {
  const { createCubeDetail, cubeSdo } = CreateCubeService.instance;

  const onChangeWebPageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    CreateCubeService.instance.changeCubeSdoProps('materialSdo.officeWebSdo.webPageUrl', e.target.value);
  };

  const onChangeFileBoxId = (id: string) => {
    CreateCubeService.instance.changeCubeSdoProps('fileBoxId', id);
  };

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
            value={cubeSdo.materialSdo?.officeWebSdo.webPageUrl}
            onChange={onChangeWebPageUrl}
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
              onChange={onChangeFileBoxId}
              id={cubeSdo.fileBoxId}
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

const CreateWebPageTypeViewDefault = observer(CreateWebPageTypeView);

export default CreateWebPageTypeViewDefault;