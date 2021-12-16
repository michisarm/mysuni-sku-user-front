import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { IdName, IdNameCount } from 'shared/model';
import { CollegeLectureCountRdo } from 'lecture/model';

import ReactGA from 'react-ga';
import { SkProfileService } from 'profile/stores';
import classNames from 'classnames';
import { Action, Area } from 'tracker/model';
import { originSelfPath, parsingPath } from 'tracker-react/utils';
import { getKoreaName } from 'tracker/present/logic/common';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { CollegeBanner } from '../../../../../college/model/CollegeBanner';
import {
  parsePolyglotString,
  parseLanguage,
} from '../../../../../shared/viewmodel/PolyglotString';
import _ from 'lodash';

interface Props {
  skProfileService?: SkProfileService;
  colleges: CollegeLectureCountRdo[];
  activeCollege?: CollegeLectureCountRdo;
  channels?: IdNameCount[];
  favorites?: string[];
  actions: React.ReactNode;
  banner?: CollegeBanner;
  test?: {};
  onActiveCollege: (e: any, college: CollegeLectureCountRdo) => void;
  onRouteChannel: (e: any, channel?: IdName) => void;
  onConfirmCallback?: () => void;
  handleCategoryOpen: (flag: boolean) => void;
}
@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class CategoryMenuPanelView extends Component<Props> {
  //
  onClickChannelActionLog(text: string) {
    // react-ga event (전체보기, 각 item)
    ReactGA.event({
      category: `${this.props.activeCollege?.name}`,
      action: 'Click',
      label: `${text}`,
    });
  }

  //초기 선택
  categoryCheck(id: string) {
    const { favorites } = this.props;

    if (favorites !== undefined) {
      return favorites.includes(id);
    }
  }

  favoriteChannel(e: React.ChangeEvent<HTMLInputElement>) {
    //
    const { skProfileService } = this.props;
    const channelId = e.target.id;
    const prevFavorites = this.props.favorites;

    const params = {
      nameValues: [
        {
          name: 'favoriteChannelIds',
          value: '[]',
        },
      ],
    };

    if (prevFavorites !== undefined) {
      const isIncludesFavorite = prevFavorites.includes(channelId);

      if (isIncludesFavorite) {
        const filteredFavorite = prevFavorites.filter(
          (favoriteId) => favoriteId !== channelId
        );
        params.nameValues[0].value = JSON.stringify(filteredFavorite);
        skProfileService!
          .modifyStudySummary(params)
          .then(() => skProfileService!.findStudySummary());
      } else {
        const nextFavorites = [channelId, ...prevFavorites];
        params.nameValues[0].value = JSON.stringify(nextFavorites);
        skProfileService!
          .modifyStudySummary(params)
          .then(() => skProfileService!.findStudySummary());
      }
    }
  }

  render() {
    //
    const {
      colleges,
      activeCollege,
      channels,
      actions,
      banner,
      onActiveCollege,
      onRouteChannel,
      handleCategoryOpen,
    } = this.props;

    // react-ga event (카테고리 배너 이미지)
    const gaClickEvent = (text: string, idx: number) => {
      ReactGA.event({
        category: 'Banner',
        action: 'Click',
        label: `${text}-${idx && idx}번째`,
      });
    };

    const filteredChannel = channels?.filter((item) => item.count > 0);

    return (
      <div className="layer lms-category">
        <div className="table-css">
          <div className="row head">
            <div className="cell v-middle">
              <PolyglotText defaultString="College" id="home-cipp-구분cl" />
            </div>
            <div className="cell v-middle">
              <PolyglotText defaultString="Channel" id="home-cipp-구분ch" />
            </div>
          </div>
          <div className="row body">
            <div className="cell vtop">
              <div className="select-area">
                <div className="scrolling">
                  {colleges.map((college) => {
                    return (
                      <button
                        key={`category_${college.id}`}
                        className={classNames('', {
                          active:
                            activeCollege && activeCollege.id === college.id,
                          bm: college.id === 'CLG00020',
                        })}
                        onClick={(e) => {
                          onActiveCollege(e, college);
                        }}
                        data-area={Area.HEADER_CATEGORYLIST}
                        data-action={Action.CLICK}
                        data-action-name={`CATEGORY 목록 클릭::${getKoreaName(
                          college.name
                        )}`}
                      >
                        {college.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="category-channel-wrap">
              {activeCollege && (
                <>
                  <div
                    className="category-title-bar"
                    data-area={Area.HEADER_CATEGORY}
                  >
                    <span className="category-title">
                      {activeCollege.name}{' '}
                      <PolyglotText defaultString="College" id="home-cipp-ch" />
                      {/* <span className="num"> ({activeCollege.totalCount})</span> */}
                    </span>
                    <button
                      className="btn-category-all"
                      onClick={(e) => {
                        this.onClickChannelActionLog(
                          `${activeCollege.name}
                          ${getPolyglotText('전체보기', 'home-cipp-전체보기')}`
                        );
                        onRouteChannel(e);
                      }}
                    >
                      <PolyglotText
                        defaultString="전체보기"
                        id="home-cipp-전체보기"
                      />
                      <i className="arr-r-gray" />
                    </button>
                  </div>
                  <div
                    className="category-body"
                    data-area={Area.HEADER_CATEGORY}
                  >
                    {Array.isArray(filteredChannel) &&
                      filteredChannel.map((channel, index) => {
                        if (index % 2 === 0) {
                          if (filteredChannel[index + 1] !== undefined) {
                            return (
                              <div className="category-row" key={channel.id}>
                                <span className="check-type2">
                                  <label htmlFor={channel.id}>
                                    <input
                                      type="checkbox"
                                      id={channel.id}
                                      name={channel.id}
                                      checked={this.categoryCheck(channel.id)}
                                      onChange={this.favoriteChannel}
                                      key={index}
                                    />
                                    <span className="check-type2-marker" />
                                  </label>
                                  <a
                                    className="check-type2-text"
                                    onClick={(e) => {
                                      this.onClickChannelActionLog(
                                        channel.name
                                      );
                                      onRouteChannel(e, channel);
                                    }}
                                  >
                                    {`${channel.name} (${channel.count})`}
                                  </a>
                                </span>
                                <span className="check-type2">
                                  <label
                                    htmlFor={filteredChannel[index + 1].id}
                                  >
                                    <input
                                      type="checkbox"
                                      id={filteredChannel[index + 1].id}
                                      name={filteredChannel[index + 1].id}
                                      checked={this.categoryCheck(
                                        filteredChannel[index + 1].id
                                      )}
                                      onChange={this.favoriteChannel}
                                      key={index}
                                    />
                                    <span className="check-type2-marker" />
                                  </label>
                                  <a
                                    className="check-type2-text"
                                    onClick={(e) => {
                                      this.onClickChannelActionLog(
                                        filteredChannel[index + 1].name
                                      );
                                      onRouteChannel(
                                        e,
                                        filteredChannel[index + 1]
                                      );
                                    }}
                                  >
                                    {`${filteredChannel[index + 1].name} (${
                                      filteredChannel[index + 1].count
                                    })`}
                                  </a>
                                </span>
                              </div>
                            );
                          } else {
                            return (
                              <div className="category-row" key={channel.id}>
                                <span className="check-type2">
                                  <label htmlFor={channel.id}>
                                    <input
                                      type="checkbox"
                                      id={channel.id}
                                      name={channel.id}
                                      checked={this.categoryCheck(channel.id)}
                                      onChange={this.favoriteChannel}
                                      key={index}
                                    />
                                    <span className="check-type2-marker" />
                                  </label>
                                  <a
                                    className="check-type2-text"
                                    onClick={(e) => {
                                      this.onClickChannelActionLog(
                                        channel.name
                                      );
                                      onRouteChannel(e, channel);
                                    }}
                                  >
                                    {`${channel.name} (${channel.count})`}
                                  </a>
                                </span>
                              </div>
                            );
                          }
                        }
                      })}
                  </div>
                  {banner?.viewType === '2' && (
                    <>
                      <div
                        className="category-banner"
                        data-area={Area.HEADER_BANNER}
                      >
                        {banner.collegeBannerContents[0].visible === 1 &&
                          !_.isEmpty(
                            parsePolyglotString(
                              banner.collegeBannerContents[0].imageUrl,
                              parseLanguage(
                                SkProfileService.instance.skProfile.language
                              )
                            )
                          ) && (
                            <>
                              {banner.collegeBannerContents[0].useLink ===
                                0 && (
                                <span className="banner-holder">
                                  <img
                                    src={`${parsePolyglotString(
                                      banner.collegeBannerContents[0].imageUrl,
                                      parseLanguage(
                                        SkProfileService.instance.skProfile
                                          .language
                                      )
                                    )}`}
                                    onClick={(e) =>
                                      gaClickEvent(`${activeCollege.name}`, 1)
                                    }
                                    alt=""
                                  />
                                </span>
                              )}
                              {banner.collegeBannerContents[0].useLink ===
                                1 && (
                                <span className="banner-holder">
                                  <a
                                    href={parsingPath(
                                      parsePolyglotString(
                                        banner.collegeBannerContents[0].linkUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )
                                    )}
                                    onClick={() => {
                                      handleCategoryOpen(false);
                                      gaClickEvent(`${activeCollege.name}`, 1);
                                    }}
                                  >
                                    <img
                                      src={`${parsePolyglotString(
                                        banner.collegeBannerContents[0]
                                          .imageUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )}`}
                                      alt=""
                                    />
                                  </a>
                                </span>
                              )}
                            </>
                          )}

                        {banner.collegeBannerContents[0].visible === 0 && (
                          <span className="banner-holder">
                            <span
                              style={{
                                width: '244px',
                                height: '80px',
                                display: 'inline-block',
                              }}
                            />
                          </span>
                        )}
                        {banner?.collegeBannerContents[1].visible === 1 &&
                          !_.isEmpty(
                            parsePolyglotString(
                              banner.collegeBannerContents[1].imageUrl,
                              parseLanguage(
                                SkProfileService.instance.skProfile.language
                              )
                            )
                          ) && (
                            <>
                              {banner.collegeBannerContents[1].useLink ===
                                0 && (
                                <span className="banner-holder">
                                  <img
                                    src={`${parsePolyglotString(
                                      banner.collegeBannerContents[1].imageUrl,
                                      parseLanguage(
                                        SkProfileService.instance.skProfile
                                          .language
                                      )
                                    )}`}
                                    onClick={(e) =>
                                      gaClickEvent(`${activeCollege.name}`, 2)
                                    }
                                    alt=""
                                  />
                                </span>
                              )}
                              {banner.collegeBannerContents[1].useLink ===
                                1 && (
                                <span className="banner-holder">
                                  <a
                                    href={parsingPath(
                                      parsePolyglotString(
                                        banner.collegeBannerContents[1].linkUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )
                                    )}
                                    onClick={() => {
                                      handleCategoryOpen(false);
                                      gaClickEvent(`${activeCollege.name}`, 2);
                                    }}
                                  >
                                    <img
                                      src={`${parsePolyglotString(
                                        banner.collegeBannerContents[1]
                                          .imageUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )}`}
                                      alt=""
                                    />
                                  </a>
                                </span>
                              )}
                            </>
                          )}
                        {banner?.collegeBannerContents[1].visible === 0 && (
                          <span className="banner-holder">
                            <span
                              style={{
                                width: '244px',
                                height: '80px',
                                display: 'inline-block',
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </>
                  )}
                  {banner?.viewType === '1' && (
                    <div
                      className="category-banner-single"
                      data-area={Area.HEADER_BANNER}
                    >
                      {banner.collegeBannerContents[0].visible === 0 && (
                        <span
                          style={{
                            width: '244px',
                            height: '80px',
                            display: 'inline-block',
                          }}
                        />
                      )}
                      {banner.collegeBannerContents[0].visible === 1 &&
                        !_.isEmpty(
                          parsePolyglotString(
                            banner.collegeBannerContents[0].imageUrl,
                            parseLanguage(
                              SkProfileService.instance.skProfile.language
                            )
                          )
                        ) && (
                          <>
                            {banner.collegeBannerContents[0].useLink === 0 && (
                              <img
                                src={`${parsePolyglotString(
                                  banner.collegeBannerContents[0].imageUrl,
                                  parseLanguage(
                                    SkProfileService.instance.skProfile.language
                                  )
                                )}`}
                                onClick={(e) =>
                                  gaClickEvent(`${activeCollege.name}`, 1)
                                }
                                alt=""
                              />
                            )}
                            {banner.collegeBannerContents[0].useLink === 1 && (
                              <>
                                {!/^(http|https)/.test(
                                  originSelfPath(
                                    parsePolyglotString(
                                      banner.collegeBannerContents[0].linkUrl,
                                      parseLanguage(
                                        SkProfileService.instance.skProfile
                                          .language
                                      )
                                    )
                                  )
                                ) ? (
                                  <Link
                                    to={originSelfPath(
                                      parsePolyglotString(
                                        banner.collegeBannerContents[0].linkUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )
                                    )}
                                    onClick={() => {
                                      handleCategoryOpen(false);
                                      gaClickEvent(`${activeCollege.name}`, 1);
                                    }}
                                  >
                                    <img
                                      src={`${parsePolyglotString(
                                        banner.collegeBannerContents[0]
                                          .imageUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )}`}
                                      alt=""
                                    />
                                  </Link>
                                ) : (
                                  <a
                                    href={encodeURI(
                                      parsePolyglotString(
                                        banner.collegeBannerContents[0].linkUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )
                                    )}
                                  >
                                    <img
                                      src={`${parsePolyglotString(
                                        banner.collegeBannerContents[0]
                                          .imageUrl,
                                        parseLanguage(
                                          SkProfileService.instance.skProfile
                                            .language
                                        )
                                      )}`}
                                      onClick={(e) =>
                                        gaClickEvent(`${activeCollege.name}`, 1)
                                      }
                                      alt=""
                                    />
                                  </a>
                                )}
                              </>
                            )}
                          </>
                        )}
                      {banner.collegeBannerContents[0].visible === 0 && <div />}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {actions}
      </div>
    );
  }
}

export default CategoryMenuPanelView;
