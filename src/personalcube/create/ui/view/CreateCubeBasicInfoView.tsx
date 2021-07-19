import React from  'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { getMainCategory, getSubCategories } from '../../model/CreateCubeDetail';
import { getCollgeName, getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import { CubeTypeNameType } from '../../../personalcube/model';
import EnumUtil, { CubeStateView } from '../../../../shared/ui/logic/EnumUtil';
import { CubeCategory, combineCollege, renderChannelNames } from '../../../../shared/model/CubeCategory';
import CubeType from '../../../../lecture/detail/model/CubeType';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';


interface CreateCubeBasicInfoViewProps {
  name: string;
  categories: CubeCategory[];
  cubeType: CubeType;
  cubeState: string;
  creatorName: string;
  time: number;
  remark: string;
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
        <span className="text1">
          <PolyglotText defaultString="기본정보" id="Create-DetailBasic-기본정보" />
        </span>
      </div>
      {
        <Table className="create">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText defaultString="강좌명" id="Create-DetailBasic-강좌명" />
              </Table.HeaderCell>
              <Table.Cell>
                <div>{name}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText defaultString="메인채널" id="Create-DetailBasic-메인채널" />
              </Table.HeaderCell>
              <Table.Cell>
                {mainCollegeName}
                <span className="dash" />
                {mainChannelName}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText defaultString="서브채널" id="Create-DetailBasic-서브채널" />
              </Table.HeaderCell>
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
              <Table.HeaderCell>
                <PolyglotText defaultString="교육형태" id="Create-DetailBasic-교육형태" />
              </Table.HeaderCell>
              <Table.Cell>
                <div>{CubeTypeNameType[cubeType]}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText defaultString="생성정보" id="Create-DetailBasic-생성정보" />
              </Table.HeaderCell>
              <Table.Cell>
                <div>{moment(time).format('YYYY.MM.DD')}
                  <span className="dash" />{creatorName}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText defaultString="승인정보" id="Create-DetailBasic-승인정보" />
              </Table.HeaderCell>
              <Table.Cell>
                <div>
                {EnumUtil.getEnumValue(CubeStateView, cubeState).get(cubeState)}
                {
                  remark  && (
                    <><br /><PolyglotText defaultString="사유" id="Create-DetailBasic-사유" /><span className = "dash" />{remark}</>
                  )
                }
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      }
    </>
  );
}
