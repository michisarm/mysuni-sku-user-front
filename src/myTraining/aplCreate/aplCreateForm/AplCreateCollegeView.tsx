import React from 'react';
import { observer } from 'mobx-react';
import { Form, Ref, Select } from 'semantic-ui-react';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { selectCollege } from '../aplCreate.events';
import { AplModel } from 'myTraining/model';

interface AplCollegeSelectViewProps {
  apl: AplModel;
  collegeOptions: any;
  channelOptions: any;
  collegeRef: any;
  channelRef: any;
  changeAplProps: (
    name: string,
    value: string | {} | string[] | undefined
  ) => void;
}

function AplCreateCollgeView({
  apl,
  collegeOptions,
  channelOptions,
  collegeRef,
  channelRef,
  changeAplProps,
}: AplCollegeSelectViewProps) {
  return (
    <Form.Field>
      <label className="necessary">
        <PolyglotText
          id="개학등록-uisf-코스채널"
          defaultString="Category / Channel"
        />
      </label>
      <Ref innerRef={collegeRef}>
        <Select
          className="w302 mr15px"
          placeholder={getPolyglotText('Select', '개학등록-uisf-slbx2')}
          options={collegeOptions}
          value={(apl && apl.collegeId) || 'Select'}
          onChange={(e: any, data: any) => {
            const selectedIndex = data.options.findIndex(
              (option: any) => option.value === data.value
            );
            selectCollege('collegeId', data.value);
            changeAplProps('collegeName', data.options[selectedIndex].text);
          }}
        />
      </Ref>
      {apl && apl.collegeId ? (
        <Ref innerRef={channelRef}>
          <Select
            className="w302 ml18"
            placeholder="Select"
            options={channelOptions}
            value={(apl && apl.channelId) || 'Select'}
            onChange={(e: any, data: any) => {
              const selectedIndex = data.options.findIndex(
                (option: any) => option.value === data.value
              );
              changeAplProps('channelId', data.value);
              changeAplProps('channelName', data.options[selectedIndex].text);
            }}
          />
        </Ref>
      ) : null}
    </Form.Field>
  );
}

export default observer(AplCreateCollgeView);
