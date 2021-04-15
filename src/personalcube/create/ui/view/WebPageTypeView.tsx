import React from 'react';
import { Table } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import OfficeWeb from '../../../../lecture/detail/model/OfficeWeb';



interface WebPageTypeViewProps {
  officeWeb?: OfficeWeb | null;
  fileMap: Map<string, any>;
}

export default function WebPageTypeView({
  officeWeb,
  fileMap,
}: WebPageTypeViewProps) {

  const moveToUrl = (url: string) => {
    window.open(url);
  };

  return (
    <>
      <Table.Row>
        <Table.HeaderCell>교육자료</Table.HeaderCell>
        <Table.Cell>
          <div className="text2">
            <a onClick={() => moveToUrl(officeWeb?.webPageUrl || '')}>
              {officeWeb?.webPageUrl || ''}
            </a>
          </div>
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