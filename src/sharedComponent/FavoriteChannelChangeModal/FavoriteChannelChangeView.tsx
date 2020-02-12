import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Accordion, Button, Checkbox, Icon } from 'semantic-ui-react';
import { IdNameCount } from 'shared';
import { ChannelModel, CollegeType } from 'college/model';
import { CollegeLectureCountRdo } from 'lecture/model';


interface Props {
  colleges: CollegeLectureCountRdo[]
  channelIds: string[]
  selectedCollegeIds: string[]
  favoriteChannels: ChannelModel[]
  favoriteCompanyChannels: ChannelModel[]
  onToggleCollege: (college: CollegeLectureCountRdo) => void,
  onToggleChannel: (channel: IdNameCount | ChannelModel) => void,
}

@observer
@reactAutobind
class FavoriteChannelChangeView extends Component<Props> {
  //
  color: string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];


  isChecked(collegeType: CollegeType, channelId: string) {
    //
    const { favoriteChannels }  = this.props;

    return collegeType === CollegeType.Company || favoriteChannels.map(favoriteChannel => favoriteChannel.id).includes(channelId);
  }

  render() {
    //
    const { colleges, channelIds, selectedCollegeIds, favoriteChannels, favoriteCompanyChannels, onToggleCollege, onToggleChannel } = this.props;

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
                                        className="base"
                                        label={<label>{channel.name} <span>({channel.count})</span></label>}
                                        name={channel.name}
                                        checked={this.isChecked(college.collegeType, channel.id)}
                                        disabled={college.collegeType === CollegeType.Company}
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
                { favoriteChannels.map((channel: ChannelModel) => (
                  <Button key={`del_${channel.id}`} className="del" onClick={() => onToggleChannel(channel)}>
                    {channel.name}
                  </Button>
                ))}
                { favoriteCompanyChannels.map((channel: ChannelModel) => (
                  <Button key={`del_${channel.id}`} className="del default">
                    {channel.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteChannelChangeView;
