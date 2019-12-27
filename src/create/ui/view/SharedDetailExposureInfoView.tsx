import { Image, Table } from 'semantic-ui-react';
import * as React from 'react';
import { PersonalCubeModel } from '../../../personalcube/personalcube';

interface Props {
  personalCube: PersonalCubeModel
}

class SharedDetailExposureInfoView extends React.Component<Props> {
  render() {
    const { personalCube } = this.props;
    return (
      <>
        <div className="section-tit">
          <span className="text1">노출정보</span>
        </div>

        <Table className="create">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>아이콘</Table.HeaderCell>
              <Table.Cell>
                <div><Image src="/images/all/thumb-card-60-px.jpg" /></div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>관계사 공개 범위 설정</Table.HeaderCell>
              <Table.Cell>
                {
                  personalCube && personalCube.subsidiaries && personalCube.subsidiaries.length
                  && personalCube.subsidiaries.map((subsidiary, index) => {
                    if (index === 0) return <div key={index}>{subsidiary.name}</div>;
                    else return <div key={index}>, {subsidiary.name}</div>;
                  })
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Tag 정보</Table.HeaderCell>
              <Table.Cell>
                {
                  personalCube && personalCube.tags && personalCube.tags.length
                  && personalCube.tags.map((tag, index) => {
                    if (index === 0) return <div key={index}>{tag}</div>;
                    else return <div key={index}>, {tag}</div>;
                  }) || <div>-</div>
                }
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default SharedDetailExposureInfoView;
