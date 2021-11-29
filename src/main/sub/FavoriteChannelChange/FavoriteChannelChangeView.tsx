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
import {
  compareCollgeCineroom,
  getChannelName,
} from '../../../shared/service/useCollege/useRequestCollege';

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

  isChecked(collegeId: string, channelId: string) {
    //
    const { favoriteChannels } = this.props;

    return (
      compareCollgeCineroom(collegeId) ||
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
                            {college.name}
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
                                  <li key={`channel-${id}`}>
                                    <Checkbox
                                      className="base"
                                      label={
                                        <label>{getChannelName(id)}</label>
                                      }
                                      name={getChannelName(id)}
                                      checked={this.isChecked(college.id, id)}
                                      disabled={compareCollgeCineroom(
                                        college.id
                                      )}
                                      onChange={() =>
                                        onToggleChannel({
                                          id,
                                          name: getChannelName(id),
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
