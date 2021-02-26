import React, { useCallback } from 'react';
import { CheckboxProps, Image } from 'semantic-ui-react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import { selectMatrixAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';

interface LectureSurveyMatrixViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryMatrixView: React.FC<LectureSurveyMatrixViewProps> = function LectureSurveySummaryMatrixView({
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
  const { columns, rows, matrixItems } = lectureSurveyItem;
  console.log('ma', matrixItems);
  return (
    <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
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
                    columns.map(({ no: columnSelectedNumber }) => {
                      let count: number | undefined;

                      if (matrixItems !== undefined) {
                        const matrixItem = matrixItems.find(
                          c => c.rowNumber === rowNumber.toString()
                        );
                        if (matrixItem?.numberCountMap !== undefined) {
                          count =
                            matrixItem.numberCountMap[columnSelectedNumber];
                        }
                      }

                      const isChecked =
                        lectureSurveyAnswerItem !== undefined &&
                        lectureSurveyAnswerItem.matrixItem !== undefined &&
                        lectureSurveyAnswerItem.matrixItem.some(
                          c =>
                            c.rowNumber === `${rowNumber}` &&
                            c.columnSelectedNumber === `${columnSelectedNumber}`
                        );
                      // console.log('행렬', isChecked)
                      return (
                        <Table.Cell key={columnSelectedNumber}>
                          {/* <Radio
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
                          {count || '0'} */}

                          <div className="course-survey-list">
                            <span className="course-survey-list-btnImg">
                              {isChecked === true ? (
                                <Image
                                  style={{ display: 'inline-blick' }}
                                  src={`${process.env.PUBLIC_URL}/images/all/survay-radio-btn.png`}
                                />
                              ) : (
                                <Image
                                  style={{ display: 'inline-blick' }}
                                  src={`${process.env.PUBLIC_URL}/images/all/survey-empty-btn.png`}
                                />
                              )}
                            </span>
                            <span className="course-servey-list-boldNumber">
                              {count || '0'}
                            </span>
                          </div>
                        </Table.Cell>
                      );
                    })}
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </LectureSurveySummaryChoiceLayout>
  );
};

export default LectureSurveySummaryMatrixView;
