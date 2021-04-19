import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import WebPageFormView from '../view/WebPageFormView';
import CreateVideoTypeView from '../view/CreateVideoTypeViewV2';
import CreateAudioTypeView from '../view/CreateAudioTypeViewV2';
import ReferenceFileFormView from '../view/ReferenceFileFormView';
import DocumentFormView from '../view/DocumentFormView';

function CreateCubeContentsTypeContainer() {
  const { cubeSdo } = CreateCubeService.instance;

  const onChangeReferenceFile = useCallback((id: string) => {
    CreateCubeService.instance.changeCubeSdoProps('fileBoxId', id);
  }, []);
  
  const onChangeEducationFile = useCallback((id: string) => {
    CreateCubeService.instance.changeCubeSdoProps(
      'materialSdo.officeWebSdo.fileBoxId',
      id
    );
  }, []);

  const onChangeWebPageUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    CreateCubeService.instance.changeCubeSdoProps('materialSdo.officeWebSdo.webPageUrl', e.target.value);
  }, []);

  return (
    <>
      {cubeSdo.type === 'WebPage' && (
          <WebPageFormView
            webPageUrl={cubeSdo.materialSdo?.officeWebSdo.webPageUrl} 
            onChangeUrl={onChangeWebPageUrl}
          />
        )
      }
      {cubeSdo.type === 'Documents' && 
        (
          <DocumentFormView 
            fileBoxId={cubeSdo.materialSdo?.officeWebSdo.fileBoxId || ''}
            onChangeFile={onChangeEducationFile}
          />
        )
      }
      {cubeSdo.type === 'Video' && <CreateVideoTypeView />}
      {cubeSdo.type === 'Audio' && <CreateAudioTypeView />}
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
