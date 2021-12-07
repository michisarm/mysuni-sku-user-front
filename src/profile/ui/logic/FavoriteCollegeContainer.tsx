import React from 'react';
import { reactAutobind, mobxHelper, IdName } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Form, Popup, Button, Icon } from 'semantic-ui-react';
import { ChannelModel, CollegeModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import { CollegeLectureCountService } from 'lecture/stores';
import CollegeLectureCountRdo from 'lecture/model/CollegeLectureCountRdo';

import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../lecture/model/LangSupport';
import { find } from 'lodash';
import {
  findAllCollegeCache,
  isMySuniCollege,
} from '../../../shared/service/requestAllColleges';

import {
  getCollgeName,
  getChannelName,
  compareCollgeCineroom,
} from 'shared/service/useCollege/useRequestCollege';
import { CollegeIdModel } from 'shared/model/CollegeIdModel';

interface Props extends RouteComponentProps {
  collegeService?: CollegeService;
  skProfileService?: SkProfileService;
  collegeLectureCountService?: CollegeLectureCountService;
}

interface State {
  selectedCollege: CollegeIdModel;
  isSelectedCollegeInMySUNI: boolean;
  favorites: IdName[];
  favoriteCompanyChannels: ChannelModel[];
}

const style = {
  opacity: '0.83',
  boxShadow: '0 2px 6px 0 #888888',
  border: '0',
  color: '#fff',
  fontSize: '0.75rem',
  lineHeight: '1rem',
  letterSpacing: '-0.01125rem',
  left: '1.25rem',
};

@inject(
  mobxHelper.injectFrom(
    'college.collegeService',
    'profile.skProfileService',
    'lecture.collegeLectureCountService'
  )
)
@observer
@reactAutobind
class FavoriteCollegeContainer extends React.Component<Props, State> {
  state = {
    selectedCollege: {} as CollegeIdModel,
    isSelectedCollegeInMySUNI: false,
    favorites: [] as IdName[],
    favoriteCompanyChannels: [] as ChannelModel[],
  };

  componentDidMount(): void {
    const { skProfileService } = this.props;
    skProfileService!.findSkProfile();
    // summary 성공하면 setting 시작
    skProfileService!.findStudySummary().then(() => this.init());
  }

  async init() {
    const { skProfileService, collegeLectureCountService } = this.props;
    const { additionalUserInfo } = skProfileService!;

    const colleges: CollegeLectureCountRdo[] = await collegeLectureCountService!.findCollegeLectureCounts();
    const collegeData = await findAllCollegeCache();

    // 필수 관심채널 필터링
    const companyChannels = colleges
      .filter((college) => !compareCollgeCineroom(college.id))
      .map((college) =>
        college.channelIds.map(
          (id) => new ChannelModel({ channelId: id, name: getChannelName(id) })
        )
      )
      .flat();

    const parseFavoritesList: IdName[] = [];

    additionalUserInfo.favoriteChannelIds.forEach((channelId) => {
      if (collegeData !== undefined) {
        const findCollege = find(collegeData, { id: channelId });

        if (findCollege !== undefined) {
          parseFavoritesList.push({
            id: channelId,
            name: parsePolyglotString(
              findCollege.name,
              getDefaultLang(findCollege.langSupports)
            ),
          });
        }
      }
    });

    const favoriteChannelsWithoutCompany = parseFavoritesList.filter(
      (channel) =>
        !companyChannels.some(
          (companyChannel) => companyChannel.channelId === channel.id
        )
    );

    this.setState({
      favorites: favoriteChannelsWithoutCompany,
      favoriteCompanyChannels: companyChannels,
    });
  }

  async onSelectCollege(college: CollegeIdModel) {
    const collegeData = await findAllCollegeCache();
    let isSelectedCollegeInMySUNI = false;

    if (collegeData !== undefined) {
      const selected = collegeData.find(
        (cacheCollege) => college.id === cacheCollege.id
      );

      if (selected !== undefined) {
        isSelectedCollegeInMySUNI = isMySuniCollege(selected);
      }
    }

    this.setState({ selectedCollege: college, isSelectedCollegeInMySUNI });
  }

  onSelectChannel(channel: IdName) {
    let { favorites }: State = this.state;

    if (
      favorites
        .map((favoriteChannel) => favoriteChannel.id)
        .includes(channel.id)
    ) {
      favorites = favorites.filter(
        (favoriteChannel) => favoriteChannel.id !== channel.id
      );
    } else {
      favorites.push(channel);
    }
    this.setState({ favorites });
  }

  onReset() {
    this.setState({ favorites: [] });
  }

  async onNextClick() {
    const { skProfileService, history } = this.props;
    const { favorites, favoriteCompanyChannels } = this.state;

    const nextFavoriteChannels = [
      ...favorites.map((item) => item.id),
      ...favoriteCompanyChannels.map((item) => item.id),
    ];

    const params = {
      nameValues: [
        {
          name: 'favoriteChannelIds',
          value: JSON.stringify(nextFavoriteChannels),
        },
      ],
    };

    await skProfileService!.modifyStudySummary(params);

    history.push(routePaths.favoriteLearningType());
  }

  render() {
    const {
      collegeLectureCounts,
      totalChannelCount,
    } = this.props.collegeLectureCountService!;
    const {
      selectedCollege,
      favorites,
      favoriteCompanyChannels,
      isSelectedCollegeInMySUNI,
    } = this.state;

    return (
      <Form>
        <h3 className="title-filter">
          <PolyglotText
            defaultString="관심분야 선택"
            id="college-favorite-관심분야선택"
          />
        </h3>
        <div className="filter-wrap">
          <div className="column">
            <div className="f-tit">
              <PolyglotText
                defaultString="College"
                id="college-favorite-college"
              />
            </div>
            <div className="f-list">
              <div className="scrolling">
                <div className="college">
                  {collegeLectureCounts &&
                    collegeLectureCounts.length > 0 &&
                    collegeLectureCounts.map((college, index) => (
                      <div className="ui rect-icon radio checkbox" key={index}>
                        <input
                          type="radio"
                          id={`radio_${index}`}
                          name="college"
                          className="hidden"
                          tabIndex={index}
                          value={college.collegeId}
                          onChange={() => {
                            this.onSelectCollege(college);
                          }}
                        />
                        <label htmlFor={`radio_${index}`}>
                          {getCollgeName(college.id)}
                          {college?.channelCounts?.length !== undefined
                            ? `(${college?.channelCounts?.length})`
                            : ''}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="f-tit">
              <PolyglotText
                defaultString="Channel"
                id="college-favorite-Channel"
              />
            </div>
            <div className="f-list">
              <div className="scrolling">
                <div className="channel">
                  <ul>
                    {(selectedCollege.channelIds &&
                      selectedCollege.channelIds.length &&
                      selectedCollege.channelIds.map((channelId, index) => {
                        return (
                          <li key={index}>
                            <div className="ui base checkbox popup-wrap">
                              <input
                                type="checkbox"
                                id={`checkbox_${index}`}
                                className="hidden"
                                tabIndex={index}
                                checked={favorites
                                  .map((favoriteChannel) => favoriteChannel.id)
                                  .includes(channelId)}
                                onChange={() =>
                                  this.onSelectChannel({
                                    id: channelId,
                                    name: getChannelName(channelId),
                                  })
                                }
                                disabled={!isSelectedCollegeInMySUNI}
                              />
                              <label
                                className="pop"
                                data-offset="23"
                                htmlFor={`checkbox_${index}`}
                              >
                                {getChannelName(channelId)}
                              </label>
                            </div>
                          </li>
                        );
                      })) ||
                      ''}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="f-tit">
              <PolyglotText
                defaultString="Selected"
                id="college-favorite-Seleted"
              />{' '}
              <span className="counter">
                <span className="now">{favorites.length}</span> /{' '}
                {totalChannelCount}
              </span>
            </div>
            <div className="f-list">
              <div className="scrolling">
                <div className="selected">
                  {favorites &&
                    favorites.map((channel, index) => (
                      <Button
                        className="del"
                        key={index}
                        onClick={() => this.onSelectChannel(channel)}
                        style={{ fontWeight: '500' }}
                      >
                        {channel.name}
                      </Button>
                    ))}
                  {favoriteCompanyChannels.map((channel: ChannelModel) => {
                    //
                    return (
                      <Popup
                        className="custom-black"
                        content={getPolyglotText(
                          '필수 관심채널이며, 삭제 불가능합니다.',
                          'college-favorite-주의'
                        )}
                        inverted
                        style={style}
                        position="top center"
                        trigger={
                          <Button
                            key={`del_${channel.id}`}
                            className="del default"
                            data-offset="23"
                            style={{ fontWeight: '500' }}
                          >
                            {/*{parsePolyglotString(*/}
                            {/*  channel.name as PolyglotString,*/}
                            {/*  getDefaultLang(channel.langSupports)*/}
                            {/*)}*/}
                            {channel.name}
                          </Button>
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <Button className="clear" onClick={this.onReset}>
              <Icon className="reset" />
              <span className="blind">
                <PolyglotText
                  defaultString="reset"
                  id="college-favorite-reset"
                />
              </span>
            </Button>
          </div>
          <Button className="clear" onClick={this.onReset}>
            <Icon className="reset" />
            <span className="blind">
              <PolyglotText defaultString="reset" id="college-favorite-reset" />
            </span>
          </Button>
        </div>
        <div className="button-area">
          <Button className="fix bg" onClick={this.onNextClick}>
            <PolyglotText defaultString="다음" id="college-favorite-다음" />
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(FavoriteCollegeContainer);
