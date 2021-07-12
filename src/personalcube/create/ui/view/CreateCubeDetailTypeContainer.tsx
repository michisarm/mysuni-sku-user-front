import React  from 'react';
import { Table } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { CreateCubeDetailParams } from '../../model/CreateCubeDetailParams';
import VideoTypeView from './VideoTypeView';
import WebPageTypeView from './WebPageTypeView';
import DocumentTypeView from './DocumentTypeView';
import { observer } from 'mobx-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { FileService } from '../../../../shared/present/logic/FileService';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

function CreateCubeDetailTypeContainer() {
  const params = useParams<CreateCubeDetailParams>();
  const { createCubeDetail } = CreateCubeService.instance;
  const { fileMap } = FileService.instance;

  return (
    <>
      <div className="section-tit">
        <span className="text1"><PolyglotText defaultString="부가정보" id="Create-DetailContentsType-부가정보" /></span>
      </div>
      <Table className="create">
        <Table.Body>
          {
            (params.cubeType === 'Video' || params.cubeType === 'Audio') && (
              <VideoTypeView
                media={createCubeDetail?.cubeMaterial.media}
                fileMap={fileMap}
              />
            )
          }
          {
            params.cubeType === 'Documents' && (
              <DocumentTypeView
                fileMap={fileMap}
              />
            )
          }
          {
            (params.cubeType === 'WebPage' || params.cubeType === 'Cohort') && (
              <WebPageTypeView
                officeWeb={createCubeDetail?.cubeMaterial.officeWeb}
                fileMap={fileMap}
              />
            )
          }
        </Table.Body>
      </Table>
    </>
  );
}


const CreateCubeDetailTypeContainerDefault = observer(CreateCubeDetailTypeContainer);

export default CreateCubeDetailTypeContainerDefault;
