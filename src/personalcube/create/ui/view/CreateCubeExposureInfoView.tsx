import React from 'react';
import { Table } from 'semantic-ui-react';
import { getCineroomName } from '../../../../shared/service/useCineroom/useRequestCineroom';


interface CreateCubeExposureInfoViewProps {
  sharingCineroomIds: string[];
  tags?: string[] | null;
}


export default function CreateCubeExposureInfoView({
  sharingCineroomIds,
  tags,
}: CreateCubeExposureInfoViewProps) {

  return (
    <>
      <div className="section-tit">
        <span className="text1">노출정보</span>
      </div>
      <Table className="create">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>관계사 공개 범위 설정</Table.HeaderCell>
            <Table.Cell>
              {
                sharingCineroomIds.length > 0 &&
                sharingCineroomIds.map((cineroomId, index) => {
                  if (index === 0) {
                    return <span key={index}>{getCineroomName(cineroomId)}</span>;
                  } else {
                    return <span key={index}>, {getCineroomName(cineroomId)}</span>;
                  }
                }) || <span>-</span>
              }
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Tag 정보</Table.HeaderCell>
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