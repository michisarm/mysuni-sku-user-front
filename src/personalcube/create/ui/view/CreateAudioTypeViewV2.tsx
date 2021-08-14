import React from 'react';
import { Form, Icon, Radio, CheckboxProps } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
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
        <span className="text1">
          <PolyglotText defaultString="부가정보" id="Create-NMAudio-부가정보" />
        </span>
      </div>
      <Form.Field>
        <label className="necessary">
          <PolyglotText defaultString="교육자료" id="Create-NMAudio-교육자료" />
        </label>
        <Radio
          className="base"
          label={getPolyglotText('오디오 파일 업로드', 'Create-NMAudio-파일업로드')}
          value={MediaType.InternalMedia}
          checked={mediaType === 'InternalMedia'}
          onChange={onChecked}
        />
        <Radio
          className="base"
          label={getPolyglotText('오디오 링크', 'Create-NMAudio-업로드영역')}
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
                      <PolyglotText defaultString="여기로 파일을 올려주세요." id="Create-NMAudio-업로드영역" />
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
                        value={getPolyglotText('업로드', 'Create-NMAudio-업로드')}
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
                placeholder={getPolyglotText('http://', 'Create-NMAudio-http')}
                value={linkMediaUrl}
                onChange={onChangeLinkMedia}
              />
            </div>
          )}
          <div className="info-text">
            <Icon className="info16" />
            <span className="blind">infomation</span>
            <PolyglotText
              defaultString="교육자료로 제공될 파일을 등록하실 수 있습니다. / 최대 1Gbyte 용량의 파일을 등록하실 수 있습니다."
              id="Create-NMAudio-Max1Gbyte"
            />
          </div>
        </div>
      </Form.Field>
    </>
  );
}

export default CreateAudioTypeView;
