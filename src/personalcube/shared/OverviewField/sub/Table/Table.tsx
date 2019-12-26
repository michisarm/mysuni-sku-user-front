
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ClassroomModel } from 'personalcube/classroom';
import { Button, Label, Icon, Table as SemanticTable } from 'semantic-ui-react';
import TableModal from '../TableModal';


interface Props {
  classrooms: ClassroomModel[],
  titleIcon?: string,
  titleText?: string,
}

@reactAutobind
class Table extends Component<Props> {
  //
  render() {
    //
    const { titleIcon, titleText, classrooms } = this.props;

    return (
      <div className="series-wrap">
        {(titleIcon || titleText) && (
          <h3 className="title-style">
            <Label className="onlytext bold size24">
              { titleIcon && <Icon className={titleIcon} /> }
              <span>{titleText}</span>
            </Label>
          </h3>
        )}

        <TableModal
          classrooms={classrooms}
          trigger={(
            <Button icon className="right btn-blue">
              more <Icon className="morelink" />
            </Button>
          )}
        />

        <SemanticTable celled>
          <SemanticTable.Header>
            <SemanticTable.Row>
              <SemanticTable.HeaderCell>차수</SemanticTable.HeaderCell>
              <SemanticTable.HeaderCell>강사</SemanticTable.HeaderCell>
              <SemanticTable.HeaderCell>장소</SemanticTable.HeaderCell>
              <SemanticTable.HeaderCell>수강신청 기간</SemanticTable.HeaderCell>
              <SemanticTable.HeaderCell>시작일 및 종료일</SemanticTable.HeaderCell>
            </SemanticTable.Row>
          </SemanticTable.Header>

          <SemanticTable.Body>
            {classrooms.length && classrooms.map((classroom: ClassroomModel, index: number) => (
              <SemanticTable.Row key={`table-row-${index}`}>
                <SemanticTable.Cell className="num">{classroom.round}</SemanticTable.Cell>
                <SemanticTable.Cell className="teacher"><span>{classroom.instructor.name}</span></SemanticTable.Cell>
                <SemanticTable.Cell className="location"><span>{classroom.operation.location}</span></SemanticTable.Cell>
                <SemanticTable.Cell className="center">{classroom.enrolling.applyingPeriod.startDateSub.toLocaleDateString()} ~ {classroom.enrolling.applyingPeriod.endDateSub.toLocaleDateString()}</SemanticTable.Cell>
                <SemanticTable.Cell className="center">{classroom.enrolling.learningPeriod.startDateSub.toLocaleDateString()} ~ {classroom.enrolling.learningPeriod.endDateSub.toLocaleDateString()}</SemanticTable.Cell>
              </SemanticTable.Row>
            ))}
          </SemanticTable.Body>
        </SemanticTable>
      </div>
    );
  }
}
export default Table;
