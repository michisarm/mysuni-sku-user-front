import React from 'react';
import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface Props {
  title: string;
  requestChannel: string;
  mainCategory: string;
  subCategory?: string;
  state: string;

  operatorName: string;
  departmentName: string;
  email: string;
  registeredTime: number;

  onClickList: () => void;
}

class QnaManagementDetailHeaderView extends React.Component<Props> {
  //
  render() {
    //
    const {
      title,
      requestChannel,
      mainCategory,
      subCategory,
      state,
      operatorName,
      departmentName,
      email,
      registeredTime,
      onClickList,
    } = this.props;

    return (
      <>
        <div className="spt-answer-view">
          <div className="title-area">
            <div className="title-inner">
              <div className="title">{title}</div>
              <div className="qna-navi">
                <strong>{requestChannel}</strong>
                <div>
                  <span>{mainCategory}</span>
                  {subCategory != '' ? <span>{subCategory}</span> : ''}
                </div>
                <strong className="stat done">{state}</strong>
              </div>
              <div className="user-info">
                <span className="date">
                  <span>{operatorName}</span>
                  <span>{departmentName}</span>
                  <span>{email}</span>
                  <span>
                    {registeredTime &&
                      moment(registeredTime).format('YYYY.MM.DD HH:mm')}
                  </span>
                </span>
              </div>

              <div className="actions">
                <Button
                  icon
                  className="left postset commu-list16"
                  onClick={onClickList}
                >
                  <Icon className="commu-list16" />

                  <PolyglotText defaultString="List" id="support-noti-list1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default QnaManagementDetailHeaderView;
