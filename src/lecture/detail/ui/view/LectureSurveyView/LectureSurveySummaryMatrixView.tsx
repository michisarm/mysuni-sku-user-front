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
import { useLectureSurveyAnswerSummaryList } from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveyMatrixViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryMatrixView: React.FC<LectureSurveyMatrixViewProps> = function LectureSurveySummaryMatrixView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const answerList = useLectureSurveyAnswerSummaryList();
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectMatrixAnswer(lectureSurveyItem, data.value);
    },
    [lectureSurveyItem]
  );
  const { columns, rows, questionNumber } = lectureSurveyItem;

  const numberCountMap = answerList?.find(
    f => f.questionNumber === questionNumber
  )?.summaryItems.matrixItems;

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
            rows.map(({ title, no: rowNumber }, rowIndex) => (
              <Table.Row key={rowNumber}>
                <Table.Cell>{title}</Table.Cell>
                {columns &&
                  columns.map(({ no: columnSelectedNumber }, index) => (
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

                      {numberCountMap !== undefined
                        ? numberCountMap[rowIndex].numberCountMap[index]
                        : 0}
                      {/* 
                      {answerList?.map((f)=>{if(f.questionNumber == questionNumber) {return Object.values(f.summaryItems.matrixItems[rowIndex].numberCountMap)[index]}})}
                       */}
                      {/* 여기에 몇 개 선택했는지 나와야함 */}
                    </Table.Cell>
                  ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryMatrixView;
