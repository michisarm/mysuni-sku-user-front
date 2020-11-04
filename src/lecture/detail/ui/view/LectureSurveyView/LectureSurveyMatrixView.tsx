import React, { useCallback } from 'react';
import { CheckboxProps } from 'semantic-ui-react';
import Radio from 'semantic-ui-react/dist/commonjs/addons/Radio';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import { selectMatrixAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface LectureSurveyMatrixViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyMatrixView: React.FC<LectureSurveyMatrixViewProps> = function LectureSurveyMatrixView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
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
              <Table.Row>
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
                          lectureSurveyAnswerItem.matrixItem.some(
                            c =>
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
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyMatrixView;
