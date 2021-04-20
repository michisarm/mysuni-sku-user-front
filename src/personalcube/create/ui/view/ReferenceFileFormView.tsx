import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { FileBox, ValidationType } from '@nara.drama/depot';
import { PatronType } from '@nara.platform/accent';
import { depotHelper } from 'shared';


interface ReferenceFileFormViewProps {
  fileBoxId: string;
  onChangeFile: (fileBoxId: string) => void;
}

export default function ReferenceFileFormView({
  fileBoxId,
  onChangeFile,
}: ReferenceFileFormViewProps) {

  return (
    <Form.Field>
      <label>참고자료</label>
      <div className="lg-attach">
        <div className="attach-inner">
          <FileBox
            vaultKey={{ keyString: 'sample', patronType: PatronType.Audience }}
            patronKey={{ keyString: 'sample', patronType: PatronType.Audience }}
            validations={[{ type: ValidationType.Duplication, validator: depotHelper.duplicationValidator }]}
            onChange={onChangeFile}
            id={fileBoxId}
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
  );
}