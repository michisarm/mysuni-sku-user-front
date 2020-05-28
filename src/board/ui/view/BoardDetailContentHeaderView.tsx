
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';


interface Props {
  title: string,
  time: number,
  onClickList: (e: any) => void,
  subField?: React.ReactNode,
  deletable?: boolean,
  onClickDelete?: (e: any) => void,
  onClickModify?: (e: any) => void,
}

@reactAutobind
@observer
class BoardDetailContentHeaderView extends Component<Props> {
  //
  render() {
    //
    const { title, time, subField, deletable, onClickList, onClickDelete, onClickModify } = this.props;

    return (
      <div className="title-area">
        <div className="title-inner">
          <div className="title">{title}</div>
          <div className="user-info">
            {subField}
            <span className="date">{time && moment(time).format('YYYY.MM.DD HH:MM')}</span>
          </div>
          <div className="actions">
            { onClickModify && (
              <Button icon className="left postset edit" onClick={onClickModify}>
                <Icon name="edit" />Edit
              </Button>
            )}
            { deletable && (
              <Button icon className="left postset delete" onClick={onClickDelete}>
                <Icon name="delete" />Delete
              </Button>
            )}
            <Button icon className="left postset commu-list16" onClick={onClickList}>
              <Icon className="commu-list16" />List
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardDetailContentHeaderView;
