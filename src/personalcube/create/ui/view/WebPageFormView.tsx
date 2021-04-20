import React from 'react';
import { observer } from 'mobx-react';
import { Form, Icon } from 'semantic-ui-react';


interface  WebPageFormViewProps{
  webPageUrl?: string;
  onChangeUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function WebPageFormView({
  webPageUrl,
  onChangeUrl,
}: WebPageFormViewProps) {

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
            value={webPageUrl}
            onChange={onChangeUrl}
          />
        </div>
        <div className="info-text">
          <Icon className="info16" /><span className="blind">infomation</span>
          Webpage 학습이 제공되는 URL을 입력해주세요.
        </div>
      </Form.Field>
    </>
  );
}

const WebPageFormViewDefault = observer(WebPageFormView);

export default WebPageFormViewDefault;