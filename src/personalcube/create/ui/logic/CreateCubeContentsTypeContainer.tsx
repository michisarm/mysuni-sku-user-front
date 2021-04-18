import React from 'react';
import { observer } from 'mobx-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import CreateWebPageTypeView from '../view/CreateWebPageTypeView';
import CreateDocumentTypeView from '../view/CreateDocumentTypeView';
import CreateVideoTypeView from '../view/CreateVideoTypeViewV2';
import CreateAudioTypeView from '../view/CreateAudioTypeViewV2';

function CreateCubeContentsTypeContainer() {
  const { cubeSdo } = CreateCubeService.instance;

  return (
    <>
      {cubeSdo.type === 'WebPage' && <CreateWebPageTypeView />}
      {cubeSdo.type === 'Documents' && <CreateDocumentTypeView />}
      {cubeSdo.type === 'Video' && <CreateVideoTypeView />}
      {cubeSdo.type === 'Audio' && <CreateAudioTypeView />}
    </>
  );
}

const CreateCubeContentsTypeContainerDefault = observer(
  CreateCubeContentsTypeContainer
);

export default CreateCubeContentsTypeContainerDefault;
