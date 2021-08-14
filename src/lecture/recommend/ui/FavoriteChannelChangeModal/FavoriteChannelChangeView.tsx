import React, { Component } from 'react';
import { IdName, reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Accordion, Button, Checkbox, Icon } from 'semantic-ui-react';
import { IdNameCount } from 'shared/model';
import { CollegeType } from 'college/model';
import { CollegeLectureCountRdo } from 'lecture/model';
import { CheckableChannel } from '../../../../shared/viewmodel/CheckableChannel';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';
import { getChannelName } from 'shared/service/useCollege/useRequestCollege';

interface Props {
  colleges: CollegeLectureCountRdo[];
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

  isChecked(collegeType: CollegeType, channelId: string) {
    //
    const { favoriteChannels } = this.props;

    return (
      collegeType === CollegeType.Company ||
      favoriteChannels
        .map((favoriteChannel) => favoriteChannel.id)
        .includes(channelId)
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
                            {parsePolyglotString(
                              college.name,
                              getDefaultLang(college.langSupports)
                            )}
                          </span>
                          <Icon />
                        </Accordion.Title>
                        <Accordion.Content
                          active={selectedCollegeIds.includes(college.id)}
                        >
                          <ul>
                            {college.channels &&
                              college.channels.length > 0 &&
                              college.channels
                                .filter((channel) =>
                                  channelIds.includes(channel.id)
                                )
                                .map((channel, index) => (
                                  <li key={`channel-${index}`}>
                                    <Checkbox
                                      className="base"
                                      label={
                                        <label>
                                          {getChannelName(channel.id)}
                                        </label>
                                      }
                                      name={parsePolyglotString(
                                        channel.name,
                                        getDefaultLang(channel.langSupports)
                                      )}
                                      checked={this.isChecked(
                                        college.collegeType,
                                        channel.id
                                      )}
                                      disabled={
                                        college.collegeType ===
                                        CollegeType.Company
                                      }
                                      onChange={() =>
                                        onToggleChannel({
                                          id: channel.id,
                                          name: getChannelName(channel.id),
                                          checked: false,
                                        })
                                      }
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
