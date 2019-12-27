import { Table } from 'semantic-ui-react';
import * as React from 'react';
import { PersonalCubeModel } from 'personalcube/personalcube';

interface Props {
  personalCube: PersonalCubeModel
  filesMap?: Map<string, any>
}

class SharedDetailBasicInfoView extends React.Component<Props> {
  render() {
    const { personalCube, filesMap } = this.props;
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
                  <Table.HeaderCell>대표 카테고리</Table.HeaderCell>
                  <Table.Cell>
                    {personalCube.category && personalCube.category.college && personalCube.category.college.name}
                    <span className="dash" />
                    {personalCube.category && personalCube.category.channel && personalCube.category.channel.name}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>서브 카테고리</Table.HeaderCell>
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
                    <div>{new Date(personalCube.time).toLocaleDateString()}
                      <span className="dash" />{personalCube.creator && personalCube.creator.name}
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>승인정보</Table.HeaderCell>
                  <Table.Cell>
                    <div>2019.10.07<span className="dash" />{personalCube.cubeState}</div>
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

