import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { ChannelModel } from 'college/model';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../../model/LangSupport';

interface Props {
  channel: ChannelModel;
  title?: React.ReactNode;
  onViewAll?: (e: any, data: any) => void;
}

@reactAutobind
class LineHeaderView extends Component<Props> {
  //
  render() {
    //
    const { channel, title, onViewAll } = this.props;

    return (
      <div className="section-head">
        <span className="channel">
          {parsePolyglotString(
            channel.name,
            getDefaultLang(channel.langSupports)
          )}
        </span>{' '}
        {title}
        {(onViewAll && (
          <div className="right">
            <Button icon className="right btn-blue" onClick={onViewAll}>
              View all
              <Icon className="morelink" />
            </Button>
          </div>
        )) ||
          null}
      </div>
    );
  }
}

export default LineHeaderView;
