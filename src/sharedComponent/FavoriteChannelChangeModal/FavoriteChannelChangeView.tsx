
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon, Accordion, Checkbox } from 'semantic-ui-react';
import { IdNameCount } from 'shared';
import { ChannelModel } from 'college';
import { CollegeLectureCountRdo } from 'lecture';


interface Props {
  colleges: CollegeLectureCountRdo[]
  channelIds: string[]
  selectedCollegeIds: string[]
  favoriteChannels: ChannelModel[]
  onToggleCollege: (college: CollegeLectureCountRdo) => void,
  onToggleChannel: (channel: IdNameCount | ChannelModel) => void,
}

@observer
@reactAutobind
class FavoriteChannelChangeView extends Component<Props> {
  //
  color: string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];

  render() {
    //
    const { colleges, channelIds, selectedCollegeIds, favoriteChannels, onToggleCollege, onToggleChannel } = this.props;

    return (
      <div className="row">
        <div className="cell vtop">
          <div className="select-area">
            <div className="scrolling-60vh">
              { (!colleges || colleges.length < 1) ?
                <div className="search-empty">
                  <Icon className="rocket50" />
                  <div>검색된 Channel이 없습니다.</div>
                </div>
                :
                <Accordion className="channel">
                  {
                    colleges.map((college: CollegeLectureCountRdo, index: number) => (
                      <div key={`college-${index}`}>
                        <Accordion.Title
                          active={selectedCollegeIds.includes(college.collegeId)}
                          onClick={() => onToggleCollege(college)}
                        >
                          <span className={`name ${this.color[index]}`}>{college.name}</span>
                          <Icon />
                        </Accordion.Title>
                        <Accordion.Content active={selectedCollegeIds.includes(college.collegeId)}>
                          <ul>
                            {
                              college.channelCounts && college.channelCounts.length > 0
                                && college.channelCounts.filter(channel => channelIds.includes(channel.id))
                                  .map((channel, index) => (
                                    <li key={`channel-${index}`}>
                                      <Checkbox
                                        label={<label>{channel.name} <span>({channel.count})</span></label>}
                                        name={channel.name}
                                        className="base"
                                        checked={favoriteChannels.map(favoriteChannel => favoriteChannel.id).includes(channel.id)}
                                        onChange={() => onToggleChannel(channel)}
                                      />
                                    </li>
                                  ))
                            }
                          </ul>
                        </Accordion.Content>
                      </div>
                    ))
                  }
                </Accordion>
              }
            </div>
          </div>
        </div>

        <div className="cell vtop">
          <div className="select-area">
            <div className="scrolling-60vh">
              <div className="select-item">
                {
                  favoriteChannels.map((channel: ChannelModel) => (
                    <Button key={`del_${channel.id}`} className="del" onClick={() => onToggleChannel(channel)}>
                      {channel.name}
                    </Button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteChannelChangeView;
