import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import WebPageFormView from '../view/WebPageFormView';
import CreateVideoTypeView from '../view/CreateVideoTypeViewV2';
import CreateAudioTypeView from '../view/CreateAudioTypeViewV2';
import ReferenceFileFormView from '../view/ReferenceFileFormView';
import DocumentFormView from '../view/DocumentFormView';
import { CheckboxProps } from 'semantic-ui-react';
import { MediaType } from '../../../media/model';

function CreateCubeContentsTypeContainer() {
  const { cubeSdo, changeCubeSdoProps } = CreateCubeService.instance;
  const mediaSdo = cubeSdo.materialSdo.mediaSdo;

  const onChangeReferenceFile = useCallback((id: string) => {
    changeCubeSdoProps('fileBoxId', id);
  }, []);

  const onChangeEducationFile = useCallback((id: string) => {
    changeCubeSdoProps('materialSdo.officeWebSdo.fileBoxId', id);
  }, []);

  const onChangeWebPageUrl = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      changeCubeSdoProps('materialSdo.officeWebSdo.webPageUrl', e.target.value);
    },
    []
  );

  const handleChecked = useCallback(
    (_: React.FormEvent, data: CheckboxProps) => {
      const value = data.value || '';

      changeCubeSdoProps(
        'materialSdo.mediaSdo.mediaContents.internalMedias',
        []
      );
      changeCubeSdoProps('materialSdo.mediaSdo.mediaContents.linkMediaUrl', '');
      changeCubeSdoProps('materialSdo.mediaSdo.mediaType', value);
    },
    []
  );

  const handleChangeLinkMedia = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      changeCubeSdoProps(
        'materialSdo.mediaSdo.mediaContents.linkMediaUrl',
        e.target.value
      );
    },
    []
  );

  return (
    <>
      {cubeSdo.type === 'WebPage' && (
        <WebPageFormView
          webPageUrl={cubeSdo.materialSdo?.officeWebSdo.webPageUrl}
          onChangeUrl={onChangeWebPageUrl}
        />
      )}
      {cubeSdo.type === 'Documents' && (
        <DocumentFormView
          fileBoxId={cubeSdo.materialSdo?.officeWebSdo.fileBoxId || ''}
          onChangeFile={onChangeEducationFile}
        />
      )}
      {cubeSdo.type === 'Video' && (
        <CreateVideoTypeView
          mediaType={mediaSdo.mediaType || MediaType.LinkMedia}
          linkMediaUrl={mediaSdo.mediaContents?.linkMediaUrl}
          internalMedias={mediaSdo.mediaContents?.internalMedias}
          onChecked={handleChecked}
          onChangeLinkMedia={handleChangeLinkMedia}
        />
      )}
      {cubeSdo.type === 'Audio' && (
        <CreateAudioTypeView
          mediaType={mediaSdo.mediaType || MediaType.LinkMedia}
          linkMediaUrl={mediaSdo.mediaContents?.linkMediaUrl}
          internalMedias={mediaSdo.mediaContents?.internalMedias}
          onChecked={handleChecked}
          onChangeLinkMedia={handleChangeLinkMedia}
        />
      )}
      <ReferenceFileFormView
        fileBoxId={cubeSdo.fileBoxId || ''}
        onChangeFile={onChangeReferenceFile}
      />
    </>
  );
}

const CreateCubeContentsTypeContainerDefault = observer(
  CreateCubeContentsTypeContainer
);

export default CreateCubeContentsTypeContainerDefault;
