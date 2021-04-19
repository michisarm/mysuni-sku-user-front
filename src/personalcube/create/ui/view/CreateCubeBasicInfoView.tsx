import React from  'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { getMainCategory, getSubCategories } from '../../model/CreateCubeDetail';
import { getCollgeName, getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import { CubeTypeNameType } from '../../../personalcube/model';
import EnumUtil, { CubeStateView } from '../../../../shared/ui/logic/EnumUtil';
import { CubeCategory, combineCollege, renderChannelNames } from '../../../../shared/model/CubeCategory';
import CubeType from '../../../../lecture/detail/model/CubeType';


interface CreateCubeBasicInfoViewProps {
  name: string;
  categories: CubeCategory[];
  cubeType: CubeType;
  cubeState: string;
  creatorName: string;
  time: number;
  remark?: string;
}

export default function CreateCubeBasicInfoView({
  name,
  categories,
  cubeType,
  cubeState,
  creatorName,
  time,
  remark,
}: CreateCubeBasicInfoViewProps) {
  const mainCategory = getMainCategory(categories);
  const mainCollegeName = getCollgeName(mainCategory?.collegeId || '') || '';
  const mainChannelName = getChannelName(mainCategory?.channelId || '') || '';

  const subCategories = getSubCategories(categories);
  const {collegeIdList, combineCollegeWithChannel } = combineCollege(subCategories);

  return (
    <>
      <div className="section-tit">
        <span className="text1">기본정보</span>
      </div>
      {
        <Table className="create">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>강좌명</Table.HeaderCell>
              <Table.Cell>
                <div>{name}</div>
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
              <Table.Cell>
              {
                collegeIdList &&
                collegeIdList.length > 0 &&
                collegeIdList.map((collegeId, index) => (
                  <span className="text2" key={`channels-${index}`}>
                    {getCollgeName(collegeId)}
                  <span className="dash" />
                    {renderChannelNames(collegeId, combineCollegeWithChannel)}
                  </span>
                ))
              }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>교육형태</Table.HeaderCell>
              <Table.Cell>
                <div>{CubeTypeNameType[cubeType]}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>생성정보</Table.HeaderCell>
              <Table.Cell>
                <div>{moment(time).format('YYYY.MM.DD')}
                  <span className="dash" />{creatorName}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>승인정보</Table.HeaderCell>
              <Table.Cell>
                <div>
                {EnumUtil.getEnumValue(CubeStateView, cubeState).get(cubeState)}
                {remark}
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      }
    </>
  );
}