import React from 'react';
import { Table } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import {PolyglotText} from '../../../../shared/ui/logic/PolyglotText';


interface DocumentTypeViewProps {
  fileMap: Map<string, any>;
}


export default function DocumentTypeView({
  fileMap,
}: DocumentTypeViewProps) {

  return (
    <>
      <Table.Row>
        <Table.HeaderCell><PolyglotText defaultString="교육자료" id="Create-DetailContentsDoc-교육자료" /></Table.HeaderCell>
        <Table.Cell>
          {
            fileMap.get('officeWeb')?.map((foundedFile: DepotFileViewModel, index: number) => (
              <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
            ))
          }
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell><PolyglotText defaultString="참고자료" id="Create-DetailContentsDoc-참고자료" /></Table.HeaderCell>
        <Table.Cell>
          {
            fileMap.get('reference')?.map((foundedFile: DepotFileViewModel, index: number) => (
              <p key={index}><a onClick={() => depot.downloadDepotFile(foundedFile.id)}>{foundedFile.name}</a></p>
            ))
          }
        </Table.Cell>
      </Table.Row>
    </>
  );
}
