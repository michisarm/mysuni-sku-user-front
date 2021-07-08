import React, { useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import OfficeWeb from '../../../../lecture/detail/model/OfficeWeb';
import {PolyglotText} from '../../../../shared/ui/logic/PolyglotText';



interface WebPageTypeViewProps {
  officeWeb?: OfficeWeb | null;
  fileMap: Map<string, any>;
}

export default function WebPageTypeView({
  officeWeb,
  fileMap,
}: WebPageTypeViewProps) {

  const onClickWebPageUrl = useCallback(() => {
    window.open(officeWeb?.webPageUrl);
  }, [officeWeb?.webPageUrl])

  return (
    <>
      <Table.Row>
        <Table.HeaderCell><PolyglotText defaultString="교육자료" id="Create-DetailContentsWeb-교육자료" />교육자료</Table.HeaderCell>
        <Table.Cell>
          <div className="text2">
            <a onClick={onClickWebPageUrl}>
              {officeWeb?.webPageUrl}
            </a>
          </div>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell><PolyglotText defaultString="참고자료" id="Create-DetailContentsWeb-참고자료" />참고자료</Table.HeaderCell>
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
