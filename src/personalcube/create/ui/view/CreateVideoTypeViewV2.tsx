import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { Form, Icon, Radio, CheckboxProps } from 'semantic-ui-react';
import { MediaType } from '../../../media/model';
import { InternalMediaConnectionModel } from '../../../media/model/InternalMediaConnectionModel';
import PanoptoListModal from './PanoptoListModalV2';
import { contentUploader } from '../shared/uploadContent';

function CreateVideoTypeView() {
  const { cubeSdo, changeCubeSdoProps } = CreateCubeService.instance;

  const media = cubeSdo.materialSdo?.mediaSdo;

  const [checkedName, setCheckedName] = useState('InternalMedia');
  const [link, setLink] = useState(media?.meidaContents?.linkMediaUrl || '');

  const handleChecked = (_: React.FormEvent, data: CheckboxProps) => {
    const value = data.value || '';
    setCheckedName(value as string);
  };

  const onChangeLinkMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLink(e.target.value);
    // changeCubeSdoProps(
    //   'materialSdo.mediaSdo.meidaContents.linkMediaUrl',
    //   e.target.value
    // );
  };

  useEffect(() => {
    changeCubeSdoProps('materialSdo.mediaSdo.mediaType', checkedName);
  }, [checkedName]);

  useEffect(() => {
    if (media?.meidaContents) {
      changeCubeSdoProps(
        'materialSdo.mediaSdo.meidaContents.linkMediaUrl',
        link
      );
    }
  }, [link]);

  useEffect(() => {
    contentUploader();
  });

  return (
    <>
      <div className="section-tit">
        <span className="text1">부가정보</span>
      </div>
      <Form.Field>
        <label className="necessary">교육자료</label>
        <Radio
          className="base"
          label="영상파일 업로드"
          value={MediaType.InternalMedia}
          checked={checkedName === 'InternalMedia'}
          onChange={handleChecked}
        />
        <Radio
          className="base"
          label="제작영상 가져오기"
          value={MediaType.InternalMediaUpload}
          checked={checkedName === 'InternalMediaUpload'}
          onChange={handleChecked}
        />

        <Radio
          className="base"
          label="영상링크"
          value={MediaType.LinkMedia}
          checked={checkedName === 'LinkMedia'}
          onChange={handleChecked}
        />
        <div className="ui form">
          {checkedName === MediaType.InternalMedia && (
            <>
              {(media && media.meidaContents?.internalMedias.length && (
                <div className="ui input h48 file">
                  {media.meidaContents.internalMedias.map(
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
                  {
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
                  }
                </div>
              )}
            </>
          )}
          {checkedName === MediaType.InternalMediaUpload && (
            <PanoptoListModal />
          )}
          {checkedName === MediaType.LinkMedia && (
            <div className="ui input h48">
              <input
                type="text"
                placeholder="http://"
                // value={media?.meidaContents?.linkMediaUrl || ''}
                value={link}
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

const CreateVideoTypeViewDefauilt = observer(CreateVideoTypeView);

export default CreateVideoTypeViewDefauilt;
