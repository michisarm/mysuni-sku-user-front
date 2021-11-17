import React, { Component } from 'react';
import { IdName, reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Accordion, Button, Checkbox, Icon } from 'semantic-ui-react';
import { IdNameCount } from 'shared/model';
import { ChannelModel, CollegeType } from 'college/model';
import { CollegeLectureCountRdo } from 'lecture/model';
import { parsePolyglotString } from '../../viewmodel/PolyglotString';
import { getDefaultLang } from '../../../lecture/model/LangSupport';
import {
  compareCollgeCineroom,
  getChannelName,
  getCollgeName,
} from 'shared/service/useCollege/useRequestCollege';

interface Props {
  colleges: CollegeLectureCountRdo[];
  channelIds: string[];
  selectedCollegeIds: string[];
  favoriteChannels: string[];
  favoriteCompanyChannels: ChannelModel[];
  onToggleCollege: (collegeId: string) => void;
  onToggleChannel: (channel: string) => void;
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
      !compareCollgeCineroom(collegeId) || favoriteChannels.includes(channelId)
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
                  {colleges.map(
                    (college: CollegeLectureCountRdo, index: number) => (
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
                            {college.channelIds.length > 0 &&
                              college.channelIds
                                .filter((id) => channelIds.includes(id))
                                .map((id, index) => (
                                  <li key={`channel-${index}`}>
                                    <Checkbox
                                      className="base"
                                      label={
                                        <label>{getChannelName(id)}</label>
                                      }
                                      name={getChannelName(id)}
                                      checked={this.isChecked(college.id, id)}
                                      disabled={
                                        !compareCollgeCineroom(college.id)
                                      }
                                      onChange={() => onToggleChannel(id)}
                                    />
                                  </li>
                                ))}
                          </ul>
                        </Accordion.Content>
                      </div>
                    )
                  )}
                </Accordion>
              )}
            </div>
          </div>
        </div>

        <div className="cell vtop">
          <div className="select-area">
            <div className="scrolling-60vh">
              <div className="select-item">
                {favoriteChannels.map((channel) => (
                  <Button
                    key={`del_${channel}`}
                    className="del"
                    onClick={() => onToggleChannel(channel)}
                  >
                    {getChannelName(channel)}
                  </Button>
                ))}
                {favoriteCompanyChannels.map((channel: ChannelModel) => (
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
