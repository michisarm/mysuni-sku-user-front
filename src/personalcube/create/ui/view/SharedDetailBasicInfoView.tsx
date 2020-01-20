
import React from 'react';

import { Table } from 'semantic-ui-react';
import { PersonalCubeModel } from 'personalcube/personalcube';
import moment from 'moment';
import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';

interface Props {
  personalCube: PersonalCubeModel
  filesMap?: Map<string, any>
}

class SharedDetailBasicInfoView extends React.Component<Props> {
  render() {
    const { personalCube } = this.props;
    const selectedChannels: any = [];
    if (personalCube && personalCube.subCategories) {
      const channelListMap = PersonalCubeModel.makeChannelsMap(personalCube.subCategories);
      channelListMap.forEach((value, key, map) => (
        selectedChannels.push(
          map.size === 1 ? null : <p key={key} />,
          <span key={key}>{key}<span className="dash" /></span>,
          value.map((channel, index) => {
            if (index === 0) return <span key={index}>{channel}</span>;
            else return <span key={index}>, {channel}</span>;
          }
          )
        )
      )
      );
    }

    return (
      <>
        <div className="section-tit">
          <span className="text1">기본정보</span>
        </div>
        {
          personalCube
          && (
            <Table className="create">
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell>강좌명</Table.HeaderCell>
                  <Table.Cell>
                    <div>{personalCube.name}</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>메인채널</Table.HeaderCell>
                  <Table.Cell>
                    {personalCube.category && personalCube.category.college && personalCube.category.college.name}
                    <span className="dash" />
                    {personalCube.category && personalCube.category.channel && personalCube.category.channel.name}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>서브채널</Table.HeaderCell>
                  <Table.Cell>
                    {
                      selectedChannels && selectedChannels
                    }
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육형태</Table.HeaderCell>
                  <Table.Cell>
                    <div>{personalCube.contents && personalCube.contents.type}</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>생성정보</Table.HeaderCell>
                  <Table.Cell>
                    <div>{moment(personalCube.time).format('YYYY.MM.DD')}
                      <span className="dash" />{personalCube.creator && personalCube.creator.name}
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>승인정보</Table.HeaderCell>
                  <Table.Cell>
                    <div>{EnumUtil.getEnumValue(CubeStateView, personalCube.cubeState).get(personalCube.cubeState)}</div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )}
      </>
    );
  }
}

export default SharedDetailBasicInfoView;

