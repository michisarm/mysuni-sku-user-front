import React from  'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { CreateCubeDetail, getMainCategory } from '../../model/CreateCubeDetail';
import { getCollgeName, getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import { CubeTypeNameType } from '../../../personalcube/model';
import EnumUtil, { CubeStateView } from '../../../../shared/ui/logic/EnumUtil';


interface CreateDetailBasicInfoViewProps {
  createCubeDetail: CreateCubeDetail;
}

export default function CreateDetailBasicInfoView({
  createCubeDetail,
}: CreateDetailBasicInfoViewProps) {
  const { cube, cubeContents } = createCubeDetail;
  const mainCategory = getMainCategory(cube.categories);
  const mainCollegeName = getCollgeName(mainCategory?.collegeId || '') || '';
  const mainChannelName = getChannelName(mainCategory?.channelId || '') || '';

  return (
    <>
      <div className="section-tit">
        <span className="text1">기본정보</span>
      </div>
      { createCubeDetail && (
        <Table className="create">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>강좌명</Table.HeaderCell>
              <Table.Cell>
                <div>{cube.name}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>메인채널</Table.HeaderCell>
              <Table.Cell>
                {mainCollegeName}
                <span className="dash" />
                {mainChannelName}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>서브채널</Table.HeaderCell>
              {/* <Table.Cell>
                { selectedChannels && selectedChannels }
              </Table.Cell> */}
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>교육형태</Table.HeaderCell>
              <Table.Cell>
                <div>{CubeTypeNameType[cube.type]}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>생성정보</Table.HeaderCell>
              <Table.Cell>
                <div>{moment(cube.time).format('YYYY.MM.DD')}
                  <span className="dash" />{cubeContents.creatorName}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>승인정보</Table.HeaderCell>
              <Table.Cell>
                {/* <div>{EnumUtil.getEnumValue(CubeStateView, cube.cubeState).get(personalCube.cubeState)}
                {rejectRemarks}
                </div> */}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
}