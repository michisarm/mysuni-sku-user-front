import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { IdNameCount } from 'shared/model';
import { CollegeLectureCountRdo } from 'lecture/model';
import { ActionLogService } from 'shared/stores';

import ReactGA from 'react-ga';

interface Props {
  actionLogService?: ActionLogService;
  colleges: CollegeLectureCountRdo[];
  activeCollege?: CollegeLectureCountRdo;
  channels?: IdNameCount[];
  actions: React.ReactNode;
  onActiveCollege: (e: any, college: CollegeLectureCountRdo) => void;
  onRouteChannel: (e: any, channel?: IdNameCount) => void;
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@reactAutobind
@observer
class CategoryMenuPanelView extends Component<Props> {
  //

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

  render() {
    //
    const {
      colleges,
      activeCollege,
      channels,
      actions,
      onActiveCollege,
      onRouteChannel,
    } = this.props;

    console.log('channels', channels)

    return (
      <div className="layer">
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
                      1{college.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="category-channel-wrap">
            {activeCollege && (
              <>
              <div className="category-title-bar">
                  <span className="category-title">AI College <span className="num">(125)</span></span>
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
                    // <button
                    //   key={`sub-category-${channel.id}`}
                    //   onClick={e => {
                    //     this.onClickChannelActionLog(channel.name);
                    //     onRouteChannel(e, channel);
                    //   }}
                    // >
                    //   {channel.name}
                    // <span>({channel.count})</span>
                    <>
                    <span className="check-type2">
                    <label htmlFor={'check'+index} className="check-type2">
                      <input type="checkbox" id={'check'+index} />
                      <span className="check-type2-marker"/>
                    </label>
                    <a className="check-type2-text">{channel.name}<strong> ({channel.count})</strong>
                    </a>
                    </span>
                    </>
                    

                      // <span className="check-type2">
                      // <label htmlFor="check1">
                      //     <input type="checkbox" id="check1"/>
                      //     <span className="check-type2-marker"/>
                      // </label>
                      // <a className="check-type2-text">AI Fundamental<strong> (20)</strong></a>
                      // </span>

                    // {/* </button> */}
                  ))
                }
                  {/* <label htmlFor="check1" className="check-type2">
                      <input type="checkbox" id="check1" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check2" className="check-type2">
                      <input type="checkbox" id="check2" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check3" className="check-type2">
                      <input type="checkbox" id="check3" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check4" className="check-type2">
                      <input type="checkbox" id="check4" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check5" className="check-type2">
                      <input type="checkbox" id="check5" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check6" className="check-type2">
                      <input type="checkbox" id="check6" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check7" className="check-type2">
                      <input type="checkbox" id="check7" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check8" className="check-type2">
                      <input type="checkbox" id="check8" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check9" className="check-type2">
                      <input type="checkbox" id="check9" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check10" className="check-type2">
                      <input type="checkbox" id="check10" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check11" className="check-type2">
                      <input type="checkbox" id="check11" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check12" className="check-type2">
                      <input type="checkbox" id="check12" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label>
                  <label htmlFor="check13" className="check-type2">
                      <input type="checkbox" id="check13" />
                      <span className="check-type2-text">AI Fundamental<strong> (20)</strong></span>
                  </label> */}
              </div>
              {/*<div className="category-banner">
                  <img src={CategoryBanner1} alt=""/>
                  <img src={CategoryBanner2} alt=""/>
              </div>*/}

              <div className="category-banner-single">
                {/* TODO.카테고리 배너 들어가야한다 */}
                  {/* <img src={CategoryBanner3} alt=""/> */}
              </div>
              </>
              )}
            </div>
            {/* <div className="cell vtop">
              <div className="select-area">
                <div className="scrolling">
                  {activeCollege && (
                    <>
                      <button
                        onClick={e => {
                          this.onClickChannelActionLog(
                            `${activeCollege.name} 전체보기`
                          );
                          onRouteChannel(e);
                        }}
                      >
                        {activeCollege.name} 전체보기
                        <span>({activeCollege.totalCount})</span>
                      </button>

                      {Array.isArray(channels) &&
                        channels.map(channel => (
                          <button
                            key={`sub-category-${channel.id}`}
                            onClick={e => {
                              this.onClickChannelActionLog(channel.name);
                              onRouteChannel(e, channel);
                            }}
                          >
                            {channel.name}
                            <span>({channel.count})</span>
                          </button>
                        ))
                      }
                    </>
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {actions}
      </div>
    );
  }
}

export default CategoryMenuPanelView;
