
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon, Accordion, Checkbox } from 'semantic-ui-react';
import { CollegeModel, ChannelModel } from 'college';


interface Props {
  colleges: CollegeModel[]
  selectedCollegeIds: string[]
  favoriteChannels: ChannelModel[]
  onToggleCollege: (college: CollegeModel) => void,
  onToggleChannel: (channel: ChannelModel) => void,
}

@observer
@reactAutobind
class FavoriteChannelChangeView extends Component<Props> {
  //
  color: string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];

  render() {
    //
    const { colleges, selectedCollegeIds, favoriteChannels, onToggleCollege, onToggleChannel } = this.props;

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
                    colleges.map((college: CollegeModel, index:number) => (
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
                              college.channels && college.channels.length > 0 && college.channels.map((channel, index) => (
                                <li key={`channel-${index}`}>
                                  <Checkbox
                                    label={channel.name}
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
