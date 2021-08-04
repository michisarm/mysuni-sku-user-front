import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Segment, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import { ChannelModel } from 'college/model';
import { Area } from 'tracker/model';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

interface Props {
  channel: ChannelModel;
  channels: ChannelModel[];
  onSelectChannel: (channel: ChannelModel) => void;
}

@reactAutobind
@observer
class ChannelLecturesHeaderView extends Component<Props> {
  //
  render() {
    //
    const { channel, channels, onSelectChannel } = this.props;

    return (
      <div className="main-filter" data-area={Area.RECOMMEND_TITLE}>
        <Segment className="full">
          <Dropdown
            className="ui inline transparent large"
            text={`${parsePolyglotString(
              channel.name,
              getDefaultLang(channel.langSupports)
            )} 채널의 추천과정`}
          >
            <Dropdown.Menu>
              {(channels &&
                channels.length &&
                channels.map((channel) => (
                  <Dropdown.Item
                    key={`channel_drop_${channel.channelId}`}
                    onClick={() => onSelectChannel(channel)}
                  >
                    {parsePolyglotString(
                      channel.name,
                      getDefaultLang(channel.langSupports)
                    )}
                  </Dropdown.Item>
                ))) ||
                null}
            </Dropdown.Menu>
          </Dropdown>
        </Segment>
      </div>
    );
  }
}

export default ChannelLecturesHeaderView;
