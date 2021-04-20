import React from 'react';
import { Form, Icon, Radio, CheckboxProps } from 'semantic-ui-react';
import { MediaType } from '../../../media/model';
import { InternalMediaConnectionModel } from '../../../media/model/InternalMediaConnectionModel';

interface Props {
  mediaType: MediaType;
  linkMediaUrl?: string;
  internalMedias?: InternalMediaConnectionModel[];
  onChecked: (_: React.FormEvent, data: CheckboxProps) => void;
  onChangeLinkMedia: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CreateAudioTypeView({
  mediaType,
  linkMediaUrl,
  internalMedias,
  onChangeLinkMedia,
  onChecked,
}: Props) {
  return (
    <>
      <div className="section-tit">
        <span className="text1">부가정보</span>
      </div>
      <Form.Field>
        <label className="necessary">교육자료</label>
        <Radio
          className="base"
          label="오디오 파일 업로드"
          value={MediaType.InternalMedia}
          checked={mediaType === 'InternalMedia'}
          onChange={onChecked}
        />
        <Radio
          className="base"
          label="오디오 링크"
          value={MediaType.LinkMedia}
          checked={mediaType === 'LinkMedia'}
          onChange={onChecked}
        />
        <div className="ui form">
          {mediaType === MediaType.InternalMedia && (
            <>
              {(internalMedias && internalMedias.length && (
                <div className="ui input h48 file">
                  {internalMedias.map(
                    (
                      internalMedia: InternalMediaConnectionModel,
                      index: number
                    ) => (
                      <input
                        type="text"
                        key={index}
                        value={internalMedia.name}
                        readOnly
                      />
                    )
                  )}
                  <Icon className="clear link" />
                  <input type="file" id="hidden-new-file" />
                </div>
              )) || (
                <div className="round-wrap file-drop-wrap">
                  <div className="file-drop" id="drop">
                    <p>
                      <Icon className="upload" />
                      여기로 파일을 올려주세요.
                    </p>
                    <div className="thumbnails" id="thumbnails">
                      <progress
                        id="progressBar"
                        value="0"
                        max="100"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className="bottom">
                      <input
                        type="button"
                        className="btn btn-default"
                        id="btnSubmit"
                        value="업로드"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {mediaType === MediaType.LinkMedia && (
            <div className="ui input h48">
              <input
                type="text"
                name=""
                placeholder="http://"
                value={linkMediaUrl}
                onChange={onChangeLinkMedia}
              />
            </div>
          )}
          <div className="info-text">
            <Icon className="info16" />
            <span className="blind">infomation</span>
            교육자료로 제공될 파일을 등록하실 수 있습니다. / 최대 1Gbyte 용량의
            파일을 등록하실 수 있습니다.
          </div>
        </div>
      </Form.Field>
    </>
  );
}

export default CreateAudioTypeView;
