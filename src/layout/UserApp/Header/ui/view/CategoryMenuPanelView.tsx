import React, { Component, Fragment } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { IdName, IdNameCount } from 'shared/model';
import { CollegeLectureCountRdo } from 'lecture/model';
import { ActionLogService } from 'shared/stores';

import ReactGA from 'react-ga';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';
import { StudySummaryModel } from 'profile/model';
import { CollegeService } from 'college/stores';

interface Props {
  actionLogService?: ActionLogService;
  skProfileService?: SkProfileService
  collegeService?: CollegeService
  colleges: CollegeLectureCountRdo[];
  activeCollege?: CollegeLectureCountRdo;
  channels?: IdNameCount[];
  favorites?: ChannelModel[];
  studySummaryFavoriteChannels: IdName[];
  actions: React.ReactNode;
  banner: any;
  test?: {};
  onActiveCollege: (e: any, college: CollegeLectureCountRdo) => void;
  onRouteChannel: (e: any, channel?: IdNameCount) => void;
  onConfirmCallback?: () => void
}
@inject(mobxHelper.injectFrom('shared.actionLogService', 'profile.skProfileService'))
@reactAutobind
@observer
class CategoryMenuPanelView extends Component<Props> {

  onClickChannelActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], `${text}`);
    }, 1000);
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  //초기 선택
  categoryCheck(id: string) {
    const array: boolean[] = [];
    this.props.favorites?.map((value) => {
      if(value.id === id) {
        array.push(true)
      }else {
        array.push(false)
      }
    })
    if(array.indexOf(true) !== -1) {
      return true
    }else {
      return false
    }
  }

  favoriteChannel(e: any, channel: any) {
    const { skProfileService } = this.props;
    const array: any[] = [];
    this.props.favorites?.map((value, index) => {
      if(value.id === channel.id) {
        array.splice(index, 1)
      }else {
        array.push(value)
      }
    })
    const checkedValue = document.getElementsByName(channel.id)[0] as HTMLInputElement;
    if(checkedValue.checked) {
      //체크 안되어있는 경우
      const nextFavoriteChannels = [...this.props.studySummaryFavoriteChannels, channel];
      skProfileService!.setStudySummaryProp('favoriteChannels', { idNames: nextFavoriteChannels });
      skProfileService!.modifyStudySummary(StudySummaryModel.asNameValues(skProfileService!.studySummary))
    } else {
      skProfileService!.setStudySummaryProp('favoriteChannels', { idNames: array });
      skProfileService!.modifyStudySummary(StudySummaryModel.asNameValues(skProfileService!.studySummary))
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
      test,
      onActiveCollege,
      onRouteChannel,
    } = this.props;
    return (
      <div className="layer lms-category">
        <div className="table-css">
          <div className="row head">
            <div className="cell v-middle">College</div>
            <div className="cell v-middle">Channel</div>
          </div>
          <div className="row body">
            <div className="cell vtop">
              <div className="select-area">
                <div className="scrolling">
                  {colleges.map(college => (
                    <button
                      key={`category_${college.collegeId}`}
                      className={
                        activeCollege &&
                        activeCollege.collegeId === college.collegeId
                          ? 'active'
                          : ''
                      }
                      onClick={e => {
                        this.onClickActionLog(college.name);
                        onActiveCollege(e, college);
                      }}
                    >
                      {college.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="category-channel-wrap">
            {activeCollege && (
              <>
              <div className="category-title-bar">
                  <span className="category-title">{activeCollege.name} College<span className="num"> (125)</span></span>
                  <button className="btn-category-all"
                    onClick={e => {
                    this.onClickChannelActionLog(
                      `${activeCollege.name} 전체보기`
                    );
                    onRouteChannel(e);
                    }}
                  >
                  {activeCollege.name} 전체보기
                  <span>({activeCollege.totalCount})</span>
                      {/* <span> */}
                        {/* `${activeCollege.name} 전체보기` */}
                        {/* </span> */}
                      {/* <i className="arr-r-gray" /> */}
                  </button>
              </div>
              <div className="category-body">
                {Array.isArray(channels) &&
                  channels.map((channel, index) => (
                    <Fragment key={index}>
                    <span className="check-type2">
                      <label htmlFor={channel.id}>
                        <input type="checkbox" 
                          id={channel.id}
                          name={channel.id}
                          checked={this.categoryCheck(channel.id)}
                          onChange={(e)=> {
                            this.favoriteChannel(e, channel);
                          }}
                          key={index} 
                        />
                        <span className="check-type2-marker"/>
                      </label>
                      <a 
                        className="check-type2-text"
                        onClick={e => {
                          this.onClickChannelActionLog(channel.name);
                          onRouteChannel(e, channel);
                        }}
                      >{channel.name}<strong> ({channel.count})</strong>
                      </a>
                    </span>
                    </Fragment>
                  ))
                }
              </div>
              { banner.viewType === '2' &&  (
                <>
                <div className="category-banner">
                  { banner.collegeBannerContents[0].visible === 1 && banner.collegeBannerContents[0].useLink === 0 && (
                    <img src={`${banner.collegeBannerContents[0].imageUrl}`} alt=""/>
                  )}
                  { banner.collegeBannerContents[0].visible === 1 && banner.collegeBannerContents[0].useLink === 1 && (
                    <a href={banner.collegeBannerContents[0].linkUrl}>
                      <img src={`${banner.collegeBannerContents[0].imageUrl}`} alt=""/>
                    </a>
                  )}
                  { banner.collegeBannerContents[0].visible === 0 &&  (
                    <span style={{width:"244px", height:"80px", display:"inline-block"}} />
                  )}

                  { banner.collegeBannerContents[1].visible === 1 && banner.collegeBannerContents[1].useLink === 0 && (
                    <img src={`${banner.collegeBannerContents[1].imageUrl}`} alt=""/>
                  )}
                  { banner.collegeBannerContents[1].visible === 1 && banner.collegeBannerContents[1].useLink === 1 && (
                    <a href={banner.collegeBannerContents[0].linkUrl}>
                      <img src={`${banner.collegeBannerContents[1].imageUrl}`} alt=""/>
                    </a>
                  )}
                  { banner.collegeBannerContents[1].visible === 0 &&  (
                    <span style={{width:"244px", height:"80px", display:"inline-block"}} />
                  )}
                </div>
                </>
              ) }
              { banner.viewType === '1' &&  (
              <div className="category-banner">
                { banner.collegeBannerContents[0].visible === '1' &&  (
                  <img src={`${banner.collegeBannerContents[0].imageUrl}`} alt=""/>
                )}
                { banner.collegeBannerContents[0].visible === '1' && banner.collegeBannerContents[0].useLink === 1 &&  (
                  <a href={banner.collegeBannerContents[0].linkUrl}>
                    <img src={`${banner.collegeBannerContents[1].imageUrl}`} alt=""/>
                  </a>
                )}
                { banner.collegeBannerContents[0].visible === '0' &&  (
                  <div/>
                )}
              </div>
              ) }
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
