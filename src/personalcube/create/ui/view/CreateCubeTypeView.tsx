import React  from 'react';
import { Table } from 'semantic-ui-react';
import { DepotFileViewModel } from '@nara.drama/depot';
import { useParams } from 'react-router-dom';
import { CreateCubeDetailPageParams } from '../../model/CreateCubeDetailPageParams';
import { CubeMaterial } from '../../../../lecture/model/CubeMaterial';
import VideoTypeView from './VideoTypeView';
import WebPageTypeView from './WebPageTypeView';
import DocumentTypeView from './DocumentTypeView';


interface CreateCubeTypeViewProps {
  cubeMaterial: CubeMaterial;
  fileMap: Map<string, any>;
}

export default function CreateCubeTypeView({
  cubeMaterial,
  fileMap,
}: CreateCubeTypeViewProps) {
  const params = useParams<CreateCubeDetailPageParams>();

  return (
    <>
      <div className="section-tit">
        <span className="text1">부가정보</span>
      </div>
      <Table className="create">
        <Table.Body>
          {
            (params.cubeType === 'Video' || params.cubeType === 'Audio') && (
              <VideoTypeView 
                media={cubeMaterial.media}
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
                officeWeb={cubeMaterial.officeWeb}
                fileMap={fileMap}
              />
            )
          }
        </Table.Body>
      </Table>
    </>
  );
}