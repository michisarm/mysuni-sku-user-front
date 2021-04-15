import React  from 'react';
import { CreateCubeDetail } from '../../model/CreateCubeDetail';
import { Table, Form } from 'semantic-ui-react';
import { MediaType } from '../../../../lecture/model/MediaType';
import depot from '@nara.drama/depot';
import { DepotFileViewModel } from '@nara.drama/depot';
import { useParams } from 'react-router-dom';
import { CreateCubeDetailPageParams } from '../../model/CreateCubeDetailPageParams';


interface CreateDetailTypeViewProps {
  createCubeDetail: CreateCubeDetail;
  fileMap: Map<string, DepotFileViewModel[]>;
}

export default function CreateDetailTypeView({
  createCubeDetail,
  fileMap,
}: CreateDetailTypeViewProps) {
  const params = useParams<CreateCubeDetailPageParams>();

  const { cubeMaterial } = createCubeDetail;

  const moveToVideoUrl = (url: string) => {
    window.open(url);
  }

  const renderVideo = () => {
    const { media } = cubeMaterial;
     
    return (
      <>
        <Table.Row>
          <Table.HeaderCell>교육자료</Table.HeaderCell>
          <Table.Cell>
            {
              media && media.mediaContents && media.mediaContents.internalMedias && media.mediaContents.internalMedias.length > 0
                && media.mediaContents.internalMedias.map((internalMedia, index) => (
                  <Form.Field key={`shared-cell-${index}`}>
                    <p><a onClick={() => moveToVideoUrl(internalMedia.viewUrl)}>{internalMedia.folderName} | {internalMedia.name} </a></p>
                  </Form.Field>
                ))
            }
            {
              media && media.mediaType === MediaType.LinkMedia && (
                <div className="text2">
                  <a href="#" onClick={e => { moveToVideoUrl(media.mediaContents.linkMediaUrl); e.preventDefault();}}>
                    {media && media.mediaContents && media.mediaContents.linkMediaUrl || ''}
                  </a>
                </div>
              )
            }
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>참고자료</Table.HeaderCell>
          <Table.Cell>
            {
              fileMap && 
              fileMap.get('reference')?.map((foundedFile: DepotFileViewModel, index: number) => (
                  <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
                )) || '-'
            }
          </Table.Cell>
        </Table.Row>
      </>
    );
  };

  const renderDocuments = () => {

  };

  const renderWebPage = () => {
    console.log('hello');
    return (
      <>
        <Table.Row>
          <Table.HeaderCell>교육자료</Table.HeaderCell>
          <Table.Cell>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>참고자료</Table.HeaderCell>
          <Table.Cell>
          {
              fileMap && 
              fileMap.get('reference')?.map((foundedFile: DepotFileViewModel, index: number) => (
                  <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
                )) || '-'
            }
          </Table.Cell>
        </Table.Row>
      </>
    );
  };

  return (
    <>
      <div className="section-tit">
        <span className="text1">부가정보</span>
      </div>
      <Table className="create">
        <Table.Body>
          {
            (params.cubeType === 'Video' || params.cubeType === 'Audio') && (
              renderVideo()
            )
          }
          {
            params.cubeType === 'Documents' && (
              renderDocuments()
            )
          }
          {
            params.cubeType === 'WebPage' || params.cubeType === 'Cohort' && (
              renderWebPage()
            )
          }
        </Table.Body>
      </Table>
    </>
  );
}