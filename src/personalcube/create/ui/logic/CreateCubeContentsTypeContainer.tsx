import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import CreateVideoTypeView from '../view/CreateVideoTypeView';
import CreateAudioTypeView from '../view/CreateAudioTypeView';
import CreateWebPageTypeView from '../view/CreateWebPageTypeView';
import CreateDocumentTypeView from '../view/CreateDocumentTypeView';
import CreateCommunityTypeView from '../view/CreateCommunityTypeView';


interface CreateCubeContentsTypeContainerProps {
  createCubeService?: CreateCubeService;
}


function CreateCubeContentsTypeContainer({
  createCubeService,
}: CreateCubeContentsTypeContainerProps) {
  if(createCubeService === undefined) {
    return null;
  }
  
  const { cubeSdo } = createCubeService;

  return (
    <>
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

const CreateCubeContentsTypeContainerDefault = inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CreateCubeContentsTypeContainer));


export default CreateCubeContentsTypeContainerDefault;