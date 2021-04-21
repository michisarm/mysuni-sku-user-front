/* eslint-disable react/jsx-closing-tag-location */
import moment from 'moment';
import React, { useRef } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import TableModal from '../../../../../personalcube/shared/OverviewField/sub/TableModal';
import ClassroomModalView from '../../../../category/ui/view/ClassroomModalView';
import LectureClassroom from '../../../viewModel/LectureClassroom';

interface LectureClassroomInfoViewProps {
  lectureClassroom: LectureClassroom;
}

function formatDate(dateString: string) {
  return `${moment(dateString).format('YYYY.MM.DD')}`;
}

function numberWithCommas(x: number) {
  let s = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

const LectureClassroomInfoView: React.FC<LectureClassroomInfoViewProps> = function LectureClassroomInfoView({
  lectureClassroom,
}) {
  return (
    <>
      {lectureClassroom.classrooms.length > 0 && (
        <div className="ov-paragraph period-area">
          <div role="list" className="ui list">
            {lectureClassroom.classrooms.length === 1 && (
              <>
                <div role="listitem" className="item">
                  <div className="title">
                    <h3 className="title-style">
                      <div className="ui label onlytext bold size24">
                        <i aria-hidden="true" className="icon period" />
                        <span>수강신청기간</span>
                      </div>
                    </h3>
                  </div>
                  <div className="detail">{`${formatDate(
                    lectureClassroom.classrooms[0].applyingStartDate
                  )} ~ ${formatDate(
                    lectureClassroom.classrooms[0].applyingEndDate
                  )}`}</div>
                </div>
                <div role="listitem" className="item">
                  <div className="title">
                    <h3 className="title-style">
                      <div className="ui label onlytext bold size24">
                        <i aria-hidden="true" className="icon cancellation" />
                        <span>취소가능기간</span>
                      </div>
                    </h3>
                  </div>
                  <div className="detail">{`${formatDate(
                    lectureClassroom.classrooms[0].cancellableStartDate
                  )} ~ ${formatDate(
                    lectureClassroom.classrooms[0].cancellableEndDate
                  )}`}</div>
                </div>
              </>
            )}
            {!lectureClassroom.classrooms[0].freeOfCharge.freeOfCharge && lectureClassroom.classrooms[0].freeOfCharge.chargeAmount > 0 && (
              <div role="listitem" className="item">
                <div className="title">
                  <h3 className="title-style">
                    <div className="ui label onlytext bold size24">
                      <Icon className="paidcourse" />
                      <span>유료과정</span>
                    </div>
                  </h3>
                </div>
                <div className="detail">
                  {numberWithCommas(
                    lectureClassroom.classrooms[0].freeOfCharge.chargeAmount
                  )}
                  원
                  <p>
                    {' '}
                    &#8251; 각 사 HR조직에 청구되며, 참여 인원에 따라 변경
                    가능합니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LectureClassroomInfoView;
