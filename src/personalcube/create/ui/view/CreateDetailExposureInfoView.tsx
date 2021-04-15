import React from 'react';
import { CreateCubeDetail } from '../../model/CreateCubeDetail';
import { Table } from 'semantic-ui-react';
import { getCineroomName } from '../../../../shared/service/useCineroom/useRequestCineroom';


interface CreateDetailExposureInfoViewProps {
  createCubeDetail: CreateCubeDetail;
}


export default function CreateDetailExposureInfoView({
  createCubeDetail,
}: CreateDetailExposureInfoViewProps) {
  const { cube, cubeContents } = createCubeDetail;

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
                cube.sharingCineroomIds &&
                cube.sharingCineroomIds.length > 0 && 
                cube.sharingCineroomIds.map((cineroomId, index) => {
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
                cubeContents.tags &&
                cubeContents.tags.length > 0 &&
                cubeContents.tags.map((tag, index) => {
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