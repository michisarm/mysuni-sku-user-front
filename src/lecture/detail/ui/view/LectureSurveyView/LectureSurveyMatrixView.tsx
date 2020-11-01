import React from 'react';
import DatePicker from 'react-datepicker';
import Radio from 'semantic-ui-react/dist/commonjs/addons/Radio';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

const LectureSurveyMatrixView: React.FC<LectureSurveyItem> = function LectureSurveyMatrixView(
  props
) {
  return (
    <LectureSurveyChoiceLayout {...props}>
      <Table celled fixed singleLine className="test-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            {props.columns &&
              props.columns.map(({ no, title }) => (
                <Table.HeaderCell key={no}>{title}</Table.HeaderCell>
              ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.rows &&
            props.rows.map(({ title }) => (
              <Table.Row>
                <Table.Cell>{title}</Table.Cell>
                {props.columns &&
                  props.columns.map(({ no }) => (
                    <Table.Cell key={no}>
                      <Radio
                        className="base"
                        name="radioGroup01"
                        value={no}
                        checked={false}
                        onChange={() => {}}
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
