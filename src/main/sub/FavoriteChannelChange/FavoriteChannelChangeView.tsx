import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Accordion, Button, Checkbox, Icon } from 'semantic-ui-react';
import { IdName, IdNameCount } from 'shared/model';
import { ChannelModel, CollegeType } from 'college/model';
import { CollegeLectureCountRdo } from 'lecture/model';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../lecture/model/LangSupport';

interface Props {
  colleges: CollegeLectureCountRdo[];
  channelIds: string[];
  selectedCollegeIds: string[];
  favoriteChannels: ChannelModel[];
  favoriteCompanyChannels: ChannelModel[];
  onToggleCollege: (college: CollegeLectureCountRdo) => void;
  onToggleChannel: (channel: IdName | ChannelModel) => void;
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
              {!colleges || colleges.length < 1 ? (
                <div className="search-empty">
                  <Icon className="rocket50" />
                  <div>
                    <PolyglotText
                      defaultString="검색된 Channel이 없습니다."
                      id="home-ChannelChangeModal-null"
                    />
                  </div>
                </div>
              ) : (
                <Accordion className="channel">
                  {colleges.map(
                    (college: CollegeLectureCountRdo, index: number) => (
                      <div key={`college-${index}`}>
                        <Accordion.Title
                          active={selectedCollegeIds.includes(college.id)}
                          onClick={() => onToggleCollege(college)}
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
                                          {parsePolyglotString(
                                            channel.name,
                                            getDefaultLang(channel.langSupports)
                                          )}
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
                                          name: parsePolyglotString(
                                            channel.name,
                                            getDefaultLang(channel.langSupports)
                                          ),
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
                {favoriteChannels.map((channel: ChannelModel) => (
                  <Button
                    key={`del_${channel.id}`}
                    className="del"
                    onClick={() => onToggleChannel(channel)}
                  >
                    {parsePolyglotString(
                      channel.name,
                      getDefaultLang(channel.langSupports)
                    )}
                  </Button>
                ))}
                {favoriteCompanyChannels.map((channel: ChannelModel) => (
                  <Button key={`del_${channel.id}`} className="del default">
                    {parsePolyglotString(
                      channel.name,
                      getDefaultLang(channel.langSupports)
                    )}
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
