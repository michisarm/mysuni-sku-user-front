
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';
import { PostModel } from '../../model';


interface Props {
  post: PostModel
  onClickList: (e: any) => void
  subField?: React.ReactNode
  deletable?: boolean
  onClickDelete?: (e: any) => void
}

@reactAutobind
@observer
class BoardDetailContentHeaderView extends Component<Props> {
  //
  render() {
    //
    const { post, subField, deletable, onClickList, onClickDelete } = this.props;

    return (
      <div className="title-area">
        <div className="title-inner">
          <div className="title">{post.title}</div>
          <div className="user-info">
            {subField}
            <span className="date">{post.time && moment(post.time).format('YYYY.MM.DD HH:MM')}</span>
          </div>
          <div className="actions">
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
