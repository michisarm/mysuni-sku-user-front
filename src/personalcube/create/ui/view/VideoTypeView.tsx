import React, { useCallback } from 'react';
import { Table, Form } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import Media from '../../../../lecture/model/Media';
import { MediaType } from '../../../../lecture/model/MediaType';


interface VideoTypeViewProps {
  media?: Media | null;
  fileMap: Map<string, any>;
}


export default function VideoTypeView({
  media,
  fileMap,
}: VideoTypeViewProps) {

  const moveToVideoUrl = useCallback((url: string) => {
    window.open(url);
  }, []);

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
}