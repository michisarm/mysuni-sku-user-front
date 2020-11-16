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

const LectureClassroomInfoView: React.FC<LectureClassroomInfoViewProps> = function LectureClassroomInfoView({
  lectureClassroom,
}) {
  return (
    <>
      {lectureClassroom.classrooms.length === 1 && (
        <div className="ov-paragraph period-area">
          <div role="list" className="ui list">
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
          </div>
        </div>
      )}
    </>
  );
};

export default LectureClassroomInfoView;
