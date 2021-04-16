import React from 'react';
import { observer } from 'mobx-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import CreateWebPageTypeView from '../view/CreateWebPageTypeView';
import CreateDocumentTypeView from '../view/CreateDocumentTypeView';


function CreateCubeContentsTypeContainer() {
    const { cubeSdo } = CreateCubeService.instance;

  return (
    <>
    {
      cubeSdo.type === 'WebPage' && (
        <CreateWebPageTypeView />
      )
    }
    {
      cubeSdo.type === 'Documents' && (
        <CreateDocumentTypeView />
      )
    }
      {/* {
        cubeSdo.type === 'Video' && (
          <CreateVideoTypeView
            media={media}
            onChangePersonalCubeProps={onChangePersonalCubeProps}
            onChangeMediaProps={this.onChangeMediaProps}
            getFileBoxIdForReference ={this.getFileBoxIdForReference}
            personalCube={personalCube}
          />
        ) 
      }
      {
        cubeSdo.type === 'Audio' && (
          <CreateAudioTypeView
            media={media}
            onChangePersonalCubeProps={onChangePersonalCubeProps}
            onChangeMediaProps={this.onChangeMediaProps}
            getFileBoxIdForReference ={this.getFileBoxIdForReference}
            personalCube={personalCube}
          />
        )
      }
      {
        (cubeSdo.type === 'WebPage' || cubeSdo.type === 'Cohort') && (
          <CreateWebPageTypeView
            onChangeOfficeWebProps={this.onChangeOfficeWebProps}
            officeWeb={officeWeb}
            onChangePersonalCubeProps={onChangePersonalCubeProps}
            getFileBoxIdForReference ={this.getFileBoxIdForReference}
            personalCube={personalCube}
          />
        )
      }
      {
        cubeSdo.type === 'Documents' && (
          <CreateDocumentTypeView
            onChangePersonalCubeProps={onChangePersonalCubeProps}
            onChangeOfficeWebProps={this.onChangeOfficeWebProps}
            officeWeb={officeWeb}
            getFileBoxIdForReference ={this.getFileBoxIdForReference}
            personalCube={personalCube}
            getFileBoxIdForEducation={this.getFileBoxIdForEducation}
          />
        )
      }
      {
        cubeSdo.type === 'Community' && (
          <CreateCommunityTypeView
            onChangePersonalCubeProps={onChangePersonalCubeProps}
            onChangeMediaProps={this.onChangeMediaProps}
            personalCube={personalCube}
          />
        )
      } */}
    </>
  );
}

const CreateCubeContentsTypeContainerDefault = observer(CreateCubeContentsTypeContainer);


export default CreateCubeContentsTypeContainerDefault;