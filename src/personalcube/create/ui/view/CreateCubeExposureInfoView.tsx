import React from 'react';
import { Table } from 'semantic-ui-react';
import { getCineroomName } from '../../../../shared/service/useCineroom/useRequestCineroom';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';


interface CreateCubeExposureInfoViewProps {
  tags?: string[] | null;
}


export default function CreateCubeExposureInfoView({
  tags,
}: CreateCubeExposureInfoViewProps) {

  return (
    <>
      <div className="section-tit">
        <span className="text1">
          <PolyglotText defaultString="노출정보" id="Create-DetailExposure-노출정보" />
        </span>
      </div>
      <Table className="create">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>
              <PolyglotText defaultString="Tag 정보" id="Create-DetailExposure-Tag 정보" />
            </Table.HeaderCell>
            <Table.Cell>
              {
                tags &&
                tags.length > 0 &&
                tags.map((tag, index) => {
                  if (index === 0) {
                    return <span key={index}>{tag}</span>;
                  } else {
                    return <span key={index}>, {tag}</span>;
                  }
                }) || <span>-</span>
              }
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}
