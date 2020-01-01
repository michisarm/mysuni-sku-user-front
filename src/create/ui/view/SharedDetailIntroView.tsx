import { Table } from 'semantic-ui-react';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { CubeIntroModel } from '../../../personalcube/cubeintro';
import { BoardService } from '../../../personalcube';
import { mobxHelper } from '../../../shared';

interface Props {
  cubeIntro: CubeIntroModel
  cubeType: string
  boardService?: BoardService
}


@inject(mobxHelper.injectFrom('personalCube.boardService'))
@observer
@reactAutobind
class SharedDetailIntroView extends React.Component<Props> {
  render() {
    const { cubeIntro, cubeType } = this.props;
    const { board } = this.props.boardService || {} as BoardService;

    return (
      <>
        <div className="section-tit">
          <span className="text1">교육정보</span>
        </div>
        {
          cubeIntro
          && (
            <Table className="create">
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell>교육목표</Table.HeaderCell>
                  <Table.Cell>
                    <div>{cubeIntro.description && cubeIntro.description.goal}</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육대상</Table.HeaderCell>
                  <Table.Cell>
                    <div>{cubeIntro.description && cubeIntro.description.applicants}</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육내용</Table.HeaderCell>
                  <Table.Cell>
                    <div>{ cubeIntro.description && cubeIntro.description.description }</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>이수조건</Table.HeaderCell>
                  <Table.Cell>
                    <div>{ cubeIntro.description && cubeIntro.description.completionTerms}</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>기타안내</Table.HeaderCell>
                  <Table.Cell>
                    <div>{cubeIntro.description && cubeIntro.description.guide}</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육시간</Table.HeaderCell>
                  <Table.Cell>
                    <div>{parseInt(String(cubeIntro.learningTime / 60), 10)} h {cubeIntro.learningTime % 60} m</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>난이도</Table.HeaderCell>
                  <Table.Cell>
                    <div>{cubeIntro.difficultyLevel}</div>
                  </Table.Cell>
                </Table.Row>
                {
                  cubeType === 'Community' && (
                    <>
                      <Table.Row>
                        <Table.HeaderCell>커뮤니티 구분</Table.HeaderCell>
                        <Table.Cell>
                          <div>{board && board.config && board.config.enClosed ? '폐쇄형' : '오픈형'}</div>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>기간</Table.HeaderCell>
                        <Table.Cell>
                          <div>{board && board.learningPeriod && board.learningPeriod.startDate}
                          ~ {board && board.learningPeriod && board.learningPeriod.endDate}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  )
                }
                <Table.Row>
                  <Table.HeaderCell>교육기관 / 출처</Table.HeaderCell>
                  <Table.Cell>
                    <div>
                      {cubeIntro.operation && cubeIntro.operation.organizer && cubeIntro.operation.organizer.name}
                       : {cubeIntro.operation && cubeIntro.operation.etcCp}
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )}
      </>
    );
  }
}

export default SharedDetailIntroView;
