import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Accordion, Button, Checkbox, Icon } from 'semantic-ui-react';
import { CheckableChannel } from '../../../../shared/viewmodel/CheckableChannel';
import {
  compareCollgeCineroom,
  getChannelName,
  getCollgeName,
} from 'shared/service/useCollege/useRequestCollege';
import { CollegeIdModel } from 'shared/model/CollegeIdModel';
import { find, isEmpty } from 'lodash';

interface Props {
  colleges: CollegeIdModel[];
  channelIds: string[];
  selectedCollegeIds: string[];
  favoriteChannels: CheckableChannel[];
  favoriteCompanyChannels: CheckableChannel[];
  onToggleCollege: (collegeId: string) => void;
  onToggleChannel: (channel: CheckableChannel) => void;
}

@observer
@reactAutobind
class FavoriteChannelChangeView extends Component<Props> {
  //
  color: string[] = [
    'purple',
    'violet',
    'yellow',
    'orange',
    'red',
    'green',
    'blue',
    'marine',
    'teal',
  ];

  isChecked(collegeId: string, channelId: string) {
    //
    const { favoriteChannels } = this.props;

    return (
      !compareCollgeCineroom(collegeId) ||
      !isEmpty(find(favoriteChannels, { id: channelId }))
    );
  }

  render() {
    //
    const {
      colleges,
      channelIds,
      selectedCollegeIds,
      favoriteChannels,
      favoriteCompanyChannels,
      onToggleCollege,
      onToggleChannel,
    } = this.props;

    return (
      <div className="row">
        <div className="cell vtop">
          <div className="select-area">
            <div className="scrolling-60vh">
              {!channelIds || channelIds.length < 1 ? (
                <div className="search-empty">
                  <Icon className="rocket50" />
                  <div>검색된 Channel이 없습니다.</div>
                </div>
              ) : (
                <Accordion className="channel">
                  {colleges.map((college, index: number) => (
                    <div key={`college-${index}`}>
                      <Accordion.Title
                        active={selectedCollegeIds.includes(college.id)}
                        onClick={() => onToggleCollege(college.id)}
                      >
                        <span className={`name ${this.color[index]}`}>
                          {getCollgeName(college.id)}
                        </span>
                        <Icon />
                      </Accordion.Title>
                      <Accordion.Content
                        active={selectedCollegeIds.includes(college.id)}
                      >
                        <ul>
                          {college.channelIds &&
                            college.channelIds.length > 0 &&
                            college.channelIds
                              .filter((channelId) =>
                                channelIds.includes(channelId)
                              )
                              .map((channelId, index) => (
                                <li key={`channel-${index}`}>
                                  <Checkbox
                                    className="base"
                                    label={
                                      <label>{getChannelName(channelId)}</label>
                                    }
                                    name={channelId}
                                    checked={this.isChecked(
                                      college.id,
                                      channelId
                                    )}
                                    disabled={
                                      !compareCollgeCineroom(college.id)
                                    }
                                    onChange={() =>
                                      onToggleChannel({
                                        id: channelId,
                                        name: getChannelName(channelId),
                                        checked: false,
                                      })
                                    }
                                  />
                                </li>
                              ))}
                        </ul>
                      </Accordion.Content>
                    </div>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        </div>

        <div className="cell vtop">
          <div className="select-area">
            <div className="scrolling-60vh">
              <div className="select-item">
                {favoriteChannels.map((channel: CheckableChannel) => (
                  <Button
                    key={`del_${channel.id}`}
                    className="del"
                    onClick={() => onToggleChannel(channel)}
                  >
                    {getChannelName(channel.id)}
                  </Button>
                ))}
                {favoriteCompanyChannels.map((channel: CheckableChannel) => (
                  <Button key={`del_${channel.id}`} className="del default">
                    {getChannelName(channel.id)}
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
