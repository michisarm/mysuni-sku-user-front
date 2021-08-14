import React from 'react';
import { observer } from 'mobx-react';
import { Form, Icon } from 'semantic-ui-react';
import { FileBox2, ValidationType } from '@nara.drama/depot';
import { PatronType } from '@nara.platform/accent';
import { depotHelper } from 'shared';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface AplCreateFileViewProps {
  onChangeFile: (fileBoxId: string) => void;
}

function AplCreateFileView({ onChangeFile }: AplCreateFileViewProps) {
  return (
    <Form.Field>
      <label>
        <PolyglotText id="개학등록-uisf-첨부파일" defaultString="첨부파일" />
      </label>
      <div className="lg-attach">
        <div className="attach-inner">
          <FileBox2
            vaultKey={{
              keyString: 'sku-depot',
              patronType: PatronType.Audience,
            }}
            patronKey={{
              keyString: 'sku-denizen',
              patronType: PatronType.Audience,
            }}
            validations={[
              {
                type: ValidationType.Duplication,
                validator: depotHelper.duplicationValidator,
              },
            ]}
            onChange={onChangeFile}
          />
          <div className="bottom">
            <span className="text1">
              <Icon className="info16" />
              <span className="blind">information</span>
              <PolyglotText
                id="개학등록-uisf-부가5"
                defaultString="DOC,PPT,PDF,EXL 파일을 등록하실 수 있습니다. / 1개 이상의 첨부파일을 등록하실 수 있습니다."
              />
            </span>
          </div>
        </div>
      </div>
    </Form.Field>
  );
}

export default observer(AplCreateFileView);
