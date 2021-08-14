import React from 'react';
import { CreateCubeDetail } from '../../model/CreateCubeDetail';
import { Table } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import { timeToHourMinuteFormat } from '../../../../shared/helper/dateTimeHelper';
import { getContentsProviderName } from '../../service/useRequestContentsProvider';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';

interface CreateCubeDetailInfoViewProps {
  createCubeDetail: CreateCubeDetail;
}

export default function CreateCubeDetailInfoView({
  createCubeDetail,
}: CreateCubeDetailInfoViewProps) {
  const { cube, cubeContents } = createCubeDetail;

  return (
    <>
      <div className="section-tit">
        <span className="text1">
          <PolyglotText
            defaultString="교육정보"
            id="Create-DetailContentsWaiting-교육정보"
          />
        </span>
      </div>
      {cubeContents && (
        <Table className="create">
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="교육목표"
                  id="Create-DetailContentsWaiting-교육목표"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <div>{parsePolyglotString(cubeContents.description.goal)}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="교육대상"
                  id="Create-DetailContentsWaiting-교육대상"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <div>
                  {parsePolyglotString(cubeContents.description.applicants)}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="교육내용"
                  id="Create-DetailContentsWaiting-교육내용"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <ReactQuill
                  theme="bubble"
                  value={parsePolyglotString(
                    cubeContents.description.description
                  )}
                  readOnly
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="이수조건"
                  id="Create-DetailContentsWaiting-이수조건"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <div>
                  {parsePolyglotString(
                    cubeContents.description.completionTerms
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="기타안내"
                  id="Create-DetailContentsWaiting-기타안내"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <ReactQuill
                  theme="bubble"
                  value={parsePolyglotString(cubeContents.description.guide)}
                  readOnly
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="교육시간"
                  id="Create-DetailContentsWaiting-교육시간"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <div>{timeToHourMinuteFormat(cube.learningTime)}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="난이도"
                  id="Create-DetailContentsWaiting-난이도"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <div>{cubeContents.difficultyLevel}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>
                <PolyglotText
                  defaultString="교육기관 / 출처"
                  id="Create-DetailContentsWaiting-교육기관출처"
                />
              </Table.HeaderCell>
              <Table.Cell>
                <div>
                  {parsePolyglotString(
                    getContentsProviderName(cubeContents.organizerId) || null
                  )}
                  {cubeContents.organizerId === 'PVD00018' &&
                    `: ${cubeContents.otherOrganizerName}`}
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
}
