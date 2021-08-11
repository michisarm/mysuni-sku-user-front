import React from 'react';
import { observer } from 'mobx-react';
import { AplType } from 'myTraining/model/AplType';
import SelectType from 'myTraining/model/SelectType';
import { Form, Ref, Select, Icon } from 'semantic-ui-react';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { onChangeAplPropsValid, onClear } from '../aplCreate.events';
import { AplModel } from 'myTraining/model';

interface AplCreateTypeViewProps {
  apl: AplModel;
  typeRef: any;
  typeNameRef: any;
  changeAplProps: (
    name: string,
    value: string | {} | string[] | undefined
  ) => void;
}

function AplCreateTypeView({
  apl,
  typeRef,
  typeNameRef,
  changeAplProps,
}: AplCreateTypeViewProps) {
  const typeNameCount = (apl && apl.typeName && apl.typeName.length) || 0;

  return (
    <Form.Field>
      <label className="necessary">
        <PolyglotText id="개학등록-uisf-교육형태" defaultString="교육형태" />
      </label>
      <div className="edu-wrap">
        <Ref innerRef={typeRef}>
          <Select
            className="w302"
            placeholder={getPolyglotText('Select', '개학등록-uisf-slbx')}
            options={SelectType.aplLearningType}
            value={(apl && apl.type) || 'Select'}
            onChange={(e: any, data: any) => {
              changeAplProps('type', data.value);
              if (data.value !== AplType.Etc) {
                const selectedIndex = data.options.findIndex(
                  (option: any) => option.value === data.value
                );
                changeAplProps('typeName', data.options[selectedIndex].text);
              } else {
                changeAplProps('typeName', '');
              }
            }}
          />
        </Ref>
        {apl && apl.type === AplType.Etc ? (
          <div className="w878">
            <div
              className={
                typeNameCount === 0
                  ? 'ui h48 input ml18'
                  : typeNameCount >= 100
                  ? 'ui h48 input ml18 write error'
                  : 'ui h48 input ml18 write input'
              }
            >
              <input
                type="text"
                id="typeName"
                placeholder={getPolyglotText(
                  '기타 교육형태를 입력해주세요.',
                  '개학등록-uisf-직접입력'
                )}
                value={(apl && apl.typeName) || ''}
                onChange={(e: any) => {
                  onChangeAplPropsValid('typeName', e.target.value);
                }}
                ref={typeNameRef}
              />
              <Icon
                aria-hidden="true"
                className="clear link"
                onClick={() => onClear('typeName')}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Form.Field>
  );
}

export default observer(AplCreateTypeView);
