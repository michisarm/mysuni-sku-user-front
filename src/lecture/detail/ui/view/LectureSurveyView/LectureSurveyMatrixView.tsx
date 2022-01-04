import React, { useCallback } from 'react';
import { CheckboxProps, Icon } from 'semantic-ui-react';
import Radio from 'semantic-ui-react/dist/commonjs/addons/Radio';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import { selectMatrixAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureSurveyMatrixViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyMatrixView: React.FC<LectureSurveyMatrixViewProps> =
  function LectureSurveyMatrixView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
    lectureSurveyState,
  }) {
    const onChangeValue = useCallback(
      (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        if (data.value === undefined) {
          return;
        }
        selectMatrixAnswer(lectureSurveyItem, data.value);
      },
      [lectureSurveyItem]
    );
    const { columns, rows } = lectureSurveyItem;
    return (
      <LectureSurveyChoiceLayout {...lectureSurveyItem}>
        <div style={{ margin: '20px 0' }}>
          {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
        </div>
        <Table celled fixed singleLine className="test-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              {columns &&
                columns.map(({ no, title }) => (
                  <Table.HeaderCell key={no}>{title}</Table.HeaderCell>
                ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows &&
              rows.map(({ title, no: rowNumber }) => (
                <Table.Row key={rowNumber}>
                  <Table.Cell>{title}</Table.Cell>
                  {columns &&
                    columns.map(({ no: columnSelectedNumber }) => (
                      <Table.Cell key={columnSelectedNumber}>
                        <Radio
                          className="base"
                          value={JSON.stringify({
                            rowNumber: `${rowNumber}`,
                            columnSelectedNumber: `${columnSelectedNumber}`,
                          })}
                          checked={
                            lectureSurveyAnswerItem !== undefined &&
                            lectureSurveyAnswerItem.matrixItem !== undefined &&
                            lectureSurveyAnswerItem.matrixItem?.some(
                              (c) =>
                                c.rowNumber === `${rowNumber}` &&
                                c.columnSelectedNumber ===
                                  `${columnSelectedNumber}`
                            )
                          }
                          onChange={onChangeValue}
                        />
                      </Table.Cell>
                    ))}
                </Table.Row>
              ))}
          </Table.Body>
        </Table>

        {lectureSurveyState === undefined ||
          (lectureSurveyState.state === 'Progress' &&
            lectureSurveyItem.isRequired === true &&
            (lectureSurveyAnswerItem === undefined ||
              lectureSurveyAnswerItem.matrixItem?.length !==
                lectureSurveyItem.rows?.length) && (
              <div className="rev-noti">
                <Icon className="error16" />
                <span>
                  <PolyglotText
                    defaultString="해당 문항은 필수 항목 입니다."
                    id="survey-필수항목-alert2"
                  />
                </span>
              </div>
            ))}
      </LectureSurveyChoiceLayout>
    );
  };

export default LectureSurveyMatrixView;
