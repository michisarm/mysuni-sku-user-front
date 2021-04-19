import React from 'react';
import { FileBox, ValidationType } from '@nara.drama/depot';
import { depotHelper } from 'shared';
import { PatronType } from '@nara.platform/accent';
import { Form, Icon } from 'semantic-ui-react';


interface DocumentFormViewProps {
  fileBoxId: string;
  onChangeFile: (fileBoxId: string) => void;

}

export default function DocumentFormView({
  fileBoxId,
  onChangeFile,
}: DocumentFormViewProps) {

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
              id={fileBoxId}
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
              onChange={onChangeFile}
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
    </>
  );
}