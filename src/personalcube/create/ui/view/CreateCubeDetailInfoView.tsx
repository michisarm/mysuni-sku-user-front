import React from 'react';
import { CreateCubeDetail } from '../../model/CreateCubeDetail';
import { Table } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';


interface CreateCubeDetailInfoViewProps {
  createCubeDetail: CreateCubeDetail;
  cubeType: string;
}


export default function CreateCubeDetailInfoView({
  createCubeDetail,
  cubeType,
}: CreateCubeDetailInfoViewProps) {
  const { cube, cubeContents, cubeMaterial: { board } } = createCubeDetail;

  return (
    <>
      <div className="section-tit">
        <span className="text1">교육정보</span>
      </div>
      { cubeContents && (
        <Table className="create">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>교육목표</Table.HeaderCell>
              <Table.Cell>
                <div>{cubeContents.description.goal}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>교육대상</Table.HeaderCell>
              <Table.Cell>
                <div>{cubeContents.description.applicants}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>교육내용</Table.HeaderCell>
              <Table.Cell>
                <ReactQuill
                  theme="bubble"
                  value={ cubeContents.description.description}
                  readOnly
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>이수조건</Table.HeaderCell>
              <Table.Cell>
                <div>{cubeContents.description.completionTerms}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>기타안내</Table.HeaderCell>
              <Table.Cell>
                <ReactQuill
                  theme="bubble"
                  value={cubeContents.description.guide}
                  readOnly
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>교육시간</Table.HeaderCell>
              <Table.Cell>
                <div>{timeToHourMinuteFormat(cube.learningTime)}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>난이도</Table.HeaderCell>
              <Table.Cell>
                <div>{cubeContents.difficultyLevel}</div>
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
                  {cubeContents.organizerId}
                  {cubeContents.otherOrganizerName}
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
}